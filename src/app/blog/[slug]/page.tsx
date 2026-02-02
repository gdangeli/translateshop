'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getBlogPost, blogPosts } from '@/content/blog';
import { notFound } from 'next/navigation';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-slate-800">
            🌐 TranslateShop<span className="text-red-600">.ch</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/blog" className="text-red-600 font-medium">← Blog</Link>
          </nav>
          <Link href="/register" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
            Kostenlos starten
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Article Header */}
        <article>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
              <span className="bg-red-100 text-red-700 px-2 py-1 rounded">{post.category}</span>
              <span>•</span>
              <span>{post.readTime} Min. Lesezeit</span>
              <span>•</span>
              <span>{new Date(post.publishedAt).toLocaleDateString('de-CH')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-slate-600">
              {post.excerpt}
            </p>
          </div>

          {/* Featured Image Placeholder */}
          <div className="h-64 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-8xl mb-12">
            {post.emoji}
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg prose-slate max-w-none
              prose-headings:text-slate-800 
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-slate-600 prose-p:leading-relaxed
              prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-800
              prose-ul:text-slate-600
              prose-ol:text-slate-600
              prose-li:my-2
              prose-table:text-sm
              prose-th:bg-slate-100 prose-th:p-3
              prose-td:p-3 prose-td:border-b
              prose-code:bg-slate-100 prose-code:px-1 prose-code:rounded
              prose-pre:bg-slate-900 prose-pre:text-slate-100
              prose-blockquote:border-red-500 prose-blockquote:bg-red-50 prose-blockquote:py-1"
            dangerouslySetInnerHTML={{ 
              __html: post.content
                .replace(/^## /gm, '<h2>')
                .replace(/^### /gm, '<h3>')
                .replace(/\n\n/g, '</p><p>')
                .replace(/<h2>/g, '</p><h2>')
                .replace(/<h3>/g, '</p><h3>')
                .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
                .replace(/^- /gm, '<li>')
                .replace(/^\d+\. /gm, '<li>')
                .replace(/<li>/g, '</li><li>')
                .replace(/^> /gm, '<blockquote>')
            }}
          />

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Bereit, Ihren Shop mehrsprachig zu machen?
            </h2>
            <p className="mb-6 opacity-90 text-lg">
              Starten Sie kostenlos mit 50 Credits — keine Kreditkarte nötig.
            </p>
            <Link 
              href="/register"
              className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-50 transition"
            >
              Jetzt kostenlos starten →
            </Link>
          </div>

          {/* Author */}
          <div className="mt-12 pt-8 border-t flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-2xl">
              ✍️
            </div>
            <div>
              <div className="font-semibold text-slate-800">{post.author}</div>
              <div className="text-sm text-slate-500">
                Veröffentlicht am {new Date(post.publishedAt).toLocaleDateString('de-CH', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <div className="mt-16 pt-12 border-t">
          <h3 className="text-2xl font-bold text-slate-800 mb-8">Weitere Artikel</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts
              .filter(p => p.slug !== post.slug)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link 
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="block bg-slate-50 rounded-xl p-6 hover:bg-slate-100 transition"
                >
                  <div className="text-3xl mb-3">{relatedPost.emoji}</div>
                  <h4 className="font-semibold text-slate-800 mb-2">{relatedPost.title}</h4>
                  <p className="text-sm text-slate-600">{relatedPost.excerpt}</p>
                </Link>
              ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm">© 2026 TranslateShop.ch — Made with ❤️ in Switzerland 🇨🇭</p>
        </div>
      </footer>
    </div>
  );
}
