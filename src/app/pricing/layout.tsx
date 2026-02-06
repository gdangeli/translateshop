import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preise - Credit-Pakete ab CHF 9 | TranslateShop.ch",
  description: "Transparente Preise für Shop-Übersetzungen: Starter CHF 9, Pro CHF 29, Business CHF 79, Unlimited CHF 49/Mt. 50 Credits gratis zum Testen.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
