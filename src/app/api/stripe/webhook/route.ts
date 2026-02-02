// CREDIT-BASED WEBHOOK - 2026-02-02
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { addCredits, setUnlimited } from '@/lib/credits';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Credit packages - map Stripe price IDs to credits
// Update these with your actual Stripe price IDs!
const CREDIT_PACKAGES: Record<string, { credits: number; name: string }> = {
  // One-time packages
  'price_starter_500': { credits: 500, name: 'Starter' },
  'price_pro_2000': { credits: 2000, name: 'Pro' },
  'price_business_6000': { credits: 6000, name: 'Business' },
  // Fallback by amount (in cents/rappen)
};

// Map amount to credits as fallback
function getCreditsFromAmount(amountInCents: number): { credits: number; name: string } | null {
  const mapping: Record<number, { credits: number; name: string }> = {
    900: { credits: 500, name: 'Starter' },    // CHF 9
    2900: { credits: 2000, name: 'Pro' },      // CHF 29
    7900: { credits: 6000, name: 'Business' }, // CHF 79
  };
  return mapping[amountInCents] || null;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  // Verify webhook signature in production
  if (webhookSecret && signature) {
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
  } else {
    // Fallback for testing (no signature verification)
    try {
      event = JSON.parse(body) as Stripe.Event;
    } catch (err) {
      console.error('Webhook parsing error:', err);
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  console.log(`Webhook received: ${event.type}`);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerEmail = session.customer_email || session.customer_details?.email;

        if (!customerEmail) {
          console.error('No customer email in session');
          break;
        }

        // Check if it's a subscription (unlimited) or one-time (credits)
        if (session.mode === 'subscription') {
          // Unlimited subscription
          await setUnlimited(supabase, customerEmail, true);
          console.log(`User ${customerEmail} activated Unlimited subscription`);

          // Log the purchase
          await supabase.from('credit_purchases').insert({
            user_email: customerEmail,
            credits_added: 0,
            package_name: 'Unlimited',
            stripe_session_id: session.id,
            amount_paid: session.amount_total,
          });

        } else {
          // One-time credit purchase
          const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
          const priceId = lineItems.data[0]?.price?.id;
          const amount = session.amount_total || 0;

          // Try to get credits from price ID first, then from amount
          let packageInfo = priceId ? CREDIT_PACKAGES[priceId] : null;
          if (!packageInfo) {
            packageInfo = getCreditsFromAmount(amount);
          }

          if (packageInfo) {
            await addCredits(supabase, customerEmail, packageInfo.credits, {
              stripe_session_id: session.id,
              package_name: packageInfo.name,
              amount_paid: amount,
            });
            console.log(`User ${customerEmail} purchased ${packageInfo.credits} credits (${packageInfo.name})`);
          } else {
            console.error(`Unknown purchase amount: ${amount} cents, priceId: ${priceId}`);
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        // Subscription cancelled - remove unlimited status
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Get customer email from Stripe
        const customer = await stripe.customers.retrieve(customerId);
        if (customer.deleted) break;

        const email = (customer as Stripe.Customer).email;
        if (email) {
          await setUnlimited(supabase, email, false);
          console.log(`User ${email} cancelled Unlimited subscription`);
        }
        break;
      }

      case 'customer.subscription.updated': {
        // Check if subscription became active or was reactivated
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const customer = await stripe.customers.retrieve(customerId);
        if (customer.deleted) break;

        const email = (customer as Stripe.Customer).email;
        if (email) {
          const isActive = subscription.status === 'active';
          await setUnlimited(supabase, email, isActive);
          console.log(`User ${email} subscription status: ${subscription.status}`);
        }
        break;
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
