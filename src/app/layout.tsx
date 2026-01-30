import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TranslateShop.ch - Mehrsprachiger E-Commerce für die Schweiz",
  description: "Übersetzen Sie Ihren Online-Shop automatisch in alle 4 Landessprachen. DE, FR, IT, EN.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {children}
      </body>
    </html>
  );
}
