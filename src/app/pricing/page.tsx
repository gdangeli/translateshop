'use client';

import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '0',
    id: 'free',
    credits: '50',
    features: ['50 Übersetzungs-Credits', '4 Sprachen (DE/FR/IT/EN)', 'CSV Import/Export'],
    cta: 'Aktueller Plan',
    disabled: true,
  },
  {
    name: 'Starter',
    price: '9',
    id: 'starter',
    credits: '500',
    features: ['500 Übersetzungs-Credits', '4 Sprachen (DE/FR/IT/EN)', 'CSV Import/Export', 'E-Mail Support'],
    cta: 'Kaufen',
    paymentLink: 'https://buy.stripe.com/6oU5kFaWJeHJ7CL2Td7Vm01',
  },
  {
    name: 'Pro',
    price: '29',
    id: 'pro',
    credits: '2000',
    features: ['2000 Übersetzungs-Credits', '4 Sprachen (DE/FR/IT/EN)', 'CSV Import/Export', 'Prioritäts-Support'],
    cta: 'Kaufen',
    popular: true,
    paymentLink: 'https://buy.stripe.com/cNi6oJaWJ1UX9KT1P97Vm02',
  },
  {
    name: 'Business',
    price: '79',
    id: 'business',
    credits: '6000',
    features: ['6000 Übersetzungs-Credits', '4 Sprachen (DE/FR/IT/EN)', 'CSV Import/Export', 'Prioritäts-Support', 'API Zugang'],
    cta: 'Kaufen',
    paymentLink: 'https://buy.stripe.com/aFacN73uhbvx2ir0L57Vm03',
  },
  {
    name: 'Unlimited',
    price: '49',
    id: 'unlimited',
    credits: 'Unbegrenzt',
    isSubscription: true,
    features: ['Unbegrenzte Übersetzungen', '4 Sprachen (DE/FR/IT/EN)', 'CSV Import/Export', 'Prioritäts-Support', 'API Zugang'],
    cta: 'Abonnieren',
    paymentLink: 'https://buy.stripe.com/fZu00l4yl6bd4qzfFZ7Vm04',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-slate-800">
            TranslateShop.ch
          </Link>
          <Link href="/dashboard" className="text-slate-600 hover:text-slate-800">
            Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Einfache, transparente Preise
          </h1>
          <p className="text-xl text-slate-600">
            Kaufen Sie Credits nach Bedarf. 1 Credit = 1 Zeile x 1 Sprache.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={plan.popular ? "rounded-2xl p-6 bg-red-600 text-white ring-4 ring-red-200" : "rounded-2xl p-6 bg-white border border-slate-200"}
            >
              {plan.popular && (
                <span className="inline-block bg-white text-red-600 text-xs font-semibold px-2 py-1 rounded mb-4">
                  BELIEBT
                </span>
              )}
              <h3 className={plan.popular ? "text-xl font-semibold text-white" : "text-xl font-semibold text-slate-800"}>
                {plan.name}
              </h3>
              <div className="mt-4 mb-6">
                <span className={plan.popular ? "text-4xl font-bold text-white" : "text-4xl font-bold text-slate-800"}>
                  CHF {plan.price}
                </span>
                {plan.isSubscription && (
                  <span className={plan.popular ? "text-sm text-red-100" : "text-sm text-slate-500"}>/Monat</span>
                )}
              </div>
              <p className={plan.popular ? "text-sm mb-6 text-red-100" : "text-sm mb-6 text-slate-600"}>
                {plan.credits} Credits
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className={plan.popular ? "flex items-center text-sm text-white" : "flex items-center text-sm text-slate-600"}>
                   <span className="mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.paymentLink ? (
                <a
                  href={plan.paymentLink}
                  className={plan.popular ? "block w-full py-3 rounded-lg font-semibold text-center bg-white text-red-600 hover:bg-red-50" : "block w-full py-3 rounded-lg font-semibold text-center bg-red-600 text-white hover:bg-red-700"}
                >
                  {plan.cta}
                </a>
              ) : (
                <button
                  disabled={plan.disabled}
                  className={plan.disabled ? "w-full py-3 rounded-lg font-semibold bg-slate-100 text-slate-400 cursor-not-allowed" : "w-full py-3 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700"}
                >
                  {plan.cta}
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
