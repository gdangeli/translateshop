'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
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
            <Link href="/register" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
              Kostenlos starten
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-20">
            <div className="inline-block bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-medium mb-6">
              🚀 Neu: KI-gestützte Übersetzungen für Schweizer Shops
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              Erreichen Sie <span className="text-red-600">4x mehr Kunden</span>
              <br />in der Schweiz
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Übersetzen Sie Ihren Online-Shop in Minuten auf Deutsch, Französisch, Italienisch und Englisch. KI-Qualität, Schweizer Präzision.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register" className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition shadow-lg hover:shadow-xl">
                Jetzt kostenlos testen →
              </Link>
              <Link href="#demo" className="bg-white text-slate-700 px-8 py-4 rounded-lg text-lg font-semibold border border-slate-200 hover:border-slate-300 transition">
                Demo ansehen
              </Link>
            </div>
            <p className="mt-4 text-slate-500 text-sm">
              ✓ 50 Credits gratis · ✓ Keine Kreditkarte · ✓ Sofort starten
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 py-8 border-y border-slate-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">500+</div>
              <div className="text-sm text-slate-500">Schweizer Shops</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">50000+</div>
              <div className="text-sm text-slate-500">Übersetzte Produkte</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">4.9/5</div>
              <div className="text-sm text-slate-500">Kundenbewertung</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">🇨🇭</div>
              <div className="text-sm text-slate-500">Made in Switzerland</div>
            </div>
          </div>

          {/* How it Works */}
          <div className="py-20 bg-slate-50 -mx-4 px-4 rounded-3xl" id="demo">
            <h2 className="text-3xl font-bold text-center mb-4">So einfach gehts</h2>
            <p className="text-slate-600 text-center mb-12 max-w-xl mx-auto">In 3 Schritten zu Ihrem mehrsprachigen Shop</p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
               <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">CSV hochladen</h3>
                <p className="text-slate-600">Exportieren Sie Ihre Produkte aus Ihrem Shop-System und laden Sie die CSV-Datei hoch.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Übersetzen lassen</h3>
                <p className="text-slate-600">Mit einem Klick übersetzen Sie alle Produkte in alle 4 Sprachen — in Sekunden.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Exportieren</h3>
                <p className="text-slate-600">Laden Sie die übersetzten Produkte als CSV herunter und importieren Sie sie in Ihren Shop.</p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="py-20" id="pricing">
            <h2 className="text-3xl font-bold text-center mb-4">Einfache, transparente Preise</h2>
            <p className="text-slate-600 text-center mb-12">Kaufen Sie Credits nach Bedarf. 1 Credit = 1 Zeile x 1 Sprache.</p>
            <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-semibold text-lg">Free</h3>
                <div className="text-3xl font-bold my-4">0 <span className="text-lg font-normal text-slate-500">CHF</span></div>
                <p className="text-slate-600 text-sm mb-4">50 Credits</p>
                <ul className="text-sm space-y-2 mb-6">
                  <li>✓ 50 Übersetzungs-Credits</li>
                  <li>✓ 4 Sprachen (DE/FR/IT/EN)</li>
                  <li>✓ CSV Import/Export</li>
                </ul>
                <Link href="/register" className="block text-center py-2 border border-slate-200 rounded-lg hover:bg-slate-50">Kostenlos starten</Link>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-semibold text-lg">Starter</h3>
                <div className="text-3xl font-bold my-4">9 <span className="text-lg font-normal text-slate-500">CHF</span></div>
                <p className="text-slate-600 text-sm mb-4">500 Credits</p>
                <ul className="text-sm space-y-2 mb-6">
                  <li>✓ 500 Übersetzungs-Credits</li>
                  <li>✓ 4 Sprachen (DE/FR/IT/EN)</li>
                  <li>✓ E-Mail Support</li>
                </ul>
                <a href="https://buy.stripe.com/6oU5kFaWJeHJ7CL2Td7Vm01" className="block text-center py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Kaufen</a>
              </div>
              <div className="bg-red-600 text-white p-6 rounded-xl shadow-lg scale-105">
                <div className="text-xs font-semibold mb-2 bg-white/20 inline-block px-2 py-0.5 rounded">BELIEBT</div>
                <h3 className="font-semibold text-lg">Pro</h3>
                <div className="text-3xl font-bold my-4">29 <span className="text-lg font-normal opacity-80">CHF</span></div>
                <p className="opacity-80 text-sm mb-4">2000 Credits</p>
                <ul className="text-sm space-y-2 mb-6 opacity-90">
                  <li>✓ 2000 Übersetzungs-Credits</li>
                  <li>✓ 4 Sprachen (DE/FR/IT/EN)</li>
                  <li>✓ Prioritäts-Support</li>
                </ul>
               <a href="https://buy.stripe.com/cNi6oJaWJ1UX9KT1P97Vm02" className="block text-center py-2 bg-white text-red-600 rounded-lg font-semibold hover:bg-red-50">Kaufen</a>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-semibold text-lg">Business</h3>
                <div className="text-3xl font-bold my-4">79 <span className="text-lg font-normal text-slate-500">CHF</span></div>
                <p className="text-slate-600 text-sm mb-4">6000 Credits</p>
                <ul className="text-sm space-y-2 mb-6">
                  <li>✓ 6000 Übersetzungs-Credits</li>
                  <li>✓ 4 Sprachen (DE/FR/IT/EN)</li>
                  <li>✓ Prioritäts-Support</li>
                  <li>✓ API Zugang</li>
                </ul>
                <a href="https://buy.stripe.com/aFacN73uhbvx2ir0L57Vm03" className="block text-center py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Kaufen</a>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-semibold text-lg">Unlimited</h3>
                <div className="text-3xl font-bold my-4">49 <span className="text-lg font-normal text-slate-500">CHF/Mt</span></div>
                <p className="text-slate-600 text-sm mb-4">Unbegrenzt</p>
                <ul className="text-sm space-y-2 mb-6">
                  <li>✓ Unbegrenzte Credits</li>
                  <li>✓ 4 Sprachen (DE/FR/IT/EN)</li>
                  <li>✓ Prioritäts-Support</li>
                  <li>✓ API Zugang</li>
                </ul>
                <a href="https://buy.stripe.com/fZu00l4yl6bd4qzfFZ7Vm04" className="block text-center py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Abonnieren</a>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="py-20 text-center bg-gradient-to-r from-red-600 to-red-700 -mx-4 px-4 rounded-3xl text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bereit für 4x mehr Kunden?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto">Starten Sie heute kostenlos und übersetzen Sie 50 Produkte gratis.</p>
            <Link href="/register" className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-50 transition shadow-lg">Jetzt kostenlos starten →</Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-white font-bold text-lg mb-4">🌐 TranslateShop.ch</div>
              <p className="text-sm">Automatische Übersetzungen für Schweizer Online-Shops.</p>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">Produkt</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="#demo" className="hover:text-white">So funktionierts</Link></li>
                <li><Link href="#pricing" className="hover:text-white">Preise</Link></li>
                <li><Link href="/login" className="hover:text-white">Anmelden</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">Support</div>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:support@translateshop.ch" className="hover:text-white">support@translateshop.ch</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">Rechtliches</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/impressum" className="hover:text-white">Impressum</Link></li>
               <li><Link href="/datenschutz" className="hover:text-white">Datenschutz</Link></li>
                <li><Link href="/agb" className="hover:text-white">AGB</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-sm">
            <p>©️ 2026 TranslateShop.ch — Made with ❤️ in Switzerland 🇨🇭</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
