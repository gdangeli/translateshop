import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - E-Commerce Tipps für die Schweiz | TranslateShop.ch",
  description: "Tipps, Strategien und Best Practices für mehrsprachigen E-Commerce in der Schweiz. SEO, Shopify, WooCommerce, Romandie & Tessin.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
