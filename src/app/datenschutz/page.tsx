'use client';

import Link from 'next/link';

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-slate-800">
            🌐 TranslateShop<span className="text-red-600">.ch</span>
          </Link>
          <Link href="/" className="text-slate-600 hover:text-slate-800">
            ← Zurück
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">Datenschutzerklärung</h1>
        
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">1. Allgemeine Hinweise</h2>
            <p className="text-slate-600 mb-4">
              Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Diese 
              Datenschutzerklärung informiert Sie über die Erhebung, Verarbeitung und 
              Nutzung Ihrer personenbezogenen Daten bei der Nutzung von translateshop.ch.
            </p>
            <p className="text-slate-600">
              Verantwortlich für die Datenverarbeitung ist:<br />
              translateshop.ch<br />
              Lochwisstrasse 3<br />
              CH-8185 Winkel<br />
              E-Mail: <a href="mailto:kontakt@translateshop.ch" className="text-red-600 hover:underline">kontakt@translateshop.ch</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">2. Erhebung und Verarbeitung von Daten</h2>
            <p className="text-slate-600 mb-4">
              Wir erheben und verarbeiten folgende Daten:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li><strong>Registrierungsdaten:</strong> E-Mail-Adresse und Passwort bei der Kontoerstellung</li>
              <li><strong>Nutzungsdaten:</strong> Hochgeladene CSV-Dateien zur Übersetzung (werden nach der Verarbeitung gelöscht)</li>
              <li><strong>Zahlungsdaten:</strong> Werden direkt von unserem Zahlungsdienstleister Stripe verarbeitet</li>
              <li><strong>Technische Daten:</strong> IP-Adresse, Browser-Typ, Zugriffszeiten (für Sicherheit und Fehleranalyse)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">3. Zweck der Datenverarbeitung</h2>
            <p className="text-slate-600 mb-4">
              Wir verwenden Ihre Daten für folgende Zwecke:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>Bereitstellung und Verbesserung unserer Übersetzungsdienstleistung</li>
              <li>Verwaltung Ihres Benutzerkontos und Credit-Guthabens</li>
              <li>Abwicklung von Zahlungen</li>
              <li>Kommunikation bezüglich Ihres Kontos oder unserer Dienste</li>
              <li>Einhaltung gesetzlicher Verpflichtungen</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">4. Drittanbieter und Auftragsverarbeiter</h2>
            <p className="text-slate-600 mb-4">
              Wir arbeiten mit folgenden Dienstleistern zusammen:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li><strong>Vercel:</strong> Hosting unserer Website (USA, EU-Standardvertragsklauseln)</li>
              <li><strong>Supabase:</strong> Datenbankspeicherung für Benutzerkonten (EU-Server)</li>
              <li><strong>Stripe:</strong> Zahlungsabwicklung (PCI-DSS-konform)</li>
              <li><strong>OpenAI:</strong> KI-gestützte Übersetzungen (Daten werden nicht für Training verwendet)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">5. Cookies</h2>
            <p className="text-slate-600 mb-4">
              Wir verwenden folgende Cookies:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li><strong>Notwendige Cookies:</strong> Für Login-Funktionalität und Sitzungsverwaltung</li>
              <li><strong>Präferenz-Cookies:</strong> Speicherung Ihrer Spracheinstellung</li>
            </ul>
            <p className="text-slate-600 mt-4">
              Wir verwenden keine Tracking- oder Marketing-Cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">6. Datensicherheit</h2>
            <p className="text-slate-600">
              Wir setzen technische und organisatorische Sicherheitsmassnahmen ein, um Ihre 
              Daten gegen zufällige oder vorsätzliche Manipulation, Verlust, Zerstörung oder 
              den Zugriff unberechtigter Personen zu schützen. Die Datenübertragung erfolgt 
              verschlüsselt über SSL/TLS.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">7. Speicherdauer</h2>
            <p className="text-slate-600 mb-4">
              Wir speichern Ihre Daten nur so lange, wie es für die genannten Zwecke 
              erforderlich ist:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>Kontodaten: Bis zur Löschung Ihres Kontos</li>
              <li>Hochgeladene Dateien: Werden nach der Verarbeitung automatisch gelöscht</li>
              <li>Rechnungsdaten: 10 Jahre (gesetzliche Aufbewahrungspflicht)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">8. Ihre Rechte</h2>
            <p className="text-slate-600 mb-4">
              Nach dem Schweizer Datenschutzgesetz (DSG) haben Sie folgende Rechte:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li><strong>Auskunftsrecht:</strong> Sie können Auskunft über Ihre gespeicherten Daten verlangen</li>
              <li><strong>Berichtigungsrecht:</strong> Sie können die Korrektur falscher Daten verlangen</li>
              <li><strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer Daten verlangen</li>
              <li><strong>Datenportabilität:</strong> Sie können Ihre Daten in einem gängigen Format erhalten</li>
            </ul>
            <p className="text-slate-600 mt-4">
              Zur Ausübung Ihrer Rechte kontaktieren Sie uns unter:{' '}
              <a href="mailto:kontakt@translateshop.ch" className="text-red-600 hover:underline">kontakt@translateshop.ch</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">9. Änderungen dieser Datenschutzerklärung</h2>
            <p className="text-slate-600">
              Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen. 
              Die aktuelle Version ist stets auf unserer Website verfügbar.
            </p>
          </section>
        </div>

        <p className="text-slate-500 text-sm mt-8 text-center">
          Stand: Februar 2026
        </p>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm">© 2026 translateshop.ch — Made with ❤️ in Switzerland 🇨🇭</p>
        </div>
      </footer>
    </div>
  );
}
