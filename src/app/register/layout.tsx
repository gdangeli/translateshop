import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kostenlos registrieren - 50 Credits gratis | TranslateShop.ch",
  description: "Jetzt kostenloses Konto erstellen und 50 Credits geschenkt bekommen. Shop-Übersetzungen für Schweizer E-Commerce in DE, FR, IT, EN.",
  alternates: {
    canonical: "/register",
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
