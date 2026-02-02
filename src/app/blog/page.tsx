'use client';

import Link from 'next/link';
import { blogPosts } from '@/content/blog';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-slate-800">
            🌐 TranslateShop<span className="text-red-600">.ch</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/#demo" className="text-slate-600 hover:text-slate-800">So funktionierts</Link>
            <Link href="/#pricing" className="text-slate-600 hover:text-slate-800">Preise</Link>
            <Link href="/blog" className="text-red-600 font-medium">Blog</Link>
          </nav>
          <div className="space-x-4">
            <Link href="/login" className="text-slate-600 hover:text-slate-800">Anmelden</Link>
            <Link href="/register" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
              Kostenlos starten
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            E-Commerce Blog für Schweizer Shops
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Tipps, Strategien und Best Practices für mehrsprachigen E-Commerce in der Schweiz.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
              {post.image && (
                <div className="h-48 bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-6xl">
                  {post.emoji || '📝'}
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime} Min. Lesezeit</span>
                </div>
                <h2 className="text-xl font-semibold text-slate-800 mb-2 hover:text-red-600 transition">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-slate-600 text-sm mb-4">
                  {post.excerpt}
                </p>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-red-600 font-medium text-sm hover:text-red-700"
                >
                  Weiterlesen →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-12 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Bereit, Ihren Shop mehrsprachig zu machen?
          </h2>
          <p className="mb-6 opacity-90">
            Starten Sie kostenlos mit 50 Credits — keine Kreditkarte nötig.
          </p>
          <Link 
            href="/register"
            className="inline-block bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition"
          >
            Jetzt kostenlos starten →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm">©️ 2026 TranslateShop.ch — Made with ❤️ in Switzerland 🇨🇭</p>
        </div>
      </footer>
    </div>
  );
}
