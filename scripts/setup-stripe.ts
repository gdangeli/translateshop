import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51B8t3VBR8ftWrsq8RRk1BSE8Gc50kB0l4GEvsqNoLZUvr4mKQeOfgvMHW2COxFQUbWCqJ99VmsaGJ4yaMbZQjxzf00JdPK9Qc0');

async function setupStripe() {
  console.log('Setting up Stripe products and prices...');

  // Create Product
  const product = await stripe.products.create({
    name: 'TranslateShop Subscription',
    description: 'Automatische Übersetzungen für Schweizer Online-Shops',
  });
  console.log('Product created:', product.id);

  // Create Prices for each plan
  const plans = [
    { name: 'Starter', price: 4900, products: 200 },
    { name: 'Business', price: 9900, products: 1000 },
    { name: 'Pro', price: 19900, products: 10000 },
  ];

  for (const plan of plans) {
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: plan.price,
      currency: 'chf',
      recurring: { interval: 'month' },
      nickname: plan.name,
      metadata: { 
        plan_name: plan.name.toLowerCase(),
        products_limit: plan.products.toString()
      },
    });
    console.log(plan.name + ' price created:', price.id);
  }

  console.log('\nDone!');
}

setupStripe().catch(console.error);
