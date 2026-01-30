'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm fixed w-full z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-slate-800">
            🌐 TranslateShop<span className="text-red-600">.ch</span>
          </div>
          <div className="space-x-4">
            <Link href="/login" className="text-slate-600 hover:text-slate-800">
              Anmelden
            </Link>
            <Link 
              href="/register" 
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Kostenlos starten
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-5xl font-bold text-slate-800 mb-6">
              Ihr Shop in <span className="text-red-600">4 Sprachen</span>
              <br />in wenigen Minuten
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Erreichen Sie die ganze Schweiz. Übersetzen Sie Ihren Online-Shop 
              automatisch auf Deutsch, Französisch, Italienisch und Englisch.
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                href="/register" 
                className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition shadow-lg"
              >
                50 Produkte gratis testen →
              </Link>
            </div>
            <p className="mt-4 text-slate-500">Keine Kreditkarte nötig</p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 py-16">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">🇨🇭</div>
              <h3 className="text-xl font-semibold mb-2">Schweiz-optimiert</h3>
              <p className="text-slate-600">
                Nicht einfach Google Translate. Echte Schweizer Lokalisierung 
                mit CHF, korrekten Formulierungen und Helvetismen.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Blitzschnell</h3>
              <p className="text-slate-600">
                Laden Sie Ihre Produkte hoch und erhalten Sie alle 
                Übersetzungen in Minuten — nicht Tagen.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Fair & Transparent</h3>
              <p className="text-slate-600">
                Ab 49 CHF/Monat. Keine versteckten Kosten, 
                keine Überraschungen. Monatlich kündbar.
              </p>
            </div>
          </div>

          {/* Pricing Preview */}
          <div className="py-16 text-center">
            <h2 className="text-3xl font-bold mb-8">Einfache Preise</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-transparent">
                <h3 className="font-semibold text-lg">Starter</h3>
                <div className="text-3xl font-bold my-4">49 <span className="text-lg">CHF/Mt</span></div>
                <p className="text-slate-600">Bis 200 Produkte</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-red-600">
                <div className="text-red-600 text-sm font-semibold mb-2">BELIEBT</div>
                <h3 className="font-semibold text-lg">Business</h3>
                <div className="text-3xl font-bold my-4">99 <span className="text-lg">CHF/Mt</span></div>
                <p className="text-slate-600">Bis 1'000 Produkte</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-transparent">
                <h3 className="font-semibold text-lg">Pro</h3>
                <div className="text-3xl font-bold my-4">199 <span className="text-lg">CHF/Mt</span></div>
                <p className="text-slate-600">Unbegrenzt</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© 2026 TranslateShop.ch — Made in Switzerland 🇨🇭</p>
        </div>
      </footer>
    </div>
  );
}
