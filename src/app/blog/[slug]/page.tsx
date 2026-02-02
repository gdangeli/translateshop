'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getBlogPost, blogPosts } from '@/content/blog';
import { notFound } from 'next/navigation';

function parseMarkdown(content: string): string {
  let html = content;
  
  // Tables
  html = html.replace(/\|(.+)\|\n\|[-|: ]+\|\n((?:\|.+\|\n?)+)/g, (match, header, rows) => {
    const headerCells = header.split('|').filter((c: string) => c.trim()).map((c: string) => 
      `<th class="px-4 py-3 text-left font-semibold bg-slate-100 border-b">${c.trim()}</th>`
    ).join('');
    const bodyRows = rows.trim().split('\n').map((row: string) => {
      const cells = row.split('|').filter((c: string) => c.trim()).map((c: string) => 
        `<td class="px-4 py-3 border-b border-slate-200">${c.trim()}</td>`
      ).join('');
      return `<tr class="hover:bg-slate-50">${cells}</tr>`;
    }).join('');
    return `<div class="overflow-x-auto my-8"><table class="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm"><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table></div>`;
  });

  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => 
    `<pre class="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto my-6"><code>${code.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
  );

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-red-500 bg-red-50 pl-4 py-3 my-6 italic text-slate-700">$1</blockquote>');

  // Headers
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-3xl font-bold text-slate-800 mt-12 mb-6">$1</h2>');
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-2xl font-semibold text-slate-800 mt-8 mb-4">$1</h3>');

  // Bold and italic
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-slate-800">$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-red-600 hover:underline">$1</a>');

  // Unordered lists with checkboxes
  html = html.replace(/^- \[ \] (.+)$/gm, '<li class="flex items-start gap-2 my-2"><span class="text-slate-400">☐</span><span>$1</span></li>');
  html = html.replace(/^- \[x\] (.+)$/gm, '<li class="flex items-start gap-2 my-2"><span class="text-green-600">☑</span><span>$1</span></li>');
  
  // Unordered lists with emojis (✅, ⚠️, ⏳, etc.)
  html = html.replace(/^- (✅|⚠️|⏳|✗|🚩) (.+)$/gm, '<li class="flex items-start gap-2 my-2"><span>$1</span><span>$2</span></li>');
  
  // Regular unordered lists
  html = html.replace(/^- (.+)$/gm, '<li class="my-2 ml-4 list-disc text-slate-600">$1</li>');

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="my-2 ml-4 list-decimal text-slate-600">$1</li>');

  // Wrap consecutive li elements in ul/ol
  html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, (match) => {
    if (match.includes('list-decimal')) {
      return `<ol class="my-6">${match}</ol>`;
    }
    return `<ul class="my-6">${match}</ul>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-100 px-2 py-1 rounded text-sm font-mono text-red-600">$1</code>');

  // Paragraphs
  html = html.split('\n\n').map(block => {
    block = block.trim();
    if (!block) return '';
    if (block.startsWith('<h') || block.startsWith('<ul') || block.startsWith('<ol') || 
        block.startsWith('<pre') || block.startsWith('<block') || block.startsWith('<div') ||
        block.startsWith('<table')) {
      return block;
    }
    return `<p class="text-slate-600 leading-relaxed my-4">${block}</p>`;
  }).join('\n');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="my-12 border-slate-200" />');

  return html;
}

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
        <article>
          {/* Article Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">{post.category}</span>
              <span>•</span>
              <span>{post.readTime} Min. Lesezeit</span>
              <span>•</span>
              <time>{new Date(post.publishedAt).toLocaleDateString('de-CH', { 
                year: 'numeric', month: 'long', day: 'numeric' 
              })}</time>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Featured Image */}
          <div className="h-72 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl flex items-center justify-center text-9xl mb-12 shadow-lg">
            {post.emoji}
          </div>

          {/* Article Content */}
          <div 
            className="article-content"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
          />

          {/* CTA Box */}
          <div className="mt-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Bereit, Ihren Shop mehrsprachig zu machen?
            </h2>
            <p className="mb-6 opacity-90 text-lg">
              Starten Sie kostenlos mit 50 Credits — keine Kreditkarte nötig.
            </p>
            <Link 
              href="/register"
              className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-50 transition shadow-md"
            >
              Jetzt kostenlos starten →
            </Link>
          </div>

          {/* Author Box */}
          <div className="mt-12 pt-8 border-t flex items-center gap-4">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-2xl">
              ✍️
            </div>
            <div>
              <div className="font-semibold text-slate-800">{post.author}</div>
              <div className="text-sm text-slate-500">
                Veröffentlicht am {new Date(post.publishedAt).toLocaleDateString('de-CH', { 
                  year: 'numeric', month: 'long', day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {blogPosts.filter(p => p.slug !== post.slug).length > 0 && (
          <section className="mt-16 pt-12 border-t">
            <h3 className="text-2xl font-bold text-slate-800 mb-8">Weitere Artikel</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts
                .filter(p => p.slug !== post.slug)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link 
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group block bg-slate-50 rounded-xl p-6 hover:bg-slate-100 transition hover:shadow-md"
                  >
                    <div className="text-4xl mb-4">{relatedPost.emoji}</div>
                    <h4 className="font-semibold text-slate-800 mb-2 group-hover:text-red-600 transition">{relatedPost.title}</h4>
                    <p className="text-sm text-slate-600 line-clamp-2">{relatedPost.excerpt}</p>
                    <span className="inline-block mt-4 text-red-600 text-sm font-medium">Weiterlesen →</span>
                  </Link>
                ))}
            </div>
          </section>
        )}
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
