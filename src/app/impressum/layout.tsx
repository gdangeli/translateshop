import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | TranslateShop.ch",
  description: "Impressum und Kontaktinformationen von TranslateShop.ch. Betreiber: translateshop.ch, Lochwisstrasse 3, CH-8185 Winkel.",
  alternates: {
    canonical: "/impressum",
  },
  robots: "noindex, follow",
};

export default function ImpressumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
