import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WooCommerce Integration | TranslateShop.ch',
  description: 'Schritt-für-Schritt Anleitung zur Verbindung Ihres WooCommerce-Shops mit TranslateShop.',
};

export default function WooCommerceDocsPage() {
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
            <span className="text-4xl">🔮</span>
            <h1 className="text-3xl font-bold text-slate-800">WooCommerce Integration</h1>
          </div>
          <p className="text-xl text-slate-600">
            Verbinden Sie Ihren WooCommerce-Shop direkt mit TranslateShop für nahtlosen Produkt-Import.
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-purple-800 mb-2">✅ Vorteile der Direktanbindung</h2>
          <ul className="text-purple-700 space-y-1">
            <li>• Kein manueller CSV-Export nötig</li>
            <li>• Produkte mit einem Klick importieren</li>
            <li>• Funktioniert mit WPML und Polylang</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-blue-800 mb-2">📋 Voraussetzungen</h2>
          <ul className="text-blue-700 space-y-1">
            <li>• WordPress mit WooCommerce Plugin</li>
            <li>• Administrator-Zugang zu WordPress</li>
            <li>• SSL-Zertifikat (HTTPS) auf Ihrem Shop</li>
          </ul>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
              <h2 className="text-xl font-semibold">WooCommerce REST API aktivieren</h2>
            </div>
            <ol className="space-y-3 text-slate-600 ml-11">
              <li>1. Öffnen Sie Ihr <strong>WordPress Admin Dashboard</strong></li>
              <li>2. Gehen Sie zu <strong>WooCommerce</strong> → <strong>Settings</strong></li>
              <li>3. Klicken Sie auf den Tab <strong>Advanced</strong></li>
              <li>4. Klicken Sie auf <strong>REST API</strong></li>
            </ol>
          </section>

          {/* Step 2 */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
              <h2 className="text-xl font-semibold">API-Schlüssel erstellen</h2>
            </div>
            <ol className="space-y-3 text-slate-600 ml-11">
              <li>1. Klicken Sie auf <strong>Add key</strong> (oder <strong>Schlüssel hinzufügen</strong>)</li>
              <li>2. Füllen Sie das Formular aus:
                <ul className="mt-2 ml-4 space-y-2">
                  <li><strong>Description:</strong> <code className="bg-slate-100 px-2 py-1 rounded">TranslateShop</code></li>
                  <li><strong>User:</strong> Wählen Sie Ihren Administrator-Account</li>
                  <li><strong>Permissions:</strong> <code className="bg-slate-100 px-2 py-1 rounded">Read/Write</code></li>
                </ul>
              </li>
              <li>3. Klicken Sie auf <strong>Generate API key</strong></li>
            </ol>
          </section>

          {/* Step 3 */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
              <h2 className="text-xl font-semibold">API-Schlüssel kopieren</h2>
            </div>
            <div className="ml-11">
              <p className="text-slate-600 mb-4">Nach dem Generieren sehen Sie zwei Schlüssel:</p>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="font-medium text-slate-800">Consumer key</p>
                  <p className="text-sm text-slate-500">Beginnt mit <code className="bg-white px-2 py-1 rounded">ck_</code></p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="font-medium text-slate-800">Consumer secret</p>
                  <p className="text-sm text-slate-500">Beginnt mit <code className="bg-white px-2 py-1 rounded">cs_</code></p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 font-medium">⚠️ Wichtig</p>
                <p className="text-yellow-700 text-sm">Beide Schlüssel werden nur einmal angezeigt! Kopieren Sie sie sofort und speichern Sie sie sicher.</p>
              </div>
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
              <li>3. Wählen Sie <strong>WooCommerce</strong></li>
              <li>4. Geben Sie ein:
                <ul className="mt-2 ml-4 space-y-2">
                  <li><strong>Shop URL:</strong> <code className="bg-slate-100 px-2 py-1 rounded">https://ihr-shop.ch</code></li>
                  <li><strong>Consumer Key:</strong> <code className="bg-slate-100 px-2 py-1 rounded">ck_xxxxx...</code></li>
                  <li><strong>Consumer Secret:</strong> <code className="bg-slate-100 px-2 py-1 rounded">cs_xxxxx...</code></li>
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
              <li>2. Wählen Sie die <strong>Sprache</strong> Ihrer bestehenden Produkte</li>
              <li>3. Klicken Sie auf <strong>📥 Import</strong></li>
              <li>4. Ihre Produkte erscheinen im Dashboard und können übersetzt werden</li>
            </ol>
          </section>

          {/* Step 6 */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">6</span>
              <h2 className="text-xl font-semibold">Übersetzungen übersetzen & synchronisieren</h2>
            </div>
            <ol className="space-y-3 text-slate-600 ml-11">
              <li>1. Klicken Sie bei einem Produkt auf <strong>Übersetzen</strong></li>
              <li>2. Die KI übersetzt Titel und Beschreibung in alle Sprachen</li>
              <li>3. Optional: Mit <strong>✏️ Bearbeiten</strong> können Sie Übersetzungen anpassen</li>
              <li>4. Klicken Sie auf <strong>🔄 Sync</strong> um die Übersetzungen zurück zu WooCommerce zu senden</li>
            </ol>
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg ml-11">
              <p className="text-green-800 font-medium">💡 Tipp</p>
              <p className="text-green-700 text-sm">Die Übersetzungen werden als Meta-Daten in WooCommerce gespeichert. Mit WPML oder Polylang können diese direkt verwendet werden. Für Standard-WooCommerce können Sie ein Theme nutzen, das mehrsprachige Meta-Felder unterstützt.</p>
            </div>
          </section>
        </div>

        {/* Troubleshooting */}
        <div className="mt-12 p-6 bg-slate-100 rounded-xl">
          <h2 className="font-semibold text-slate-800 mb-3">🔧 Problemlösung</h2>
          <div className="space-y-4 text-slate-600">
            <div>
              <p className="font-medium">Fehler: "Connection failed" oder 401</p>
              <p className="text-sm">Überprüfen Sie, ob Consumer Key und Secret korrekt kopiert wurden. Stellen Sie sicher, dass keine Leerzeichen am Anfang oder Ende sind.</p>
            </div>
            <div>
              <p className="font-medium">Fehler: SSL/HTTPS Problem</p>
              <p className="text-sm">WooCommerce API erfordert HTTPS. Stellen Sie sicher, dass Ihr Shop ein gültiges SSL-Zertifikat hat.</p>
            </div>
            <div>
              <p className="font-medium">Keine Produkte gefunden</p>
              <p className="text-sm">Stellen Sie sicher, dass Ihre Produkte in WooCommerce "Veröffentlicht" sind, nicht nur als Entwurf.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-white rounded-xl border border-slate-200">
          <h2 className="font-semibold text-slate-800 mb-3">❓ Häufige Fragen</h2>
          <div className="space-y-4 text-slate-600">
            <div>
              <p className="font-medium">Funktioniert es mit WPML oder Polylang?</p>
              <p className="text-sm">Ja, TranslateShop erkennt mehrsprachige Setups automatisch.</p>
            </div>
            <div>
              <p className="font-medium">Werden meine Produkte in WooCommerce verändert?</p>
              <p className="text-sm">Nein, der Import kopiert nur die Produktdaten. Ihre WooCommerce-Produkte bleiben unverändert.</p>
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
