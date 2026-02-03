import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TranslateShop.ch | Online-Shop Übersetzung für die Schweiz",
  description: "Übersetzen Sie Ihren Schweizer Online-Shop automatisch auf Deutsch, Französisch, Italienisch und Englisch. KI-gestützt, Schweizer Qualität. Ab CHF 49/Monat.",
  keywords: "Shop Übersetzung, E-Commerce Übersetzung, Schweiz, mehrsprachig, Shopify übersetzen, WooCommerce übersetzen",
  authors: [{ name: "TranslateShop.ch" }],
  creator: "TranslateShop.ch",
  publisher: "TranslateShop.ch",
  robots: "index, follow",
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: 'any' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: "https://translateshop.ch",
    languages: {
      'de': 'https://translateshop.ch',
      'fr': 'https://translateshop.ch/fr',
      'it': 'https://translateshop.ch/it',
      'en': 'https://translateshop.ch/en',
    },
  },
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: "https://translateshop.ch",
    siteName: "TranslateShop.ch",
    title: "TranslateShop.ch | Ihr Shop in 4 Sprachen",
    description: "Erreichen Sie die ganze Schweiz. Übersetzen Sie Ihren Online-Shop automatisch auf Deutsch, Französisch, Italienisch und Englisch.",
    images: [
      {
        url: "https://translateshop.ch/og-image.png",
        width: 1200,
        height: 630,
        alt: "TranslateShop.ch - Online-Shop Übersetzung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TranslateShop.ch | Online-Shop Übersetzung",
    description: "Übersetzen Sie Ihren Schweizer Online-Shop automatisch in alle 4 Landessprachen.",
    images: ["https://translateshop.ch/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "TranslateShop.ch",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Automatische Übersetzung für Schweizer Online-Shops",
  url: "https://translateshop.ch",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "CHF",
    lowPrice: "0",
    highPrice: "199",
    offerCount: "4",
  },
  provider: {
    "@type": "Organization",
    name: "TranslateShop.ch",
    url: "https://translateshop.ch",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CH",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-CH">
      <head>
        {/* Icons managed via metadata.icons */}
        <meta name="theme-color" content="#dc2626" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {children}
      </body>
    </html>
  );
}
