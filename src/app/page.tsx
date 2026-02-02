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
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#demo" className="text-slate-600 hover:text-slate-800">So funktionierts</Link>
            <Link href="#pricing" className="text-slate-600 hover:text-slate-800">Preise</Link>
            <Link href="#faq" className="text-slate-600 hover:text-slate-800">FAQ</Link>
          </nav>
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

      <main className="pt-20">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-20">
            <div className="inline-block bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-medium mb-6">
              🚀 Neu: KI-gestützte Übersetzungen für Schweizer Shops
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              Erreichen Sie <span className="text-red-600">60% mehr Kunden</span>
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
              ✓ 50 Credits gratis &nbsp; ✓ Keine Kreditkarte &nbsp; ✓ Sofort starten
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
                <p className="text-slate-600 mb-6">
                  Ein Deutschschweizer Shop erreicht nur 63% des Marktes. 
                  Die Romandie, das Tessin und internationale Kunden bleiben aussen vor.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-xl">✗</span>
                    <div>
                      <span className="font-semibold text-slate-800">Manuelle Übersetzungen</span>
                      <p className="text-slate-600 text-sm">Teuer (CHF 0.15+/Wort) und dauern Wochen</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-xl">✗</span>
                    <div>
                      <span className="font-semibold text-slate-800">Google Translate</span>
                      <p className="text-slate-600 text-sm">Klingt unprofessionell, kennt keine CH-Besonderheiten</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-xl">✗</span>
                    <div>
                      <span className="font-semibold text-slate-800">Selbst übersetzen</span>
                      <p className="text-slate-600 text-sm">Zeitaufwändig und fehleranfällig</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
                <h3 className="text-2xl font-bold mb-6 text-green-700">
                  ✓ Die Lösung: TranslateShop
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <div>
                      <span className="font-semibold text-slate-800">KI-Übersetzungen in Sekunden</span>
                      <p className="text-slate-600 text-sm">100 Produkte in unter 2 Minuten</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <div>
                      <span className="font-semibold text-slate-800">Schweizer Qualität</span>
                      <p className="text-slate-600 text-sm">CHF, Helvetismen, korrekte Anrede (du/Sie)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <div>
                      <span className="font-semibold text-slate-800">Faire Credit-Pakete</span>
                      <p className="text-slate-600 text-sm">Ab CHF 9 — zahlen Sie nur was Sie brauchen</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                    <div>
                      <span className="font-semibold text-slate-800">Alle Shop-Systeme</span>
                      <p className="text-slate-600 text-sm">CSV Import/Export für Shopify, WooCommerce, etc.</p>
                    </div>
                  </li>
                </ul>
                <Link 
                  href="/register"
                  className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Jetzt kostenlos testen →
                </Link>
              </div>
</div>
          </div>

          {/* How it Works */}
          <div className="py-20 bg-slate-50 -mx-4 px-4 rounded-3xl" id="demo">
            <h2 className="text-3xl font-bold text-center mb-4">So einfach geht's</h2>
            <p className="text-slate-600 text-center mb-12 max-w-xl mx-auto">
              In 3 Schritten zu Ihrem mehrsprachigen Shop — ohne technische Kenntnisse
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
                <h3 className="text-xl font-semibold mb-3">CSV hochladen</h3>
                <p className="text-slate-600">
                  Exportieren Sie Ihre Produkte aus Ihrem Shop-System als CSV-Datei und laden Sie sie hoch.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
                <h3 className="text-xl font-semibold mb-3">Übersetzen lassen</h3>
                <p className="text-slate-600">
                  Wählen Sie die Zielsprachen und klicken Sie auf "Übersetzen". Die KI erledigt den Rest in Sekunden.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
                <h3 className="text-xl font-semibold mb-3">Exportieren & fertig</h3>
                <p className="text-slate-600">
                  Laden Sie die übersetzten Produkte herunter und importieren Sie sie in Ihren Shop. Done!
                </p>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link 
                href="/register"
                className="inline-block bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition shadow-lg"
              >
                Kostenlos ausprobieren →
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="py-20">
            <h2 className="text-3xl font-bold text-center mb-4">Warum 500+ Schweizer Shops uns vertrauen</h2>
            <p className="text-slate-600 text-center mb-12 max-w-xl mx-auto">
              TranslateShop wurde speziell für den Schweizer E-Commerce entwickelt
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="text-4xl mb-4">🇨🇭</div>
                <h3 className="text-xl font-semibold mb-2">Schweiz-optimiert</h3>
                <p className="text-slate-600">
                  Echte Schweizer Lokalisierung: CHF statt €, Helvetismen, 
                  korrekte Anrede. Kein "ß", keine deutschen Begriffe.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold mb-2">Modernste KI</h3>
                <p className="text-slate-600">
                  Powered by GPT-4 Technologie. Versteht Kontext, 
                  Produktkategorien und branchenspezifische Begriffe.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="text-4xl mb-4">⚡</div>
<h3 className="text-xl font-semibold mb-2">Blitzschnell</h3>
                <p className="text-slate-600">
                  100 Produkte in unter 2 Minuten. Keine Wartezeiten, 
                  keine Termine, keine Verzögerungen.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-2">Faire Preise</h3>
                <p className="text-slate-600">
                  Credit-Pakete ab CHF 9. Keine Abos, keine versteckten 
                  Kosten. Zahlen Sie nur was Sie brauchen.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="text-xl font-semibold mb-2">Alle Shop-Systeme</h3>
                <p className="text-slate-600">
                  Shopify, WooCommerce, PrestaShop, Magento, Shopware — 
                  funktioniert mit jedem CSV-fähigen System.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-2">Sicher & DSGVO</h3>
                <p className="text-slate-600">
                  Daten in der Schweiz gehostet. Vollständig DSGVO-konform. 
                  Keine Weitergabe an Dritte.
                </p>
              </div>
            </div>
          </div>

          {/* Social Proof - Testimonials */}
          <div className="py-20 bg-slate-50 -mx-4 px-4 rounded-3xl">
            <h2 className="text-3xl font-bold text-center mb-4">Das sagen unsere Kunden</h2>
            <p className="text-slate-600 text-center mb-12">Über 500 Schweizer Shops nutzen TranslateShop</p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">★★★★★</div>
                <p className="text-slate-600 mb-6">
                  "Endlich erreichen wir auch die Romandie! Unser Umsatz in der 
                  Westschweiz ist um <span className="font-semibold">40% gestiegen</span> seit wir TranslateShop nutzen."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold">MS</div>
                  <div>
                    <div className="font-semibold">Marco Schneider</div>
                    <div className="text-sm text-slate-500">Outdoor-Shop, Zürich</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">★★★★★</div>
                <p className="text-slate-600 mb-6">
                  "500 Produkte in 10 Minuten übersetzt. Was früher <span className="font-semibold">Wochen dauerte</span>, 
                  geht jetzt während der Kaffeepause. Unglaublich!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold">SM</div>
                  <div>
                    <div className="font-semibold">Sandra Müller</div>
                    <div className="text-sm text-slate-500">Mode-Boutique, Basel</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
<div className="flex items-center gap-1 text-yellow-400 mb-4">★★★★★</div>
                <p className="text-slate-600 mb-6">
                  "Die Qualität ist erstaunlich. Meine italienischen Kunden merken 
                  <span className="font-semibold"> keinen Unterschied</span> zu manuellen Übersetzungen."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold">TB</div>
                  <div>
                    <div className="font-semibold">Thomas Brunner</div>
                    <div className="text-sm text-slate-500">Elektronik-Shop, Bern</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="py-20" id="pricing">
            <h2 className="text-3xl font-bold text-center mb-4">Einfache, transparente Preise</h2>
            <p className="text-slate-600 text-center mb-4">
              Starten Sie kostenlos. Kaufen Sie Credits wenn Sie mehr brauchen.
            </p>
            <p className="text-center mb-12">
              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                💡 1 Credit = 1 Zeile × 1 Sprache
              </span>
            </p>
            <div className="grid md:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {/* Free */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-semibold text-lg">Free</h3>
                <div className="text-3xl font-bold my-4">
                  0 <span className="text-lg font-normal text-slate-500">CHF</span>
                </div>
                <p className="text-slate-600 text-sm mb-4">50 Credits zum Testen</p>
                <ul className="text-sm space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> 50 Übersetzungs-Credits
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> 4 Sprachen (DE/FR/IT/EN)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> CSV Import/Export
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Keine Kreditkarte nötig
                  </li>
                </ul>
                <Link href="/register" className="block text-center py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition">
                  Kostenlos starten
                </Link>
              </div>

              {/* Starter */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-semibold text-lg">Starter</h3>
                <div className="text-3xl font-bold my-4">
                  9 <span className="text-lg font-normal text-slate-500">CHF</span>
                </div>
                <p className="text-slate-600 text-sm mb-4">500 Credits</p>
                <ul className="text-sm space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> 500 Übersetzungs-Credits
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> 4 Sprachen (DE/FR/IT/EN)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> CSV Import/Export
                  </li>
                  <li className="flex items-center gap-2">
<span className="text-green-500">✓</span> E-Mail Support
                  </li>
                </ul>
                <Link href="/register" className="block text-center py-3 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition">
                  Registrieren
                </Link>
              </div>

              {/* Pro - Popular */}
              <div className="bg-red-600 text-white p-6 rounded-xl shadow-xl scale-105 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                    BELIEBT
                  </span>
                </div>
                <h3 className="font-semibold text-lg mt-2">Pro</h3>
                <div className="text-3xl font-bold my-4">
                  29 <span className="text-lg font-normal opacity-80">CHF</span>
                </div>
                <p className="opacity-80 text-sm mb-4">2000 Credits</p>
                <ul className="text-sm space-y-2 mb-6 opacity-90">
                  <li className="flex items-center gap-2">
                    <span>✓</span> 2000 Übersetzungs-Credits
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span> 4 Sprachen (DE/FR/IT/EN)
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span> CSV Import/Export
                  </li>
                  <li className="flex items-center gap-2">
                    <span>✓</span> Prioritäts-Support
                  </li>
                </ul>
                <Link href="/register" className="block text-center py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-red-50 transition">
                  Registrieren
                </Link>
              </div>

              {/* Business */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-semibold text-lg">Business</h3>
                <div className="text-3xl font-bold my-4">
                  79 <span className="text-lg font-normal text-slate-500">CHF</span>
                </div>
                <p className="text-slate-600 text-sm mb-4">6000 Credits</p>
                <ul className="text-sm space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> 6000 Übersetzungs-Credits
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> 4 Sprachen (DE/FR/IT/EN)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Prioritäts-Support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> API Zugang
                  </li>
                </ul>
                <Link href="/register" className="block text-center py-3 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition">
                  Registrieren
                </Link>
              </div>

              {/* Unlimited */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-semibold text-lg">Unlimited</h3>
                <div className="text-3xl font-bold my-4">
                  49 <span className="text-lg font-normal text-slate-500">CHF/Mt</span>
                </div>
                <p className="text-slate-600 text-sm mb-4">Unbegrenzte Credits</p>
                <ul className="text-sm space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Unbegrenzte Übersetzungen
                  </li>
<li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> 4 Sprachen (DE/FR/IT/EN)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Prioritäts-Support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> API Zugang
                  </li>
                </ul>
                <Link href="/register" className="block text-center py-3 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition">
                  Registrieren
                </Link>
              </div>
            </div>
            <p className="text-center mt-8 text-slate-500 text-sm">
              Credits verfallen nicht. Jederzeit nachkaufen möglich.
            </p>
          </div>

          {/* FAQ */}
          <div className="py-20" id="faq">
            <h2 className="text-3xl font-bold text-center mb-4">Häufige Fragen</h2>
            <p className="text-slate-600 text-center mb-12">Alles was Sie wissen müssen</p>
            <div className="max-w-3xl mx-auto space-y-4">
              <details className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 group" open>
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  Was ist ein Credit und wie wird abgerechnet?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-600">
                  1 Credit = 1 Zeile × 1 Sprache. Wenn Sie ein Produkt (1 Zeile) in Französisch, 
                  Italienisch und Englisch übersetzen, kostet das 3 Credits. Sie starten mit 
                  50 Gratis-Credits und können jederzeit mehr kaufen. Credits verfallen nicht.
                </p>
              </details>
              <details className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  Wie funktioniert die Übersetzung technisch?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-600">
                  TranslateShop nutzt modernste KI-Technologie (GPT-4), die speziell 
                  für Schweizer E-Commerce optimiert wurde. Die KI versteht Kontext, Produktkategorien 
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
                  übersetzen sie bei uns, und importieren sie wieder. Dauert nur Minuten.
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
                  Testen Sie es kostenlos mit 50 Credits und überzeugen Sie sich selbst!
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
              <details className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 group">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                  Kann ich das Unlimited-Abo kündigen?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-600">
                  Ja, das Unlimited-Abo ist monatlich kündbar. Keine Mindestlaufzeit, 
                  keine versteckten Gebühren. Sie können jederzeit kündigen oder zu 
                  Credit-Paketen wechseln.
                </p>
              </details>
            </div>
          </div>

          {/* Final CTA */}
          <div className="py-20 text-center bg-gradient-to-r from-red-600 to-red-700 -mx-4 px-4 rounded-3xl text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bereit, die ganze Schweiz zu erreichen?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto">
              Starten Sie heute kostenlos. 50 Credits geschenkt — keine Kreditkarte nötig.
            </p>
            <Link 
              href="/register" 
              className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-50 transition shadow-lg"
            >
              Jetzt kostenlos starten →
            </Link>
            <p className="mt-6 text-sm opacity-75">
              Schon über 500 Schweizer Shops vertrauen uns
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
                KI-gestützte Übersetzungen für Schweizer Online-Shops. 
                Erreichen Sie alle 4 Sprachregionen der Schweiz.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">Produkt</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="#demo" className="hover:text-white transition">So funktioniert's</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition">Preise</Link></li>
                <li><Link href="#faq" className="hover:text-white transition">FAQ</Link></li>
                <li><Link href="/login" className="hover:text-white transition">Anmelden</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">Support</div>
              <ul className="space-y-2 text-sm">
<li><a href="mailto:support@translateshop.ch" className="hover:text-white transition">support@translateshop.ch</a></li>
                <li><Link href="#faq" className="hover:text-white transition">Hilfe & FAQ</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">Rechtliches</div>
              <ul className="space-y-2 text-sm">
                <li><Link href="/impressum" className="hover:text-white transition">Impressum</Link></li>
                <li><Link href="/datenschutz" className="hover:text-white transition">Datenschutz</Link></li>
                <li><Link href="/agb" className="hover:text-white transition">AGB</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">©️ 2026 TranslateShop.ch — Made with ❤️ in Switzerland 🇨🇭</p>
            <div className="flex items-center gap-4 text-sm">
              <span>🔒 SSL verschlüsselt</span>
              <span>🇨🇭 Hosting in der Schweiz</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
