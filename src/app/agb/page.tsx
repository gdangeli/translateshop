'use client';

import Link from 'next/link';

export default function AGBPage() {
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
        <h1 className="text-4xl font-bold text-slate-800 mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>
        
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">1. Geltungsbereich</h2>
            <p className="text-slate-600 mb-4">
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Dienstleistungen, 
              die über translateshop.ch (nachfolgend "Anbieter") angeboten werden.
            </p>
            <p className="text-slate-600">
              Anbieter:<br />
              translateshop.ch<br />
              Lochwisstrasse 3<br />
              CH-8185 Winkel<br />
              E-Mail: <a href="mailto:kontakt@translateshop.ch" className="text-red-600 hover:underline">kontakt@translateshop.ch</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">2. Leistungsbeschreibung</h2>
            <p className="text-slate-600 mb-4">
              TranslateShop bietet einen Online-Dienst zur automatisierten Übersetzung von 
              E-Commerce-Produktdaten mittels künstlicher Intelligenz. Der Dienst umfasst:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>Upload von CSV-Dateien mit Produktdaten</li>
              <li>Automatische Übersetzung in die Sprachen Deutsch, Französisch, Italienisch und Englisch</li>
              <li>Download der übersetzten Dateien</li>
              <li>Verwaltung eines Credit-Guthabens</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">3. Vertragsschluss und Registrierung</h2>
            <p className="text-slate-600 mb-4">
              Mit der Registrierung eines Benutzerkontos kommt ein Nutzungsvertrag zustande. 
              Der Nutzer versichert, dass alle angegebenen Daten korrekt sind und er 
              volljährig ist oder die Zustimmung eines Erziehungsberechtigten hat.
            </p>
            <p className="text-slate-600">
              Der Nutzer ist für die Geheimhaltung seiner Zugangsdaten verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">4. Credit-System und Preise</h2>
            <p className="text-slate-600 mb-4">
              Die Nutzung des Übersetzungsdienstes erfolgt über ein Credit-System:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>1 Credit = Übersetzung einer Zeile in eine Zielsprache</li>
              <li>Bei der Registrierung erhält jeder Nutzer 50 Gratis-Credits</li>
              <li>Weitere Credits können über die Plattform erworben werden</li>
              <li>Credits verfallen nicht und sind nicht übertragbar</li>
              <li>Bereits erworbene Credits werden bei Preisänderungen nicht rückwirkend angepasst</li>
            </ul>
            <p className="text-slate-600 mt-4">
              Die aktuellen Preise sind auf der Website unter "Preise" ersichtlich. 
              Alle Preise verstehen sich in Schweizer Franken (CHF) und inklusive 
              der gesetzlichen Mehrwertsteuer (sofern anwendbar).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">5. Unlimited-Abonnement</h2>
            <p className="text-slate-600 mb-4">
              Das Unlimited-Abonnement bietet unbegrenzte Übersetzungen gegen eine monatliche Gebühr:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>Die Abrechnung erfolgt monatlich im Voraus</li>
              <li>Das Abonnement ist monatlich kündbar zum Ende der jeweiligen Abrechnungsperiode</li>
              <li>Bei Kündigung bleibt der Zugang bis zum Ende der bezahlten Periode bestehen</li>
              <li>Eine Rückerstattung für angebrochene Perioden erfolgt nicht</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">6. Zahlung</h2>
            <p className="text-slate-600 mb-4">
              Die Zahlung erfolgt über den Zahlungsdienstleister Stripe. Es werden 
              gängige Zahlungsmittel wie Kreditkarten akzeptiert.
            </p>
            <p className="text-slate-600">
              Mit dem Kauf von Credits oder dem Abschluss eines Abonnements bestätigt 
              der Nutzer, zur Verwendung des gewählten Zahlungsmittels berechtigt zu sein.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">7. Widerrufsrecht</h2>
            <p className="text-slate-600 mb-4">
              Da es sich um digitale Dienstleistungen handelt, die sofort nach dem Kauf 
              verfügbar sind, verzichtet der Nutzer mit dem Kauf auf sein Widerrufsrecht, 
              sofern er dem sofortigen Beginn der Dienstleistung ausdrücklich zugestimmt hat.
            </p>
            <p className="text-slate-600">
              Die 50 Gratis-Credits bei der Registrierung ermöglichen das risikofreie 
              Testen des Dienstes vor einem Kauf.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">8. Nutzungsrechte und Pflichten</h2>
            <p className="text-slate-600 mb-4">
              Der Nutzer darf den Dienst nur für legale Zwecke nutzen. Verboten ist insbesondere:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>Das Hochladen von rechtswidrigen, beleidigenden oder urheberrechtlich geschützten Inhalten ohne entsprechende Berechtigung</li>
              <li>Die Manipulation oder Umgehung des Credit-Systems</li>
              <li>Die übermässige Belastung der Server oder Infrastruktur</li>
              <li>Der Weiterverkauf des Dienstes ohne schriftliche Genehmigung</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">9. Gewährleistung und Haftung</h2>
            <p className="text-slate-600 mb-4">
              Die Übersetzungen werden mittels künstlicher Intelligenz erstellt. Obwohl 
              wir hohe Qualitätsstandards anstreben, können wir keine Garantie für die 
              vollständige Richtigkeit, Vollständigkeit oder Eignung der Übersetzungen 
              für einen bestimmten Zweck übernehmen.
            </p>
            <p className="text-slate-600 mb-4">
              Der Nutzer ist für die Überprüfung der Übersetzungen vor deren Verwendung 
              selbst verantwortlich.
            </p>
            <p className="text-slate-600">
              Die Haftung des Anbieters ist auf Vorsatz und grobe Fahrlässigkeit beschränkt. 
              Die Haftung für indirekte Schäden, entgangenen Gewinn oder Folgeschäden ist 
              ausgeschlossen, soweit gesetzlich zulässig.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">10. Datenschutz</h2>
            <p className="text-slate-600">
              Der Umgang mit personenbezogenen Daten ist in unserer{' '}
              <Link href="/datenschutz" className="text-red-600 hover:underline">Datenschutzerklärung</Link>{' '}
              geregelt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">11. Verfügbarkeit</h2>
            <p className="text-slate-600">
              Wir bemühen uns um eine hohe Verfügbarkeit des Dienstes, können jedoch 
              keine ununterbrochene Verfügbarkeit garantieren. Wartungsarbeiten und 
              technische Störungen können zu vorübergehenden Einschränkungen führen. 
              Bei geplanten Wartungsarbeiten werden Nutzer nach Möglichkeit vorab informiert.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">12. Kündigung und Kontolöschung</h2>
            <p className="text-slate-600 mb-4">
              Der Nutzer kann sein Konto jederzeit per E-Mail an{' '}
              <a href="mailto:kontakt@translateshop.ch" className="text-red-600 hover:underline">kontakt@translateshop.ch</a>{' '}
              kündigen.
            </p>
            <p className="text-slate-600">
              Bei Verstössen gegen diese AGB behält sich der Anbieter das Recht vor, 
              das Nutzerkonto zu sperren oder zu löschen. Ein Anspruch auf Rückerstattung 
              von Credits besteht in diesem Fall nicht.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">13. Änderungen der AGB</h2>
            <p className="text-slate-600">
              Der Anbieter behält sich vor, diese AGB jederzeit zu ändern. Änderungen 
              werden dem Nutzer per E-Mail oder bei der nächsten Anmeldung mitgeteilt. 
              Bei wesentlichen Änderungen hat der Nutzer das Recht, den Vertrag innerhalb 
              von 30 Tagen zu kündigen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">14. Anwendbares Recht und Gerichtsstand</h2>
            <p className="text-slate-600 mb-4">
              Es gilt ausschliesslich Schweizer Recht unter Ausschluss des UN-Kaufrechts 
              und der Kollisionsnormen.
            </p>
            <p className="text-slate-600">
              Gerichtsstand ist Bülach, Schweiz. Vorbehalten bleiben zwingende gesetzliche 
              Gerichtsstände.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">15. Salvatorische Klausel</h2>
            <p className="text-slate-600">
              Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, 
              bleibt die Gültigkeit der übrigen Bestimmungen unberührt. Die unwirksame 
              Bestimmung wird durch eine wirksame ersetzt, die dem wirtschaftlichen 
              Zweck am nächsten kommt.
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
