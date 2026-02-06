import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Häufige Fragen | TranslateShop.ch",
  description: "Antworten auf häufige Fragen zu TranslateShop: Credits, Preise, Shopify & WooCommerce Integration, CSV-Format, API und mehr. Jetzt informieren.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
