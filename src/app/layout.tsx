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
    canonical: "https://www.translateshop.ch",
  },
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: "https://www.translateshop.ch",
    siteName: "TranslateShop.ch",
    title: "TranslateShop.ch | Ihr Shop in 4 Sprachen",
    description: "Erreichen Sie die ganze Schweiz. Übersetzen Sie Ihren Online-Shop automatisch auf Deutsch, Französisch, Italienisch und Englisch.",
    images: [
      {
        url: "https://www.translateshop.ch/og-image.png",
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
    images: ["https://www.translateshop.ch/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "TranslateShop.ch",
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  browserRequirements: "Requires JavaScript",
  description: "Automatische Übersetzung für Schweizer Online-Shops. Übersetzen Sie Produkte in DE, FR, IT, EN.",
  url: "https://www.translateshop.ch",
  offers: {
    "@type": "Offer",
    priceCurrency: "CHF",
    price: "0",
    description: "Kostenlos starten mit 50 Credits",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
  provider: {
    "@type": "Organization",
    name: "TranslateShop.ch",
    url: "https://www.translateshop.ch",
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
        {/* Privacy-friendly analytics by Plausible */}
        <script async src="https://plausible.io/js/pa-KtzccGu9PxNEzxpgQpdRo.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init();`
          }}
        />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {children}
      </body>
    </html>
  );
}
