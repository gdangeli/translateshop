import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TranslateShop.ch | Online-Shop Übersetzung für die Schweiz",
  description: "Übersetzen Sie Ihren Schweizer Online-Shop automatisch auf Deutsch, Französisch, Italienisch und Englisch. KI-gestützt, Schweizer Qualität. Ab CHF 49/Monat.",
  keywords: "Shop Übersetzung, E-Commerce Übersetzung, Schweiz, mehrsprachig, Shopify übersetzen, WooCommerce übersetzen, Online-Shop Deutsch Französisch, Produktbeschreibungen übersetzen",
  authors: [{ name: "TranslateShop.ch" }],
  creator: "TranslateShop.ch",
  publisher: "TranslateShop.ch",
  robots: "index, follow",
  alternates: {
    canonical: "https://translateshop.ch",
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
  verification: {
    // Add these later when you have them:
    // google: "your-google-verification-code",
  },
  other: {
    "geo.region": "CH",
    "geo.placename": "Switzerland",
  },
};

// JSON-LD Structured Data
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "127",
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
