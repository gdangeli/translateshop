import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anmelden | TranslateShop.ch",
  description: "Melden Sie sich bei TranslateShop.ch an, um Ihre Shop-Übersetzungen zu verwalten.",
  alternates: {
    canonical: "/login",
  },
  robots: "noindex, follow",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
