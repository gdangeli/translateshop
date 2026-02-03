import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopify Integration | TranslateShop.ch',
  description: 'Schritt-für-Schritt Anleitung zur Verbindung Ihres Shopify-Shops mit TranslateShop.',
};

export default function ShopifyDocsPage() {
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
            <span className="text-4xl">🛍️</span>
            <h1 className="text-3xl font-bold text-slate-800">Shopify Integration</h1>
          </div>
          <p className="text-xl text-slate-600">
            Verbinden Sie Ihren Shopify-Shop direkt mit TranslateShop und importieren Sie Ihre Produkte mit einem Klick.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-green-800 mb-2">✅ Vorteile der Direktanbindung</h2>
          <ul className="text-green-700 space-y-1">
            <li>• Kein manueller CSV-Export nötig</li>
            <li>• Produkte mit einem Klick importieren</li>
            <li>• Automatische Synchronisation der Produktdaten</li>
          </ul>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
              <h2 className="text-xl font-semibold">Custom App in Shopify erstellen</h2>
            </div>
            <ol className="space-y-3 text-slate-600 ml-11">
              <li>1. Öffnen Sie Ihr <strong>Shopify Admin Dashboard</strong></li>
              <li>2. Gehen Sie zu <strong>Settings</strong> → <strong>Apps and sales channels</strong></li>
              <li>3. Klicken Sie auf <strong>Develop apps</strong> (oben rechts)</li>
              <li>4. Falls noch nicht aktiviert: Klicken Sie auf <strong>Allow custom app development</strong></li>
              <li>5. Klicken Sie auf <strong>Create an app</strong></li>
              <li>6. Geben Sie als Name ein: <code className="bg-slate-100 px-2 py-1 rounded">TranslateShop Integration</code></li>
              <li>7. Klicken Sie auf <strong>Create app</strong></li>
            </ol>
          </section>

          {/* Step 2 */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
              <h2 className="text-xl font-semibold">API-Berechtigungen konfigurieren</h2>
            </div>
            <ol className="space-y-3 text-slate-600 ml-11">
              <li>1. In der neu erstellten App: Klicken Sie auf <strong>Configure Admin API scopes</strong></li>
              <li>2. Suchen Sie nach <strong>Products</strong> und aktivieren Sie:
                <ul className="mt-2 ml-4 space-y-1">
                  <li>☑️ <code className="bg-slate-100 px-2 py-1 rounded">read_products</code></li>
                  <li>☑️ <code className="bg-slate-100 px-2 py-1 rounded">write_products</code></li>
                </ul>
              </li>
              <li>3. Klicken Sie auf <strong>Save</strong></li>
            </ol>
          </section>

          {/* Step 3 */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
              <h2 className="text-xl font-semibold">App installieren & Token kopieren</h2>
            </div>
            <ol className="space-y-3 text-slate-600 ml-11">
              <li>1. Klicken Sie auf den Tab <strong>API credentials</strong></li>
              <li>2. Klicken Sie auf <strong>Install app</strong></li>
              <li>3. Bestätigen Sie die Installation</li>
              <li>4. Kopieren Sie den <strong>Admin API access token</strong></li>
            </ol>
            <div className="mt-4 ml-11 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 font-medium">⚠️ Wichtig</p>
              <p className="text-yellow-700 text-sm">Der Access Token wird nur einmal angezeigt! Kopieren Sie ihn sofort und speichern Sie ihn sicher.</p>
            </div>
          </section>

          {/* Step 4 */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
              <h2 className="text-xl font-semibold">In TranslateShop verbinden</h2>
            </div>
            <ol className="space-y-3 text-slate-600 ml-11">
              <li>1. Öffnen Sie Ihr <Link href="/dashboard" className="text-red-600 hover:underline">TranslateShop Dashboard</Link></li>
              <li>2. Klicken Sie auf <strong>🔗 Shop verbinden</strong></li>
              <li>3. Wählen Sie <strong>Shopify</strong></li>
              <li>4. Geben Sie ein:
                <ul className="mt-2 ml-4 space-y-2">
                  <li><strong>Shop URL:</strong> <code className="bg-slate-100 px-2 py-1 rounded">ihr-shop.myshopify.com</code></li>
                  <li><strong>Access Token:</strong> <code className="bg-slate-100 px-2 py-1 rounded">shpat_xxxxx...</code></li>
                </ul>
              </li>
              <li>5. Klicken Sie auf <strong>Verbindung testen & speichern</strong></li>
            </ol>
          </section>

          {/* Step 5 */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">5</span>
              <h2 className="text-xl font-semibold">Produkte importieren</h2>
            </div>
            <ol className="space-y-3 text-slate-600 ml-11">
              <li>1. Nach erfolgreicher Verbindung erscheint Ihr Shop in der Liste</li>
              <li>2. Wählen Sie die <strong>Sprache</strong> Ihrer bestehenden Produkte (z.B. Deutsch)</li>
              <li>3. Klicken Sie auf <strong>📥 Import</strong></li>
              <li>4. Ihre Produkte erscheinen im Dashboard und können übersetzt werden</li>
            </ol>
          </section>
        </div>

        <div className="mt-12 p-6 bg-slate-100 rounded-xl">
          <h2 className="font-semibold text-slate-800 mb-3">❓ Häufige Fragen</h2>
          <div className="space-y-4 text-slate-600">
            <div>
              <p className="font-medium">Werden meine Produkte in Shopify verändert?</p>
              <p className="text-sm">Nein, der Import kopiert nur die Produktdaten. Ihre Shopify-Produkte bleiben unverändert.</p>
            </div>
            <div>
              <p className="font-medium">Kann ich die Übersetzungen zurück nach Shopify exportieren?</p>
              <p className="text-sm">Aktuell per CSV-Export. Direkter Rück-Export wird in einer zukünftigen Version verfügbar sein.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/register" className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
            Jetzt kostenlos starten →
          </Link>
        </div>
      </main>
    </div>
  );
}
