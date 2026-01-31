'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '0',
    id: 'free',
    products: '50',
    features: ['50 Produkte', '4 Sprachen (DE/FR/IT/EN)', 'CSV Import/Export', 'Community Support'],
    cta: 'Aktueller Plan',
    disabled: true,
  },
  {
    name: 'Starter',
    price: '49',
    id: 'starter',
    products: '200',
    features: ['200 Produkte', '4 Sprachen (DE/FR/IT/EN)', 'CSV Import/Export', 'E-Mail Support', 'Prioritäts-Übersetzungen'],
    cta: 'Upgrade',
    popular: true,
  },
  {
    name: 'Business',
    price: '99',
    id: 'business',
    products: '1\'000',
    features: ['1\'000 Produkte', '4 Sprachen (DE/FR/IT/EN)', 'CSV Import/Export', 'Prioritäts-Support', 'API Zugang', 'Bulk-Übersetzungen'],
    cta: 'Upgrade',
  },
  {
    name: 'Pro',
    price: '199',
    id: 'pro',
    products: '10\'000',
    features: ['10\'000 Produkte', '4 Sprachen (DE/FR/IT/EN)', 'CSV Import/Export', 'Dedicated Support', 'API Zugang', 'Bulk-Übersetzungen', 'Custom Integrationen'],
    cta: 'Upgrade',
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpgrade = async (planId: string) => {
    if (planId === 'free') return;
    
    setLoading(planId);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        window.location.href = '/login?redirect=/pricing';
        return;
      }

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ plan: planId }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Fehler beim Erstellen der Checkout-Session');
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      alert('Ein Fehler ist aufgetreten');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-slate-800">
            🌐 TranslateShop.ch
          </Link>
          <Link href="/dashboard" className="text-slate-600 hover:text-slate-800">
            Dashboard →
          </Link>
        </div>
      </header>

      {/* Pricing */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Einfache, transparente Preise
          </h1>
          <p className="text-xl text-slate-600">
            Wählen Sie den Plan, der zu Ihrem Shop passt
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 ${
                plan.popular
                  ? 'bg-red-600 text-white ring-4 ring-red-200'
                  : 'bg-white border border-slate-200'
              }`}
            >
              {plan.popular && (
                <span className="inline-block bg-white text-red-600 text-xs font-semibold px-2 py-1 rounded mb-4">
                  BELIEBT
                </span>
              )}
              <h3 className={`text-xl font-semibold ${plan.popular ? 'text-white' : 'text-slate-800'}`}>
                {plan.name}
              </h3>
              <div className="mt-4 mb-6">
                <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-slate-800'}`}>
                  CHF {plan.price}
                </span>
                <span className={plan.popular ? 'text-red-100' : 'text-slate-500'}>/Monat</span>
              </div>
              <p className={`text-sm mb-6 ${plan.popular ? 'text-red-100' : 'text-slate-600'}`}>
                Bis zu {plan.products} Produkte
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className={`flex items-center text-sm ${plan.popular ? 'text-white' : 'text-slate-600'}`}>
                    <span className="mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleUpgrade(plan.id)}
                disabled={plan.disabled || loading === plan.id}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  plan.disabled
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : plan.popular
                    ? 'bg-white text-red-600 hover:bg-red-50'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {loading === plan.id ? 'Laden...' : plan.cta}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
