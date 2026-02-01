import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const CREDITS_MAP: Record<string, number> = {
  starter: 500,
  pro: 2000,
  business: 6000,
};

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

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
    const email = session.metadata?.email || session.customer_email;
    const pkg = session.metadata?.package;

    if (!email || !pkg) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    try {
      const { data: existing } = await supabase
        .from('credit_purchases')
        .select('id')
        .eq('stripe_session_id', session.id)
        .single();

      if (existing) {
        return NextResponse.json({ received: true });
      }

      if (pkg === 'unlimited') {
        await supabase
          .from('user_credits')
          .upsert({
            user_email: email,
            is_unlimited: true,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_email' });
      } else {
        const creditsToAdd = CREDITS_MAP[pkg] || 0;
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
      }

      await supabase.from('credit_purchases').insert({
        user_email: email,
        stripe_session_id: session.id,
        package: pkg,
        credits_added: CREDITS_MAP[pkg] || 0,
        amount_paid: session.amount_total,
      });

    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
