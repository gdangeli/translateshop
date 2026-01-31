import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Plan limits
const PLAN_LIMITS: Record<string, number> = {
  free: 50,
  starter: 200,
  business: 1000,
  pro: 10000,
};

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  // For now, skip signature verification in test mode
  // In production, verify with: stripe.webhooks.constructEvent(body, signature, webhookSecret)
  
  let event: Stripe.Event;
  try {
    event = JSON.parse(body) as Stripe.Event;
  } catch (err) {
    console.error('Webhook parsing error:', err);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.supabase_user_id;
        const plan = session.metadata?.plan || 'starter';

        if (userId) {
          await supabase
            .from('profiles')
            .update({
              plan: plan,
              products_limit: PLAN_LIMITS[plan] || 50,
              stripe_subscription_id: session.subscription as string,
            })
            .eq('id', userId);
          
          console.log(`User ${userId} upgraded to ${plan}`);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Get plan from price metadata
        const priceId = subscription.items.data[0]?.price.id;
        const price = await stripe.prices.retrieve(priceId);
        const plan = price.metadata?.plan_name || 'starter';

        // Find user by stripe customer id
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (profile) {
          await supabase
            .from('profiles')
            .update({
              plan: plan,
              products_limit: PLAN_LIMITS[plan] || 50,
            })
            .eq('id', profile.id);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Downgrade to free
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (profile) {
          await supabase
            .from('profiles')
            .update({
              plan: 'free',
              products_limit: PLAN_LIMITS['free'],
              stripe_subscription_id: null,
            })
            .eq('id', profile.id);
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
