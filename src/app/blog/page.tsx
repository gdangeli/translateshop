'use client';

import Link from 'next/link';
import { blogPosts } from '@/content/blog';

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
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
            <Link href="/login" className="text-slate-600 hover:text-slate-800 hidden sm:inline">Anmelden</Link>
            <Link href="/register" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
              Kostenlos starten
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="inline-block bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
            📚 E-Commerce Wissen
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Blog für Schweizer Shops
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Tipps, Strategien und Best Practices für mehrsprachigen E-Commerce in der Schweiz.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Link 
            href={`/blog/${featuredPost.slug}`}
            className="group block bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition mb-12"
          >
            <div className="grid md:grid-cols-2">
              <div className="h-64 md:h-auto bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex items-center justify-center text-8xl">
                {featuredPost.emoji}
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">{featuredPost.category}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime} Min. Lesezeit</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 group-hover:text-red-600 transition">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-600 mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <span className="text-red-600 font-semibold group-hover:underline">
                  Artikel lesen →
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Other Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post) => (
            <Link 
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-6xl group-hover:scale-105 transition">
                {post.emoji}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                  <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded font-medium">{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime} Min.</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-red-600 transition line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="text-red-600 font-medium text-sm">
                  Weiterlesen →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            🚀 Bereit für mehr Kunden?
          </h2>
          <p className="mb-6 opacity-90 text-lg max-w-xl mx-auto">
            Starten Sie kostenlos mit 50 Credits und erreichen Sie die ganze Schweiz.
          </p>
          <Link 
            href="/register"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-50 transition shadow-lg"
          >
            Jetzt kostenlos starten →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm">© 2026 TranslateShop.ch — Made with ❤️ in Switzerland 🇨🇭</p>
        </div>
      </footer>
    </div>
  );
}
