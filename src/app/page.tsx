'use client';

// test

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
              Übersetzen Sie Ihren Online-Shop in Minuten auf Deutsch, Französisch, 
              Italienisch und Englisch. KI-Qualität, Schweizer Präzision.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/register" 
                className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition shadow-lg hover:shadow-xl"
              >
                Jetzt kostenlos testen →
              </Link>
              <Link 
                href="#demo" 
                className="bg-white text-slate-700 px-8 py-4 rounded-lg text-lg font-semibold border border-slate-200 hover:border-slate-300 transition"
              >
                Demo ansehen
              </Link>
            </div>
            <p className="mt-4 text-slate-500 text-sm">
              ✓ 50 Produkte gratis &nbsp; ✓ Keine Kreditkarte &nbsp; ✓ Sofort starten
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 py-8 border-y border-slate-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">500+</div>
              <div className="text-sm text-slate-500">Schweizer Shops</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">50'000+</div>
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

          {/* Problem/Solution */}
          <div className="py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  70% der Schweizer kaufen lieber in ihrer Sprache
                </h2>
                <p className="text-slate-600 mb-4">
                  Ein Deutschschweizer Shop erreicht nur 63% des Marktes. 
                  Französisch, Italienisch und Englisch öffnen Ihnen den Rest.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">✗</span>
                    <span className="text-slate-600">Manuelle Übersetzungen sind teuer und langsam</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">✗</span>
                    <span className="text-slate-600">Google Translate klingt unprofessionell</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">✗</span>
                    <span className="text-slate-600">Agenturen verlangen CHF 0.15+ pro Wort</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-green-600">
                  ✓ Die Lösung: TranslateShop
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>KI-Übersetzungen in Sekunden, nicht Wochen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Schweizer Qualität mit CHF, Helvetismen, du/Sie</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Flat-Rate ab CHF 49/Monat — unbegrenzt übersetzen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>CSV Import/Export für alle Shop-Systeme</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How it Works */}
          <div className="py-20 bg-slate-50 -mx-4 px-4 rounded-3xl" id="demo">
            <h2 className="text-3xl font-bold text-center mb-4">So einfach geht's</h2>
            <p className="text-slate-600 text-center mb-12 max-w-xl mx-auto">
              In 3 Schritten zu Ihrem mehrsprachigen Shop
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">CSV hochladen</h3>
                <p className="text-slate-600">
                  Exportieren Sie Ihre Produkte aus Ihrem Shop-System 
                  und laden Sie die CSV-Datei hoch.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Übersetzen lassen</h3>
                <p className="text-slate-600">
                  Mit einem Klick übersetzen Sie alle Produkte 
                  in alle 4 Sprachen — in Sekunden.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Exportieren</h3>
                <p className="text-slate-600">
                  Laden Sie die übersetzten Produkte als CSV herunter 
                  und importieren Sie sie in Ihren Shop.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="py-20">
            <h2 className="text-3xl font-bold text-center mb-12">Warum TranslateShop?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="text-3xl mb-4">🇨🇭</div>
                <h3 className="text-xl font-semibold mb-2">Schweiz-optimiert</h3>
                <p className="text-slate-600">
                  Echte Schweizer Lokalisierung mit CHF, korrekten 
                  Formulierungen und Helvetismen. Kein "ß", keine "€".
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="text-3xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold mb-2">KI-Qualität</h3>
                <p className="text-slate-600">
                  Powered by modernste KI. Versteht Kontext, Produktkategorien 
                  und branchenspezifische Begriffe.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Blitzschnell</h3>
                <p className="text-slate-600">
                  100 Produkte in unter 2 Minuten. Keine Wartezeiten, 
                  keine Termine mit Übersetzern.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="text-3xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-2">Faire Preise</h3>
                <p className="text-slate-600">
                  Flat-Rate statt pro Wort. Ab CHF 49/Monat übersetzen 
                  Sie so viel Sie wollen.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="text-3xl mb-4">🔄</div>
                <h3 className="text-xl font-semibold mb-2">Alle Shops</h3>
                <p className="text-slate-600">
                  Funktioniert mit Shopify, WooCommerce, PrestaShop, 
                  Magento und jedem CSV-fähigen System.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="text-3xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-2">Sicher & DSGVO</h3>
                <p className="text-slate-600">
                  Ihre Daten bleiben in der Schweiz. Vollständig 
                  DSGVO-konform. Keine Weitergabe an Dritte.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="py-20 bg-slate-50 -mx-4 px-4 rounded-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">Das sagen unsere Kunden</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">★★★★★</div>
                <p className="text-slate-600 mb-4">
                  "Endlich erreichen wir auch die Romandie! Umsatz in der 
                  Westschweiz um 40% gestiegen seit wir TranslateShop nutzen."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Marco S.</div>
                    <div className="text-sm text-slate-500">Outdoor-Shop, Zürich</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">★★★★★</div>
                <p className="text-slate-600 mb-4">
                  "500 Produkte in 10 Minuten übersetzt. Was früher Wochen 
                  dauerte, geht jetzt während der Kaffeepause."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Sandra M.</div>
                    <div className="text-sm text-slate-500">Mode-Boutique, Basel</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">★★★★★</div>
                <p className="text-slate-600 mb-4">
                  "Die Qualität ist erstaunlich gut. Meine italienischen 
                  Kunden merken keinen Unterschied zu manuellen Übersetzungen."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Thomas B.</div>
                    <div className="text-sm text-slate-500">Elektronik-Shop, Bern</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="py-20" id="pricing">
            <h2 className="text-3xl font-bold text-center mb-4">Einfache, transparente Preise</h2>
            <p className="text-slate-600 text-center mb-12">
              Starten Sie kostenlos. Upgraden Sie wenn Sie wachsen.
            </p>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-semibold text-lg">Free</h3>
                <div className="text-3xl font-bold my-4">0 <span className="text-lg font-normal text-slate-500">CHF</span></div>
                <p className="text-slate-600 text-sm mb-4">Zum Testen</p>
                <ul className="text-sm space-y-2 mb-6">
                  <li>✓ 50 Produkte</li>
                  <li>✓ 4 Sprachen</li>
                  <li>✓ CSV Export</li>
                </ul>
                <Link href="/register" className="block text-center py-2 border border-slate-200 rounded-lg hover:bg-slate-50">
                  Kostenlos starten
                </Link>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-semibold text-lg">Starter</h3>
                <div className="text-3xl font-bold my-4">49 <span className="text-lg font-normal text-slate-500">CHF/Mt</span></div>
                <p className="text-slate-600 text-sm mb-4">Für kleine Shops</p>
                <ul className="text-sm space-y-2 mb-6">
                  <li>✓ 200 Produkte</li>
                  <li>✓ 4 Sprachen</li>
                  <li>✓ E-Mail Support</li>
                </ul>
                <Link href="/register" className="block text-center py-2 border border-slate-200 rounded-lg hover:bg-slate-50">
                  Auswählen
                </Link>
              </div>
              <div className="bg-red-600 text-white p-6 rounded-xl shadow-lg scale-105">
                <div className="text-xs font-semibold mb-2 bg-white/20 inline-block px-2 py-0.5 rounded">BELIEBT</div>
                <h3 className="font-semibold text-lg">Business</h3>
                <div className="text-3xl font-bold my-4">99 <span className="text-lg font-normal opacity-80">CHF/Mt</span></div>
                <p className="opacity-80 text-sm mb-4">Für wachsende Shops</p>
                <ul className="text-sm space-y-2 mb-6 opacity-90">
                  <li>✓ 1'000 Produkte</li>
                  <li>✓ 4 Sprachen</li>
                  <li>✓ Prioritäts-Support</li>
                  <li>✓ API Zugang</li>
                </ul>
                <Link href="/register" className="block text-center py-2 bg-white text-red-600 rounded-lg font-semibold hover:bg-red-50">
                  Auswählen
                </Link>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-semibold text-lg">Pro</h3>
                <div className="text-3xl font-bold my-4">199 <span className="text-lg font-normal text-slate-500">CHF/Mt</span></div>
                <p className="text-slate-600 text-sm mb-4">Für grosse Shops</p>
                <ul className="text-sm space-y-2 mb-6">
                  <li>✓ 10'000 Produkte</li>
                  <li>✓ 4 Sprachen</li>
                  <li>✓ Dedicated Support</li>
                  <li>✓ Custom Integration</li>
                </ul>
                <Link href="/register" className="block text-center py-2 border border-slate-200 rounded-lg hover:bg-slate-50">
                  Auswählen
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="py-20">
            <h2 className="text-3xl font-bold text-center mb-12">Häufige Fragen</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <details className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  Wie funktioniert die Übersetzung?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-600">
                  TranslateShop nutzt modernste KI-Technologie (ähnlich ChatGPT), die speziell 
                  für Schweizer E-Commerce trainiert wurde. Die KI versteht Kontext, Produktkategorien 
                  und übersetzt mit Schweizer Besonderheiten (CHF, Helvetismen, kein ß).
                </p>
              </details>
              <details className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  Welche Shop-Systeme werden unterstützt?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-600">
                  Jedes System das CSV-Export/Import unterstützt: Shopify, WooCommerce, PrestaShop, 
                  Magento, Shopware, und viele mehr. Sie exportieren Ihre Produkte als CSV, 
                  übersetzen sie bei uns, und importieren sie wieder.
                </p>
              </details>
              <details className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  Wie gut ist die Übersetzungsqualität?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-600">
                  Die Qualität ist vergleichbar mit professionellen Übersetzern — zu einem Bruchteil 
                  der Kosten. Für 95% der E-Commerce-Texte ist die Qualität ausgezeichnet. 
                  Bei sehr technischen oder kreativen Texten empfehlen wir eine kurze Kontrolle.
                </p>
              </details>
              <details className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  Kann ich kündigen wann ich will?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-600">
                  Ja, alle Pläne sind monatlich kündbar. Keine Mindestlaufzeit, keine versteckten 
                  Gebühren. Sie können jederzeit upgraden, downgraden oder kündigen.
                </p>
              </details>
              <details className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  Sind meine Daten sicher?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-600">
                  Absolut. Alle Daten werden verschlüsselt übertragen und in der Schweiz 
                  gespeichert. Wir sind vollständig DSGVO-konform und geben keine Daten 
                  an Dritte weiter. Ihre Produktdaten gehören Ihnen.
                </p>
              </details>
            </div>
          </div>

          {/* Final CTA */}
          <div className="py-20 text-center bg-gradient-to-r from-red-600 to-red-700 -mx-4 px-4 rounded-3xl text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bereit für 4x mehr Kunden?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto">
              Starten Sie heute kostenlos und übersetzen Sie 50 Produkte gratis.
            </p>
            <Link 
              href="/register" 
              className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-50 transition shadow-lg"
            >
              Jetzt kostenlos starten →
            </Link>
            <p className="mt-4 text-sm opacity-75">
              Keine Kreditkarte nötig • In 2 Minuten eingerichtet
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-white font-bold text-lg mb-4">🌐 TranslateShop.ch</div>
              <p className="text-sm">
                Automatische Übersetzungen für Schweizer Online-Shops.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">Produkt</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="#demo" className="hover:text-white">So funktioniert's</Link></li>
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
            <p>© 2026 TranslateShop.ch — Made with ❤️ in Switzerland 🇨🇭</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
