'use client';

import Link from 'next/link';
import { I18nProvider, useI18n } from '@/i18n/I18nProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const content = {
  de: {
    title: 'Impressum',
    back: '← Zurück',
    contactAddress: 'Kontaktadresse',
    contact: 'Kontakt',
    responsible: 'Verantwortliche Person',
    disclaimer: 'Haftungsausschluss',
    disclaimerText1: 'Der Autor übernimmt keine Gewähr für die Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen.',
    disclaimerText2: 'Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, die aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen.',
    disclaimerText3: 'Alle Angebote sind freibleibend. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.',
    linksTitle: 'Haftungsausschluss für Links',
    linksText: 'Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es wird jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten erfolgen auf eigene Gefahr des jeweiligen Nutzers.',
    copyright: 'Urheberrechte',
    copyrightText: 'Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf dieser Website gehören ausschliesslich translateshop.ch oder den speziell genannten Rechteinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung des Urheberrechtsträgers im Voraus einzuholen.',
    asOf: 'Stand: Februar 2026',
  },
  fr: {
    title: 'Mentions légales',
    back: '← Retour',
    contactAddress: 'Adresse de contact',
    contact: 'Contact',
    responsible: 'Personne responsable',
    disclaimer: 'Clause de non-responsabilité',
    disclaimerText1: 'L\'auteur décline toute garantie quant à l\'exactitude, la précision, l\'actualité, la fiabilité et l\'exhaustivité des informations.',
    disclaimerText2: 'Toute responsabilité pour des dommages matériels ou immatériels résultant de l\'accès aux informations publiées ou de leur utilisation ou non-utilisation, d\'un usage abusif de la connexion ou de problèmes techniques est exclue.',
    disclaimerText3: 'Toutes les offres sont sans engagement. L\'auteur se réserve expressément le droit de modifier, compléter ou supprimer des parties des pages ou l\'ensemble de l\'offre sans préavis, ou d\'en cesser la publication temporairement ou définitivement.',
    linksTitle: 'Clause de non-responsabilité pour les liens',
    linksText: 'Les références et liens vers des sites web tiers ne relèvent pas de notre responsabilité. Toute responsabilité pour ces sites web est déclinée. L\'accès et l\'utilisation de ces sites web se font aux risques et périls de l\'utilisateur.',
    copyright: 'Droits d\'auteur',
    copyrightText: 'Les droits d\'auteur et tous les autres droits sur les contenus, images, photos ou autres fichiers de ce site appartiennent exclusivement à translateshop.ch ou aux titulaires des droits spécifiquement mentionnés. Toute reproduction nécessite l\'accord écrit préalable du titulaire des droits d\'auteur.',
    asOf: 'État: février 2026',
  },
  it: {
    title: 'Impressum',
    back: '← Indietro',
    contactAddress: 'Indirizzo di contatto',
    contact: 'Contatto',
    responsible: 'Persona responsabile',
    disclaimer: 'Esclusione di responsabilità',
    disclaimerText1: 'L\'autore non garantisce la correttezza, l\'accuratezza, l\'attualità, l\'affidabilità e la completezza delle informazioni.',
    disclaimerText2: 'Sono escluse pretese di responsabilità nei confronti dell\'autore per danni materiali o immateriali derivanti dall\'accesso alle informazioni pubblicate o dal loro utilizzo o non utilizzo, dall\'uso improprio della connessione o da problemi tecnici.',
    disclaimerText3: 'Tutte le offerte sono senza impegno. L\'autore si riserva espressamente il diritto di modificare, integrare o cancellare parti delle pagine o l\'intera offerta senza preavviso, o di sospenderne temporaneamente o definitivamente la pubblicazione.',
    linksTitle: 'Esclusione di responsabilità per i link',
    linksText: 'I riferimenti e i link a siti web di terzi non rientrano nella nostra responsabilità. Si declina ogni responsabilità per tali siti web. L\'accesso e l\'utilizzo di tali siti web avvengono a rischio e pericolo dell\'utente.',
    copyright: 'Diritti d\'autore',
    copyrightText: 'I diritti d\'autore e tutti gli altri diritti sui contenuti, immagini, foto o altri file di questo sito appartengono esclusivamente a translateshop.ch o ai titolari dei diritti specificatamente menzionati. La riproduzione di qualsiasi elemento richiede il previo consenso scritto del titolare dei diritti d\'autore.',
    asOf: 'Stato: febbraio 2026',
  },
  en: {
    title: 'Legal Notice',
    back: '← Back',
    contactAddress: 'Contact Address',
    contact: 'Contact',
    responsible: 'Responsible Person',
    disclaimer: 'Disclaimer',
    disclaimerText1: 'The author assumes no liability for the correctness, accuracy, timeliness, reliability and completeness of the information.',
    disclaimerText2: 'Liability claims against the author for damages of a material or immaterial nature arising from access to or use or non-use of the published information, misuse of the connection or technical faults are excluded.',
    disclaimerText3: 'All offers are non-binding. The author expressly reserves the right to change, supplement or delete parts of the pages or the entire offer without prior notice, or to cease publication temporarily or permanently.',
    linksTitle: 'Disclaimer for Links',
    linksText: 'References and links to third-party websites are outside our area of responsibility. Any responsibility for such websites is declined. Access to and use of such websites is at the user\'s own risk.',
    copyright: 'Copyright',
    copyrightText: 'The copyright and all other rights to content, images, photos or other files on this website belong exclusively to translateshop.ch or the specifically named rights holders. The written consent of the copyright holder must be obtained in advance for the reproduction of any elements.',
    asOf: 'As of: February 2026',
  },
};

function ImpressumContent() {
  const { locale } = useI18n();
  const t = content[locale];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-slate-800">
            🌐 TranslateShop<span className="text-red-600">.ch</span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link href="/" className="text-slate-600 hover:text-slate-800">{t.back}</Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">{t.title}</h1>
        
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">{t.contactAddress}</h2>
            <p className="text-slate-600">
              translateshop.ch<br />
              Lochwisstrasse 3<br />
              CH-8185 Winkel<br />
              Schweiz
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">{t.contact}</h2>
            <p className="text-slate-600">
              E-Mail: <a href="mailto:kontakt@translateshop.ch" className="text-red-600 hover:underline">kontakt@translateshop.ch</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">{t.responsible}</h2>
            <p className="text-slate-600">L. D&apos;Angeli</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">{t.disclaimer}</h2>
            <p className="text-slate-600 mb-4">{t.disclaimerText1}</p>
            <p className="text-slate-600 mb-4">{t.disclaimerText2}</p>
            <p className="text-slate-600">{t.disclaimerText3}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">{t.linksTitle}</h2>
            <p className="text-slate-600">{t.linksText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">{t.copyright}</h2>
            <p className="text-slate-600">{t.copyrightText}</p>
          </section>
        </div>

        <p className="text-slate-500 text-sm mt-8 text-center">{t.asOf}</p>
      </main>

      <footer className="bg-slate-800 text-slate-400 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm">© 2026 translateshop.ch — Made with ❤️ in Switzerland 🇨🇭</p>
        </div>
      </footer>
    </div>
  );
}

export default function ImpressumPage() {
  return (
    <I18nProvider>
      <ImpressumContent />
    </I18nProvider>
  );
}
