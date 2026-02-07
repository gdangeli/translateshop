import type { Metadata } from "next";
import { getBlogPost, blogPosts } from "@/content/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  
  if (!post) {
    return {
      title: "Artikel nicht gefunden | TranslateShop.ch",
    };
  }
  
  const url = `https://www.translateshop.ch/blog/${slug}`;
  
  return {
    title: `${post.title} | TranslateShop.ch Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      locale: "de_CH",
      siteName: "TranslateShop.ch",
      title: post.title,
      description: post.excerpt,
      url: url,
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: "https://www.translateshop.ch/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["https://www.translateshop.ch/og-image.png"],
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
