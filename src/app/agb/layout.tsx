import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGB - Allgemeine Geschäftsbedingungen | TranslateShop.ch",
  description: "Allgemeine Geschäftsbedingungen für die Nutzung von TranslateShop.ch. Credit-System, Zahlungen, Nutzungsrechte und Haftung.",
  alternates: {
    canonical: "/agb",
  },
  robots: "noindex, follow",
};

export default function AGBLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
