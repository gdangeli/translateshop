import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | TranslateShop.ch",
  description: "Datenschutzerklärung von TranslateShop.ch. Informationen zur Datenerhebung, Verarbeitung, Speicherung und Ihren Rechten nach Schweizer DSG.",
  alternates: {
    canonical: "/datenschutz",
  },
  robots: "noindex, follow",
};

export default function DatenschutzLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
