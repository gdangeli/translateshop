import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Developer API | TranslateShop.ch',
  description: 'REST API Dokumentation für Entwickler. Integrieren Sie TranslateShop-Übersetzungen in Ihre Anwendungen. Endpoints, Authentifizierung und Code-Beispiele.',
};

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-slate-800">
            🌐 TranslateShop<span className="text-red-600">.ch</span>
          </Link>
          <Link href="/docs" className="text-slate-600 hover:text-slate-800">
            ← Zurück zur Dokumentation
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🔑</span>
            <h1 className="text-3xl font-bold text-slate-800">Developer API</h1>
          </div>
          <p className="text-xl text-slate-600">
            REST API für Entwickler. Integrieren Sie Übersetzungen direkt in Ihren Workflow.
          </p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-orange-800 mb-2">🚀 Schnellstart</h2>
          <div className="text-orange-700 space-y-2">
            <p><strong>Base URL:</strong> <code className="bg-white px-2 py-1 rounded">https://translateshop.ch/api/v1</code></p>
            <p><strong>Auth:</strong> Bearer Token im Authorization Header</p>
            <p><strong>Format:</strong> JSON</p>
          </div>
        </div>

        {/* API Key erstellen */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">🔐 API-Key erstellen</h2>
          <ol className="space-y-3 text-slate-600">
            <li>1. Öffnen Sie Ihr <Link href="/dashboard" className="text-red-600 hover:underline">TranslateShop Dashboard</Link></li>
            <li>2. Klicken Sie auf <strong>🔑 API</strong></li>
            <li>3. Klicken Sie auf <strong>+ Neuen API-Key erstellen</strong></li>
            <li>4. Kopieren Sie den Key (beginnt mit <code className="bg-slate-100 px-2 py-1 rounded">ts_</code>)</li>
          </ol>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 font-medium">⚠️ Wichtig</p>
            <p className="text-yellow-700 text-sm">Der API-Key wird nur einmal angezeigt. Speichern Sie ihn sicher!</p>
          </div>
        </section>

        {/* Authentifizierung */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">🔒 Authentifizierung</h2>
          <p className="text-slate-600 mb-4">Fügen Sie den API-Key im Authorization Header hinzu:</p>
          <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
            <code>Authorization: Bearer ts_IhrApiKey...</code>
          </div>
          <p className="text-slate-500 text-sm mt-3">Alternativ: <code className="bg-slate-100 px-2 py-1 rounded text-slate-700">X-API-Key: ts_IhrApiKey...</code></p>
        </section>

        {/* Endpoints */}
        <h2 className="text-2xl font-bold text-slate-800 mb-6">📡 Endpoints</h2>

        {/* POST /translate */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded font-mono text-sm">POST</span>
            <code className="text-lg font-semibold">/translate</code>
          </div>
          <p className="text-slate-600 mb-4">Übersetzt einen Text oder ein Produkt in die gewünschten Sprachen.</p>
          
          <h3 className="font-semibold text-slate-800 mt-6 mb-3">Request Body</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-3 font-semibold">Parameter</th>
                  <th className="text-left p-3 font-semibold">Typ</th>
                  <th className="text-left p-3 font-semibold">Beschreibung</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3"><code>title</code> *</td>
                  <td className="p-3">string</td>
                  <td className="p-3">Produkttitel oder Text zum Übersetzen</td>
                </tr>
                <tr>
                  <td className="p-3"><code>description</code></td>
                  <td className="p-3">string</td>
                  <td className="p-3">Optionale Produktbeschreibung</td>
                </tr>
                <tr>
                  <td className="p-3"><code>sourceLanguage</code></td>
                  <td className="p-3">string</td>
                  <td className="p-3">Ausgangssprache: de, fr, it, en (Default: de)</td>
                </tr>
                <tr>
                  <td className="p-3"><code>targetLanguages</code></td>
                  <td className="p-3">string[]</td>
                  <td className="p-3">Zielsprachen: ["fr", "it", "en"]</td>
                </tr>
                <tr>
                  <td className="p-3"><code>industry</code></td>
                  <td className="p-3">string</td>
                  <td className="p-3">Branche: fashion, electronics, food, furniture, beauty, sports, toys, jewelry, automotive, health, garden, pet, office, general</td>
                </tr>
                <tr>
                  <td className="p-3"><code>tone</code></td>
                  <td className="p-3">string</td>
                  <td className="p-3">Tonalität: formal, informal, neutral</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-semibold text-slate-800 mt-6 mb-3">Beispiel Request</h3>
          <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
            <pre>{`curl -X POST https://translateshop.ch/api/v1/translate \\
  -H "Authorization: Bearer ts_IhrApiKey..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Schwarzes T-Shirt aus Bio-Baumwolle",
    "description": "Bequemes T-Shirt, 100% biologische Baumwolle, Fair Trade zertifiziert.",
    "sourceLanguage": "de",
    "targetLanguages": ["fr", "it", "en"],
    "industry": "fashion",
    "tone": "informal"
  }'`}</pre>
          </div>

          <h3 className="font-semibold text-slate-800 mt-6 mb-3">Beispiel Response</h3>
          <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
            <pre>{`{
  "success": true,
  "source": {
    "language": "de",
    "text": "Schwarzes T-Shirt aus Bio-Baumwolle",
    "description": "Bequemes T-Shirt, 100% biologische Baumwolle..."
  },
  "translations": {
    "fr": {
      "title": "T-shirt noir en coton bio",
      "description": "T-shirt confortable, 100% coton biologique..."
    },
    "it": {
      "title": "Maglietta nera in cotone biologico",
      "description": "Maglietta comoda, 100% cotone biologico..."
    },
    "en": {
      "title": "Black organic cotton T-shirt",
      "description": "Comfortable T-shirt, 100% organic cotton..."
    }
  },
  "credits": {
    "used": 3,
    "remaining": 47,
    "is_unlimited": false
  }
}`}</pre>
          </div>
        </section>

        {/* GET /credits */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-mono text-sm">GET</span>
            <code className="text-lg font-semibold">/credits</code>
          </div>
          <p className="text-slate-600 mb-4">Gibt das aktuelle Credit-Guthaben zurück.</p>

          <h3 className="font-semibold text-slate-800 mt-6 mb-3">Beispiel Request</h3>
          <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
            <pre>{`curl https://translateshop.ch/api/v1/credits \\
  -H "Authorization: Bearer ts_IhrApiKey..."`}</pre>
          </div>

          <h3 className="font-semibold text-slate-800 mt-6 mb-3">Beispiel Response</h3>
          <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
            <pre>{`{
  "credits": 47,
  "is_unlimited": false,
  "email": "ihr@email.ch"
}`}</pre>
          </div>
        </section>

        {/* Credits */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">💳 Credit-Verbrauch</h2>
          <div className="space-y-3 text-slate-600">
            <p><strong>1 Credit = 1 Sprache pro Übersetzung</strong></p>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="font-medium">Beispiel:</p>
              <p>1 Produkt in 3 Sprachen (FR, IT, EN) = <strong>3 Credits</strong></p>
            </div>
            <p className="text-sm">Credits werden nur bei erfolgreicher Übersetzung abgezogen.</p>
          </div>
        </section>

        {/* Error Codes */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">⚠️ Fehlercodes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-3 font-semibold">Code</th>
                  <th className="text-left p-3 font-semibold">Beschreibung</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3"><code>401</code></td>
                  <td className="p-3">Ungültiger oder fehlender API-Key</td>
                </tr>
                <tr>
                  <td className="p-3"><code>400</code></td>
                  <td className="p-3">Ungültige Parameter (z.B. fehlender title)</td>
                </tr>
                <tr>
                  <td className="p-3"><code>402</code></td>
                  <td className="p-3">Nicht genügend Credits</td>
                </tr>
                <tr>
                  <td className="p-3"><code>500</code></td>
                  <td className="p-3">Server-Fehler</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Rate Limits */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">⏱️ Rate Limits</h2>
          <div className="space-y-2 text-slate-600">
            <p>• <strong>10 Requests/Sekunde</strong> pro API-Key</p>
            <p>• Für höhere Limits: <a href="mailto:support@translateshop.ch" className="text-red-600 hover:underline">Kontaktieren Sie uns</a></p>
          </div>
        </section>

        <div className="mt-8 text-center">
          <Link href="/register" className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
            Jetzt API-Key erstellen →
          </Link>
        </div>
      </main>
    </div>
  );
}
