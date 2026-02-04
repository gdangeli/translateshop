'use client';

import Link from 'next/link';
import { I18nProvider, useI18n } from '@/i18n/I18nProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const content = {
  de: {
    title: 'Datenschutzerklärung',
    back: '← Zurück',
    s1title: '1. Allgemeine Hinweise',
    s1text: 'Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Diese Datenschutzerklärung informiert Sie über die Erhebung, Verarbeitung und Nutzung Ihrer personenbezogenen Daten bei der Nutzung von translateshop.ch.',
    s1responsible: 'Verantwortlich für die Datenverarbeitung ist:',
    s2title: '2. Erhebung und Verarbeitung von Daten',
    s2intro: 'Wir erheben und verarbeiten folgende Daten:',
    s2items: [
      'Registrierungsdaten: E-Mail-Adresse und Passwort bei der Kontoerstellung',
      'Nutzungsdaten: Hochgeladene CSV-Dateien zur Übersetzung (werden nach der Verarbeitung gelöscht)',
      'Zahlungsdaten: Werden direkt von unserem Zahlungsdienstleister Stripe verarbeitet',
      'Technische Daten: IP-Adresse, Browser-Typ, Zugriffszeiten (für Sicherheit und Fehleranalyse)',
    ],
    s3title: '3. Zweck der Datenverarbeitung',
    s3intro: 'Wir verwenden Ihre Daten für folgende Zwecke:',
    s3items: [
      'Bereitstellung und Verbesserung unserer Übersetzungsdienstleistung',
      'Verwaltung Ihres Benutzerkontos und Credit-Guthabens',
      'Abwicklung von Zahlungen',
      'Kommunikation bezüglich Ihres Kontos oder unserer Dienste',
      'Einhaltung gesetzlicher Verpflichtungen',
    ],
    s4title: '4. Drittanbieter und Auftragsverarbeiter',
    s4intro: 'Wir arbeiten mit folgenden Dienstleistern zusammen:',
    s4items: [
      'Vercel: Hosting unserer Website (USA, EU-Standardvertragsklauseln)',
      'Supabase: Datenbankspeicherung für Benutzerkonten (EU-Server)',
      'Stripe: Zahlungsabwicklung (PCI-DSS-konform)',
      'OpenAI: KI-gestützte Übersetzungen (Daten werden nicht für Training verwendet)',
    ],
    s5title: '5. Cookies',
    s5intro: 'Wir verwenden folgende Cookies:',
    s5items: [
      'Notwendige Cookies: Für Login-Funktionalität und Sitzungsverwaltung',
      'Präferenz-Cookies: Speicherung Ihrer Spracheinstellung',
    ],
    s5note: 'Wir verwenden keine Tracking- oder Marketing-Cookies.',
    s6title: '6. Datensicherheit',
    s6text: 'Wir setzen technische und organisatorische Sicherheitsmassnahmen ein, um Ihre Daten gegen zufällige oder vorsätzliche Manipulation, Verlust, Zerstörung oder den Zugriff unberechtigter Personen zu schützen. Die Datenübertragung erfolgt verschlüsselt über SSL/TLS.',
    s7title: '7. Speicherdauer',
    s7intro: 'Wir speichern Ihre Daten nur so lange, wie es für die genannten Zwecke erforderlich ist:',
    s7items: [
      'Kontodaten: Bis zur Löschung Ihres Kontos',
      'Hochgeladene Dateien: Werden nach der Verarbeitung automatisch gelöscht',
      'Rechnungsdaten: 10 Jahre (gesetzliche Aufbewahrungspflicht)',
    ],
    s8title: '8. Ihre Rechte',
    s8intro: 'Nach dem Schweizer Datenschutzgesetz (DSG) haben Sie folgende Rechte:',
    s8items: [
      'Auskunftsrecht: Sie können Auskunft über Ihre gespeicherten Daten verlangen',
      'Berichtigungsrecht: Sie können die Korrektur falscher Daten verlangen',
      'Löschungsrecht: Sie können die Löschung Ihrer Daten verlangen',
      'Datenportabilität: Sie können Ihre Daten in einem gängigen Format erhalten',
    ],
    s8contact: 'Zur Ausübung Ihrer Rechte kontaktieren Sie uns unter:',
    s9title: '9. Änderungen dieser Datenschutzerklärung',
    s9text: 'Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen. Die aktuelle Version ist stets auf unserer Website verfügbar.',
    asOf: 'Stand: Februar 2026',
  },
  fr: {
    title: 'Politique de confidentialité',
    back: '← Retour',
    s1title: '1. Remarques générales',
    s1text: 'La protection de vos données personnelles est une préoccupation importante pour nous. Cette politique de confidentialité vous informe sur la collecte, le traitement et l\'utilisation de vos données personnelles lors de l\'utilisation de translateshop.ch.',
    s1responsible: 'Responsable du traitement des données:',
    s2title: '2. Collecte et traitement des données',
    s2intro: 'Nous collectons et traitons les données suivantes:',
    s2items: [
      'Données d\'inscription: Adresse e-mail et mot de passe lors de la création du compte',
      'Données d\'utilisation: Fichiers CSV téléchargés pour la traduction (supprimés après le traitement)',
      'Données de paiement: Traitées directement par notre prestataire de paiement Stripe',
      'Données techniques: Adresse IP, type de navigateur, heures d\'accès (pour la sécurité et l\'analyse des erreurs)',
    ],
    s3title: '3. Finalités du traitement des données',
    s3intro: 'Nous utilisons vos données aux fins suivantes:',
    s3items: [
      'Fourniture et amélioration de notre service de traduction',
      'Gestion de votre compte utilisateur et de votre solde de crédits',
      'Traitement des paiements',
      'Communication concernant votre compte ou nos services',
      'Respect des obligations légales',
    ],
    s4title: '4. Prestataires tiers et sous-traitants',
    s4intro: 'Nous travaillons avec les prestataires suivants:',
    s4items: [
      'Vercel: Hébergement de notre site web (USA, clauses contractuelles types UE)',
      'Supabase: Stockage de base de données pour les comptes utilisateurs (serveurs UE)',
      'Stripe: Traitement des paiements (conforme PCI-DSS)',
      'OpenAI: Traductions assistées par IA (les données ne sont pas utilisées pour l\'entraînement)',
    ],
    s5title: '5. Cookies',
    s5intro: 'Nous utilisons les cookies suivants:',
    s5items: [
      'Cookies nécessaires: Pour la fonctionnalité de connexion et la gestion de session',
      'Cookies de préférence: Stockage de votre paramètre de langue',
    ],
    s5note: 'Nous n\'utilisons pas de cookies de suivi ou de marketing.',
    s6title: '6. Sécurité des données',
    s6text: 'Nous utilisons des mesures de sécurité techniques et organisationnelles pour protéger vos données contre toute manipulation accidentelle ou intentionnelle, perte, destruction ou accès par des personnes non autorisées. La transmission des données est cryptée via SSL/TLS.',
    s7title: '7. Durée de conservation',
    s7intro: 'Nous ne conservons vos données que le temps nécessaire aux fins mentionnées:',
    s7items: [
      'Données de compte: Jusqu\'à la suppression de votre compte',
      'Fichiers téléchargés: Supprimés automatiquement après le traitement',
      'Données de facturation: 10 ans (obligation légale de conservation)',
    ],
    s8title: '8. Vos droits',
    s8intro: 'Selon la loi suisse sur la protection des données (LPD), vous disposez des droits suivants:',
    s8items: [
      'Droit d\'accès: Vous pouvez demander des informations sur vos données stockées',
      'Droit de rectification: Vous pouvez demander la correction de données erronées',
      'Droit à l\'effacement: Vous pouvez demander la suppression de vos données',
      'Portabilité des données: Vous pouvez recevoir vos données dans un format courant',
    ],
    s8contact: 'Pour exercer vos droits, contactez-nous à:',
    s9title: '9. Modifications de cette politique de confidentialité',
    s9text: 'Nous nous réservons le droit d\'adapter cette politique de confidentialité si nécessaire. La version actuelle est toujours disponible sur notre site web.',
    asOf: 'État: février 2026',
  },
  it: {
    title: 'Informativa sulla privacy',
    back: '← Indietro',
    s1title: '1. Note generali',
    s1text: 'La protezione dei vostri dati personali è per noi una questione importante. Questa informativa sulla privacy vi informa sulla raccolta, l\'elaborazione e l\'utilizzo dei vostri dati personali durante l\'utilizzo di translateshop.ch.',
    s1responsible: 'Responsabile del trattamento dei dati:',
    s2title: '2. Raccolta ed elaborazione dei dati',
    s2intro: 'Raccogliamo ed elaboriamo i seguenti dati:',
    s2items: [
      'Dati di registrazione: Indirizzo e-mail e password al momento della creazione dell\'account',
      'Dati di utilizzo: File CSV caricati per la traduzione (eliminati dopo l\'elaborazione)',
      'Dati di pagamento: Elaborati direttamente dal nostro fornitore di servizi di pagamento Stripe',
      'Dati tecnici: Indirizzo IP, tipo di browser, orari di accesso (per sicurezza e analisi degli errori)',
    ],
    s3title: '3. Finalità del trattamento dei dati',
    s3intro: 'Utilizziamo i vostri dati per le seguenti finalità:',
    s3items: [
      'Fornitura e miglioramento del nostro servizio di traduzione',
      'Gestione del vostro account utente e del saldo crediti',
      'Elaborazione dei pagamenti',
      'Comunicazione relativa al vostro account o ai nostri servizi',
      'Adempimento degli obblighi legali',
    ],
    s4title: '4. Fornitori terzi e responsabili del trattamento',
    s4intro: 'Collaboriamo con i seguenti fornitori di servizi:',
    s4items: [
      'Vercel: Hosting del nostro sito web (USA, clausole contrattuali standard UE)',
      'Supabase: Archiviazione database per gli account utente (server UE)',
      'Stripe: Elaborazione dei pagamenti (conforme PCI-DSS)',
      'OpenAI: Traduzioni assistite da IA (i dati non vengono utilizzati per l\'addestramento)',
    ],
    s5title: '5. Cookie',
    s5intro: 'Utilizziamo i seguenti cookie:',
    s5items: [
      'Cookie necessari: Per la funzionalità di login e la gestione delle sessioni',
      'Cookie di preferenza: Memorizzazione delle impostazioni della lingua',
    ],
    s5note: 'Non utilizziamo cookie di tracciamento o di marketing.',
    s6title: '6. Sicurezza dei dati',
    s6text: 'Utilizziamo misure di sicurezza tecniche e organizzative per proteggere i vostri dati da manipolazioni accidentali o intenzionali, perdita, distruzione o accesso da parte di persone non autorizzate. La trasmissione dei dati avviene in forma crittografata tramite SSL/TLS.',
    s7title: '7. Durata di conservazione',
    s7intro: 'Conserviamo i vostri dati solo per il tempo necessario alle finalità indicate:',
    s7items: [
      'Dati dell\'account: Fino alla cancellazione del vostro account',
      'File caricati: Eliminati automaticamente dopo l\'elaborazione',
      'Dati di fatturazione: 10 anni (obbligo legale di conservazione)',
    ],
    s8title: '8. I vostri diritti',
    s8intro: 'Secondo la legge svizzera sulla protezione dei dati (LPD), avete i seguenti diritti:',
    s8items: [
      'Diritto di accesso: Potete richiedere informazioni sui vostri dati memorizzati',
      'Diritto di rettifica: Potete richiedere la correzione di dati errati',
      'Diritto alla cancellazione: Potete richiedere la cancellazione dei vostri dati',
      'Portabilità dei dati: Potete ricevere i vostri dati in un formato comune',
    ],
    s8contact: 'Per esercitare i vostri diritti, contattateci a:',
    s9title: '9. Modifiche a questa informativa sulla privacy',
    s9text: 'Ci riserviamo il diritto di adattare questa informativa sulla privacy se necessario. La versione attuale è sempre disponibile sul nostro sito web.',
    asOf: 'Stato: febbraio 2026',
  },
  en: {
    title: 'Privacy Policy',
    back: '← Back',
    s1title: '1. General Information',
    s1text: 'The protection of your personal data is an important concern for us. This privacy policy informs you about the collection, processing and use of your personal data when using translateshop.ch.',
    s1responsible: 'Responsible for data processing:',
    s2title: '2. Data Collection and Processing',
    s2intro: 'We collect and process the following data:',
    s2items: [
      'Registration data: Email address and password when creating an account',
      'Usage data: Uploaded CSV files for translation (deleted after processing)',
      'Payment data: Processed directly by our payment service provider Stripe',
      'Technical data: IP address, browser type, access times (for security and error analysis)',
    ],
    s3title: '3. Purpose of Data Processing',
    s3intro: 'We use your data for the following purposes:',
    s3items: [
      'Provision and improvement of our translation service',
      'Management of your user account and credit balance',
      'Processing of payments',
      'Communication regarding your account or our services',
      'Compliance with legal obligations',
    ],
    s4title: '4. Third-Party Providers and Processors',
    s4intro: 'We work with the following service providers:',
    s4items: [
      'Vercel: Hosting of our website (USA, EU standard contractual clauses)',
      'Supabase: Database storage for user accounts (EU servers)',
      'Stripe: Payment processing (PCI-DSS compliant)',
      'OpenAI: AI-powered translations (data is not used for training)',
    ],
    s5title: '5. Cookies',
    s5intro: 'We use the following cookies:',
    s5items: [
      'Necessary cookies: For login functionality and session management',
      'Preference cookies: Storage of your language setting',
    ],
    s5note: 'We do not use tracking or marketing cookies.',
    s6title: '6. Data Security',
    s6text: 'We use technical and organizational security measures to protect your data against accidental or intentional manipulation, loss, destruction or access by unauthorized persons. Data transmission is encrypted via SSL/TLS.',
    s7title: '7. Storage Duration',
    s7intro: 'We only store your data for as long as necessary for the stated purposes:',
    s7items: [
      'Account data: Until deletion of your account',
      'Uploaded files: Automatically deleted after processing',
      'Billing data: 10 years (legal retention requirement)',
    ],
    s8title: '8. Your Rights',
    s8intro: 'Under the Swiss Data Protection Act (DSG), you have the following rights:',
    s8items: [
      'Right of access: You can request information about your stored data',
      'Right to rectification: You can request the correction of incorrect data',
      'Right to erasure: You can request the deletion of your data',
      'Data portability: You can receive your data in a common format',
    ],
    s8contact: 'To exercise your rights, contact us at:',
    s9title: '9. Changes to this Privacy Policy',
    s9text: 'We reserve the right to adapt this privacy policy as needed. The current version is always available on our website.',
    asOf: 'As of: February 2026',
  },
};

function DatenschutzContent() {
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
        
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">{t.s1title}</h2>
            <p className="text-slate-600 mb-4">{t.s1text}</p>
            <p className="text-slate-600">
              {t.s1responsible}<br />
              translateshop.ch<br />
              Lochwisstrasse 3<br />
              CH-8185 Winkel<br />
              E-Mail: <a href="mailto:support@translateshop.ch" className="text-red-600 hover:underline">support@translateshop.ch</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">{t.s2title}</h2>
            <p className="text-slate-600 mb-4">{t.s2intro}</p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              {t.s2items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">{t.s3title}</h2>
            <p className="text-slate-600 mb-4">{t.s3intro}</p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              {t.s3items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">{t.s4title}</h2>
            <p className="text-slate-600 mb-4">{t.s4intro}</p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              {t.s4items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">{t.s5title}</h2>
            <p className="text-slate-600 mb-4">{t.s5intro}</p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              {t.s5items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="text-slate-600 mt-4">{t.s5note}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">{t.s6title}</h2>
            <p className="text-slate-600">{t.s6text}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">{t.s7title}</h2>
            <p className="text-slate-600 mb-4">{t.s7intro}</p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              {t.s7items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">{t.s8title}</h2>
            <p className="text-slate-600 mb-4">{t.s8intro}</p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              {t.s8items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p className="text-slate-600 mt-4">
              {t.s8contact}{' '}
              <a href="mailto:support@translateshop.ch" className="text-red-600 hover:underline">support@translateshop.ch</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">{t.s9title}</h2>
            <p className="text-slate-600">{t.s9text}</p>
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

export default function DatenschutzPage() {
  return (
    <I18nProvider>
      <DatenschutzContent />
    </I18nProvider>
  );
}
