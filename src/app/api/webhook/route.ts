import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Map Price IDs to credits
const PRICE_TO_CREDITS: Record<string, number> = {
  'price_1Svy8XPeTTNkQy4TNHc5UxxB': 500,   // Starter
  'price_1Svy91PeTTNkQy4TCkO8Pg4x': 2000,  // Pro
  'price_1Svy9UPeTTNkQy4Tj4rrqjmF': 6000,  // Business
};

const UNLIMITED_PRICE = 'price_1SvyDhPeTTNkQy4T8ch5PcQW';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Get email from session
    const email = session.customer_email || session.customer_details?.email;
    
    if (!email) {
      console.error('No email found in session');
      return NextResponse.json({ error: 'No email' }, { status: 400 });
    }

    try {
      // Check for duplicate
      const { data: existing } = await supabase
        .from('credit_purchases')
        .select('id')
        .eq('stripe_session_id', session.id)
        .single();

      if (existing) {
        console.log('Duplicate webhook, skipping');
        return NextResponse.json({ received: true });
      }

      // Get line items to find which product was purchased
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const priceId = lineItems.data[0]?.price?.id;

      if (!priceId) {
        console.error('No price ID found');
        return NextResponse.json({ error: 'No price ID' }, { status: 400 });
      }

      // Check if unlimited subscription
      if (priceId === UNLIMITED_PRICE) {
        await supabase
          .from('user_credits')
          .upsert({
            user_email: email,
            is_unlimited: true,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_email' });
        
        console.log('Unlimited subscription activated for', email);
      } else {
        // Credit pack purchase
        const creditsToAdd = PRICE_TO_CREDITS[priceId] || 0;
        
        if (creditsToAdd === 0) {
          console.error('Unknown price ID:', priceId);
          return NextResponse.json({ error: 'Unknown price' }, { status: 400 });
        }

        // Get current credits
        const { data: user } = await supabase
          .from('user_credits')
          .select('credits')
          .eq('user_email', email)
          .single();

        const currentCredits = user?.credits || 50;

        await supabase
          .from('user_credits')
          .upsert({
            user_email: email,
            credits: currentCredits + creditsToAdd,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_email' });

        console.log('Added', creditsToAdd, 'credits for', email);
      }

      // Log purchase
      await supabase.from('credit_purchases').insert({
        user_email: email,
        stripe_session_id: session.id,
        package: priceId,
        credits_added: PRICE_TO_CREDITS[priceId] || 0,
        amount_paid: session.amount_total,
      });

    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
  }
 return NextResponse.json({ received: true });
}
