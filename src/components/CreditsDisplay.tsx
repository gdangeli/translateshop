'use client';

import { useState } from 'react';

interface CreditsDisplayProps {
  credits: number;
  isUnlimited: boolean;
  userEmail: string;
}

const PACKAGES = [
  {
    id: 'starter',
    name: 'Starter',
    credits: 500,
    price: 'CHF 9',
    pricePerCredit: '1.8 Rp.',
    link: 'https://buy.stripe.com/6oU5kFaWJeHJ7CL2Td7Vm01',
  },
  {
    id: 'pro',
    name: 'Pro',
    credits: 2000,
    price: 'CHF 29',
    pricePerCredit: '1.45 Rp.',
    link: 'https://buy.stripe.com/cNi6oJaWJ1UX9KT1P97Vm02',
    popular: true,
  },
  {
    id: 'business',
    name: 'Business',
    credits: 6000,
    price: 'CHF 79',
    pricePerCredit: '1.3 Rp.',
    link: 'https://buy.stripe.com/aFacN73uhbvx2ir0L57Vm03',
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    credits: null,
    price: 'CHF 49/Mt',
    pricePerCredit: null,
    link: 'https://buy.stripe.com/fZu00l4yl6bd4qzfFZ7Vm04',
  },
];

export default function CreditsDisplay({ credits, isUnlimited, userEmail }: CreditsDisplayProps) {
  const [showModal, setShowModal] = useState(false);

  const handleBuy = (link: string) => {
    // Append email as prefill parameter
    const url = new URL(link);
    url.searchParams.set('prefilled_email', userEmail);
    window.open(url.toString(), '_blank');
  };

  return (
    <>
      {/* Credits Badge */}
      <div className="flex items-center gap-3">
        <div className="bg-slate-100 px-4 py-2 rounded-lg">
          {isUnlimited ? (
            <span className="font-semibold text-green-600">∞ Unlimited</span>
          ) : (
            <span className="font-semibold text-slate-700">{credits.toLocaleString()} Credits</span>
          )}
        </div>
        {!isUnlimited && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium"
          >
            + Credits kaufen
          </button>
        )}
      </div>

      {/* Buy Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-slate-800">Credits kaufen</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Current Credits */}
            <div className="px-6 py-4 bg-slate-50">
              <p className="text-slate-600">
                Aktuell: <span className="font-semibold">{credits.toLocaleString()} Credits</span>
              </p>
              <p className="text-sm text-slate-500">1 Credit = 1 Zeile × 1 Sprache</p>
            </div>

            {/* Packages Grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`border rounded-xl p-5 relative ${
                    pkg.popular ? 'border-green-500 border-2' : 'border-slate-200'
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-4 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      BELIEBT
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-slate-800">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-slate-900 mt-2">{pkg.price}</div>
                  <div className="text-slate-600 mt-1">
                    {pkg.credits ? (
                      <>
                        {pkg.credits.toLocaleString()} Credits
                        <span className="text-slate-400 text-sm ml-2">({pkg.pricePerCredit}/Credit)</span>
                      </>
                    ) : (
                      <span className="text-green-600 font-medium">Unbegrenzte Übersetzungen</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleBuy(pkg.link)}
                    className={`w-full mt-4 py-2.5 rounded-lg font-semibold transition ${
                      pkg.popular
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {pkg.id === 'unlimited' ? 'Abo starten' : 'Kaufen'}
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t bg-slate-50 text-sm text-slate-500">
              Credits verfallen nicht. Nach dem Kauf wird diese Seite automatisch aktualisiert.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
