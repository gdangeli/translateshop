import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28',
});

const PRICES: Record<string, { priceId: string; credits: number }> = {
  starter: { priceId: process.env.STRIPE_PRICE_STARTER!, credits: 500 },
  pro: { priceId: process.env.STRIPE_PRICE_PRO!, credits: 2000 },
  business: { priceId: process.env.STRIPE_PRICE_BUSINESS!, credits: 6000 },
  unlimited: { priceId: process.env.STRIPE_PRICE_UNLIMITED!, credits: 0 },
};

export async function POST(req: NextRequest) {
  try {
    const { package: pkg, email } = await req.json();

    if (!pkg || !PRICES[pkg]) {
      return NextResponse.json({ error: 'Invalid package' }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const priceConfig = PRICES[pkg];
    const isSubscription = pkg === 'unlimited';
    const origin = req.headers.get('origin') || 'https://translateshop.vercel.app';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: isSubscription ? 'subscription' : 'payment',
      customer_email: email,
      line_items: [{ price: priceConfig.priceId, quantity: 1 }],
      metadata: {
        package: pkg,
        credits: priceConfig.credits.toString(),
        email: email,
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
