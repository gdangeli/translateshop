import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dokumentation | TranslateShop.ch',
  description: 'Anleitungen für Shopify Integration, WooCommerce Integration und Developer API.',
};

export default function DocsPage() {
  const docs = [
    {
      title: 'Shopify Integration',
      description: 'Verbinden Sie Ihren Shopify-Shop direkt mit TranslateShop und importieren Sie Produkte automatisch.',
      href: '/docs/shopify',
      icon: '🛍️',
      color: 'from-green-50 to-green-100 border-green-200',
    },
    {
      title: 'WooCommerce Integration',
      description: 'Verbinden Sie Ihren WooCommerce-Shop direkt mit TranslateShop für nahtlosen Import.',
      href: '/docs/woocommerce',
      icon: '🔮',
      color: 'from-purple-50 to-purple-100 border-purple-200',
    },
    {
      title: 'Developer API',
      description: 'REST API für Entwickler. Integrieren Sie Übersetzungen direkt in Ihren Workflow.',
      href: '/docs/api',
      icon: '🔑',
      color: 'from-orange-50 to-orange-100 border-orange-200',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-slate-800">
            🌐 TranslateShop<span className="text-red-600">.ch</span>
          </Link>
          <Link href="/dashboard" className="text-slate-600 hover:text-slate-800">
            Dashboard →
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">📚 Dokumentation</h1>
          <p className="text-xl text-slate-600">
            Anleitungen und Referenzen für alle TranslateShop-Features
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {docs.map((doc) => (
            <Link
              key={doc.href}
              href={doc.href}
              className={`block p-6 rounded-xl bg-gradient-to-br ${doc.color} border hover:shadow-lg transition`}
            >
              <div className="text-4xl mb-4">{doc.icon}</div>
              <h2 className="text-xl font-semibold text-slate-800 mb-2">{doc.title}</h2>
              <p className="text-slate-600 text-sm">{doc.description}</p>
              <span className="inline-block mt-4 text-red-600 font-medium">
                Anleitung lesen →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white rounded-xl border border-slate-200">
          <h2 className="text-xl font-semibold mb-4">💡 Schnellstart</h2>
          <ol className="space-y-3 text-slate-600">
            <li className="flex gap-3">
              <span className="font-bold text-red-600">1.</span>
              <span><Link href="/register" className="text-red-600 hover:underline">Kostenlos registrieren</Link> und 50 Credits erhalten</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-red-600">2.</span>
              <span>CSV hochladen oder Shop direkt verbinden</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-red-600">3.</span>
              <span>Branche & Tonalität wählen, übersetzen, fertig!</span>
            </li>
          </ol>
        </div>

        <div className="mt-8 text-center text-slate-500">
          <p>Fragen? <a href="mailto:support@translateshop.ch" className="text-red-600 hover:underline">support@translateshop.ch</a></p>
        </div>
      </main>
    </div>
  );
}
