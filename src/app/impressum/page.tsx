'use client';

import Link from 'next/link';

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-slate-800">
            🌐 TranslateShop<span className="text-red-600">.ch</span>
          </Link>
          <Link href="/" className="text-slate-600 hover:text-slate-800">
            ← Zurück
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">Impressum</h1>
        
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Kontaktadresse</h2>
            <p className="text-slate-600">
              translateshop.ch<br />
              Lochwisstrasse 3<br />
              CH-8185 Winkel<br />
              Schweiz
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Kontakt</h2>
            <p className="text-slate-600">
              E-Mail: <a href="mailto:kontakt@translateshop.ch" className="text-red-600 hover:underline">kontakt@translateshop.ch</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Verantwortliche Person</h2>
            <p className="text-slate-600">
              L. D'Angeli
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Haftungsausschluss</h2>
            <p className="text-slate-600 mb-4">
              Der Autor übernimmt keine Gewähr für die Richtigkeit, Genauigkeit, Aktualität, 
              Zuverlässigkeit und Vollständigkeit der Informationen.
            </p>
            <p className="text-slate-600 mb-4">
              Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, 
              die aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten 
              Informationen, durch Missbrauch der Verbindung oder durch technische Störungen 
              entstanden sind, werden ausgeschlossen.
            </p>
            <p className="text-slate-600">
              Alle Angebote sind freibleibend. Der Autor behält es sich ausdrücklich vor, 
              Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, 
              zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Haftungsausschluss für Links</h2>
            <p className="text-slate-600">
              Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. 
              Es wird jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung 
              solcher Webseiten erfolgen auf eigene Gefahr des jeweiligen Nutzers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Urheberrechte</h2>
            <p className="text-slate-600">
              Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien 
              auf dieser Website gehören ausschliesslich translateshop.ch oder den speziell genannten 
              Rechteinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung 
              des Urheberrechtsträgers im Voraus einzuholen.
            </p>
          </section>
        </div>

        <p className="text-slate-500 text-sm mt-8 text-center">
          Stand: Februar 2026
        </p>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm">© 2026 translateshop.ch — Made with ❤️ in Switzerland 🇨🇭</p>
        </div>
      </footer>
    </div>
  );
}
