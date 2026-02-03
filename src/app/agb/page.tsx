'use client';

import Link from 'next/link';
import { I18nProvider, useI18n } from '@/i18n/I18nProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const content = {
  de: {
    title: 'Allgemeine Geschäftsbedingungen (AGB)',
    back: '← Zurück',
    sections: [
      {
        title: '1. Geltungsbereich',
        paragraphs: [
          'Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Dienstleistungen, die über translateshop.ch (nachfolgend "Anbieter") angeboten werden.',
        ],
      },
      {
        title: '2. Leistungsbeschreibung',
        paragraphs: [
          'TranslateShop bietet einen Online-Dienst zur automatisierten Übersetzung von E-Commerce-Produktdaten mittels künstlicher Intelligenz. Der Dienst umfasst:',
        ],
        items: [
          'Upload von CSV-Dateien mit Produktdaten',
          'Automatische Übersetzung in die Sprachen Deutsch, Französisch, Italienisch und Englisch',
          'Download der übersetzten Dateien',
          'Verwaltung eines Credit-Guthabens',
        ],
      },
      {
        title: '3. Vertragsschluss und Registrierung',
        paragraphs: [
          'Mit der Registrierung eines Benutzerkontos kommt ein Nutzungsvertrag zustande. Der Nutzer versichert, dass alle angegebenen Daten korrekt sind und er volljährig ist oder die Zustimmung eines Erziehungsberechtigten hat.',
          'Der Nutzer ist für die Geheimhaltung seiner Zugangsdaten verantwortlich.',
        ],
      },
      {
        title: '4. Credit-System und Preise',
        paragraphs: ['Die Nutzung des Übersetzungsdienstes erfolgt über ein Credit-System:'],
        items: [
          '1 Credit = Übersetzung einer Zeile in eine Zielsprache',
          'Bei der Registrierung erhält jeder Nutzer 50 Gratis-Credits',
          'Weitere Credits können über die Plattform erworben werden',
          'Credits verfallen nicht und sind nicht übertragbar',
          'Bereits erworbene Credits werden bei Preisänderungen nicht rückwirkend angepasst',
        ],
        paragraphs2: ['Die aktuellen Preise sind auf der Website unter "Preise" ersichtlich. Alle Preise verstehen sich in Schweizer Franken (CHF) und inklusive der gesetzlichen Mehrwertsteuer (sofern anwendbar).'],
      },
      {
        title: '5. Unlimited-Abonnement',
        paragraphs: ['Das Unlimited-Abonnement bietet unbegrenzte Übersetzungen gegen eine monatliche Gebühr:'],
        items: [
          'Die Abrechnung erfolgt monatlich im Voraus',
          'Das Abonnement ist monatlich kündbar zum Ende der jeweiligen Abrechnungsperiode',
          'Bei Kündigung bleibt der Zugang bis zum Ende der bezahlten Periode bestehen',
          'Eine Rückerstattung für angebrochene Perioden erfolgt nicht',
        ],
      },
      {
        title: '6. Zahlung',
        paragraphs: [
          'Die Zahlung erfolgt über den Zahlungsdienstleister Stripe. Es werden gängige Zahlungsmittel wie Kreditkarten akzeptiert.',
          'Mit dem Kauf von Credits oder dem Abschluss eines Abonnements bestätigt der Nutzer, zur Verwendung des gewählten Zahlungsmittels berechtigt zu sein.',
        ],
      },
      {
        title: '7. Widerrufsrecht',
        paragraphs: [
          'Da es sich um digitale Dienstleistungen handelt, die sofort nach dem Kauf verfügbar sind, verzichtet der Nutzer mit dem Kauf auf sein Widerrufsrecht, sofern er dem sofortigen Beginn der Dienstleistung ausdrücklich zugestimmt hat.',
          'Die 50 Gratis-Credits bei der Registrierung ermöglichen das risikofreie Testen des Dienstes vor einem Kauf.',
        ],
      },
      {
        title: '8. Nutzungsrechte und Pflichten',
        paragraphs: ['Der Nutzer darf den Dienst nur für legale Zwecke nutzen. Verboten ist insbesondere:'],
        items: [
          'Das Hochladen von rechtswidrigen, beleidigenden oder urheberrechtlich geschützten Inhalten ohne entsprechende Berechtigung',
          'Die Manipulation oder Umgehung des Credit-Systems',
          'Die übermässige Belastung der Server oder Infrastruktur',
          'Der Weiterverkauf des Dienstes ohne schriftliche Genehmigung',
        ],
      },
      {
        title: '9. Gewährleistung und Haftung',
        paragraphs: [
          'Die Übersetzungen werden mittels künstlicher Intelligenz erstellt. Obwohl wir hohe Qualitätsstandards anstreben, können wir keine Garantie für die vollständige Richtigkeit, Vollständigkeit oder Eignung der Übersetzungen für einen bestimmten Zweck übernehmen.',
          'Der Nutzer ist für die Überprüfung der Übersetzungen vor deren Verwendung selbst verantwortlich.',
          'Die Haftung des Anbieters ist auf Vorsatz und grobe Fahrlässigkeit beschränkt. Die Haftung für indirekte Schäden, entgangenen Gewinn oder Folgeschäden ist ausgeschlossen, soweit gesetzlich zulässig.',
        ],
      },
      {
        title: '10. Datenschutz',
        paragraphs: ['Der Umgang mit personenbezogenen Daten ist in unserer Datenschutzerklärung geregelt.'],
        link: { href: '/datenschutz', text: 'Datenschutzerklärung' },
      },
      {
        title: '11. Verfügbarkeit',
        paragraphs: ['Wir bemühen uns um eine hohe Verfügbarkeit des Dienstes, können jedoch keine ununterbrochene Verfügbarkeit garantieren. Wartungsarbeiten und technische Störungen können zu vorübergehenden Einschränkungen führen.'],
      },
      {
        title: '12. Kündigung und Kontolöschung',
        paragraphs: [
          'Der Nutzer kann sein Konto jederzeit per E-Mail kündigen.',
          'Bei Verstössen gegen diese AGB behält sich der Anbieter das Recht vor, das Nutzerkonto zu sperren oder zu löschen. Ein Anspruch auf Rückerstattung von Credits besteht in diesem Fall nicht.',
        ],
      },
      {
        title: '13. Änderungen der AGB',
        paragraphs: ['Der Anbieter behält sich vor, diese AGB jederzeit zu ändern. Änderungen werden dem Nutzer per E-Mail oder bei der nächsten Anmeldung mitgeteilt.'],
      },
      {
        title: '14. Anwendbares Recht und Gerichtsstand',
        paragraphs: [
          'Es gilt ausschliesslich Schweizer Recht unter Ausschluss des UN-Kaufrechts und der Kollisionsnormen.',
          'Gerichtsstand ist Bülach, Schweiz.',
        ],
      },
      {
        title: '15. Salvatorische Klausel',
        paragraphs: ['Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Gültigkeit der übrigen Bestimmungen unberührt.'],
      },
    ],
    asOf: 'Stand: Februar 2026',
  },
  fr: {
    title: 'Conditions Générales (CG)',
    back: '← Retour',
    sections: [
      {
        title: '1. Champ d\'application',
        paragraphs: ['Les présentes conditions générales (CG) s\'appliquent à tous les services proposés via translateshop.ch (ci-après "fournisseur").'],
      },
      {
        title: '2. Description des services',
        paragraphs: ['TranslateShop propose un service en ligne de traduction automatisée de données produits e-commerce à l\'aide de l\'intelligence artificielle. Le service comprend:'],
        items: [
          'Téléchargement de fichiers CSV avec données produits',
          'Traduction automatique en allemand, français, italien et anglais',
          'Téléchargement des fichiers traduits',
          'Gestion d\'un solde de crédits',
        ],
      },
      {
        title: '3. Conclusion du contrat et inscription',
        paragraphs: [
          'L\'inscription d\'un compte utilisateur constitue la conclusion d\'un contrat d\'utilisation. L\'utilisateur certifie que toutes les données fournies sont correctes et qu\'il est majeur ou dispose du consentement d\'un tuteur légal.',
          'L\'utilisateur est responsable de la confidentialité de ses identifiants.',
        ],
      },
      {
        title: '4. Système de crédits et prix',
        paragraphs: ['L\'utilisation du service de traduction fonctionne via un système de crédits:'],
        items: [
          '1 crédit = traduction d\'une ligne dans une langue cible',
          'Chaque utilisateur reçoit 50 crédits gratuits à l\'inscription',
          'Des crédits supplémentaires peuvent être achetés sur la plateforme',
          'Les crédits n\'expirent pas et ne sont pas transférables',
          'Les crédits déjà acquis ne sont pas ajustés rétroactivement en cas de changement de prix',
        ],
        paragraphs2: ['Les prix actuels sont indiqués sur le site web sous "Tarifs". Tous les prix sont en francs suisses (CHF) et incluent la TVA légale (le cas échéant).'],
      },
      {
        title: '5. Abonnement Illimité',
        paragraphs: ['L\'abonnement illimité offre des traductions illimitées moyennant un frais mensuel:'],
        items: [
          'La facturation est mensuelle et à l\'avance',
          'L\'abonnement est résiliable mensuellement à la fin de la période de facturation',
          'En cas de résiliation, l\'accès reste disponible jusqu\'à la fin de la période payée',
          'Aucun remboursement n\'est effectué pour les périodes entamées',
        ],
      },
      {
        title: '6. Paiement',
        paragraphs: [
          'Le paiement s\'effectue via le prestataire de paiement Stripe. Les moyens de paiement courants comme les cartes de crédit sont acceptés.',
          'En achetant des crédits ou en souscrivant un abonnement, l\'utilisateur confirme être autorisé à utiliser le moyen de paiement choisi.',
        ],
      },
      {
        title: '7. Droit de rétractation',
        paragraphs: [
          'S\'agissant de services numériques disponibles immédiatement après l\'achat, l\'utilisateur renonce à son droit de rétractation en achetant, s\'il a expressément consenti au début immédiat du service.',
          'Les 50 crédits gratuits à l\'inscription permettent de tester le service sans risque avant tout achat.',
        ],
      },
      {
        title: '8. Droits et obligations d\'utilisation',
        paragraphs: ['L\'utilisateur ne peut utiliser le service qu\'à des fins légales. Est notamment interdit:'],
        items: [
          'Le téléchargement de contenus illégaux, offensants ou protégés par le droit d\'auteur sans autorisation',
          'La manipulation ou le contournement du système de crédits',
          'La surcharge excessive des serveurs ou de l\'infrastructure',
          'La revente du service sans autorisation écrite',
        ],
      },
      {
        title: '9. Garantie et responsabilité',
        paragraphs: [
          'Les traductions sont réalisées par intelligence artificielle. Bien que nous visions des standards de qualité élevés, nous ne pouvons garantir l\'exactitude, l\'exhaustivité ou l\'adéquation des traductions à un usage particulier.',
          'L\'utilisateur est responsable de la vérification des traductions avant leur utilisation.',
          'La responsabilité du fournisseur est limitée au dol et à la négligence grave. La responsabilité pour les dommages indirects, le manque à gagner ou les dommages consécutifs est exclue dans la mesure permise par la loi.',
        ],
      },
      {
        title: '10. Protection des données',
        paragraphs: ['Le traitement des données personnelles est régi par notre politique de confidentialité.'],
        link: { href: '/datenschutz', text: 'Politique de confidentialité' },
      },
      {
        title: '11. Disponibilité',
        paragraphs: ['Nous nous efforçons d\'assurer une haute disponibilité du service, mais ne pouvons garantir une disponibilité ininterrompue. Des travaux de maintenance et des perturbations techniques peuvent entraîner des restrictions temporaires.'],
      },
      {
        title: '12. Résiliation et suppression de compte',
        paragraphs: [
          'L\'utilisateur peut résilier son compte à tout moment par e-mail.',
          'En cas de violation des présentes CG, le fournisseur se réserve le droit de suspendre ou supprimer le compte utilisateur. Aucun remboursement des crédits n\'est dû dans ce cas.',
        ],
      },
      {
        title: '13. Modifications des CG',
        paragraphs: ['Le fournisseur se réserve le droit de modifier les présentes CG à tout moment. Les modifications seront communiquées à l\'utilisateur par e-mail ou lors de la prochaine connexion.'],
      },
      {
        title: '14. Droit applicable et for juridique',
        paragraphs: [
          'Le droit suisse s\'applique exclusivement, à l\'exclusion de la Convention des Nations Unies sur les contrats de vente internationale de marchandises et des règles de conflit de lois.',
          'Le for juridique est Bülach, Suisse.',
        ],
      },
      {
        title: '15. Clause de sauvegarde',
        paragraphs: ['Si certaines dispositions des présentes CG sont ou deviennent invalides, la validité des autres dispositions n\'en est pas affectée.'],
      },
    ],
    asOf: 'État: février 2026',
  },
  it: {
    title: 'Condizioni Generali (CG)',
    back: '← Indietro',
    sections: [
      {
        title: '1. Ambito di applicazione',
        paragraphs: ['Le presenti condizioni generali (CG) si applicano a tutti i servizi offerti tramite translateshop.ch (di seguito "fornitore").'],
      },
      {
        title: '2. Descrizione del servizio',
        paragraphs: ['TranslateShop offre un servizio online per la traduzione automatizzata di dati di prodotti e-commerce mediante intelligenza artificiale. Il servizio comprende:'],
        items: [
          'Caricamento di file CSV con dati di prodotto',
          'Traduzione automatica in tedesco, francese, italiano e inglese',
          'Download dei file tradotti',
          'Gestione di un saldo crediti',
        ],
      },
      {
        title: '3. Conclusione del contratto e registrazione',
        paragraphs: [
          'Con la registrazione di un account utente si conclude un contratto di utilizzo. L\'utente dichiara che tutti i dati forniti sono corretti e che è maggiorenne o dispone del consenso di un tutore legale.',
          'L\'utente è responsabile della riservatezza delle proprie credenziali di accesso.',
        ],
      },
      {
        title: '4. Sistema di crediti e prezzi',
        paragraphs: ['L\'utilizzo del servizio di traduzione avviene tramite un sistema di crediti:'],
        items: [
          '1 credito = traduzione di una riga in una lingua di destinazione',
          'Ogni utente riceve 50 crediti gratuiti alla registrazione',
          'Ulteriori crediti possono essere acquistati sulla piattaforma',
          'I crediti non scadono e non sono trasferibili',
          'I crediti già acquistati non vengono adeguati retroattivamente in caso di variazioni di prezzo',
        ],
        paragraphs2: ['I prezzi attuali sono indicati sul sito web alla voce "Prezzi". Tutti i prezzi sono in franchi svizzeri (CHF) e includono l\'IVA legale (se applicabile).'],
      },
      {
        title: '5. Abbonamento Illimitato',
        paragraphs: ['L\'abbonamento illimitato offre traduzioni illimitate a fronte di un canone mensile:'],
        items: [
          'La fatturazione avviene mensilmente e in anticipo',
          'L\'abbonamento è disdettabile mensilmente alla fine del periodo di fatturazione',
          'In caso di disdetta, l\'accesso rimane disponibile fino alla fine del periodo pagato',
          'Non sono previsti rimborsi per periodi già iniziati',
        ],
      },
      {
        title: '6. Pagamento',
        paragraphs: [
          'Il pagamento avviene tramite il fornitore di servizi di pagamento Stripe. Sono accettati i mezzi di pagamento comuni come le carte di credito.',
          'Con l\'acquisto di crediti o la sottoscrizione di un abbonamento, l\'utente conferma di essere autorizzato a utilizzare il mezzo di pagamento scelto.',
        ],
      },
      {
        title: '7. Diritto di recesso',
        paragraphs: [
          'Trattandosi di servizi digitali disponibili immediatamente dopo l\'acquisto, l\'utente rinuncia al proprio diritto di recesso con l\'acquisto, se ha espressamente acconsentito all\'inizio immediato del servizio.',
          'I 50 crediti gratuiti alla registrazione consentono di testare il servizio senza rischi prima di qualsiasi acquisto.',
        ],
      },
      {
        title: '8. Diritti e obblighi di utilizzo',
        paragraphs: ['L\'utente può utilizzare il servizio solo per scopi legali. È vietato in particolare:'],
        items: [
          'Il caricamento di contenuti illegali, offensivi o protetti da copyright senza autorizzazione',
          'La manipolazione o l\'aggiramento del sistema di crediti',
          'Il sovraccarico eccessivo dei server o dell\'infrastruttura',
          'La rivendita del servizio senza autorizzazione scritta',
        ],
      },
      {
        title: '9. Garanzia e responsabilità',
        paragraphs: [
          'Le traduzioni vengono create mediante intelligenza artificiale. Sebbene puntiamo a standard di qualità elevati, non possiamo garantire la completa correttezza, completezza o idoneità delle traduzioni per uno scopo particolare.',
          'L\'utente è responsabile della verifica delle traduzioni prima del loro utilizzo.',
          'La responsabilità del fornitore è limitata al dolo e alla colpa grave. La responsabilità per danni indiretti, mancato guadagno o danni consequenziali è esclusa nei limiti consentiti dalla legge.',
        ],
      },
      {
        title: '10. Protezione dei dati',
        paragraphs: ['Il trattamento dei dati personali è disciplinato dalla nostra informativa sulla privacy.'],
        link: { href: '/datenschutz', text: 'Informativa sulla privacy' },
      },
      {
        title: '11. Disponibilità',
        paragraphs: ['Ci impegniamo per un\'elevata disponibilità del servizio, ma non possiamo garantire una disponibilità ininterrotta. Lavori di manutenzione e problemi tecnici possono comportare limitazioni temporanee.'],
      },
      {
        title: '12. Disdetta e cancellazione dell\'account',
        paragraphs: [
          'L\'utente può disdire il proprio account in qualsiasi momento via e-mail.',
          'In caso di violazione delle presenti CG, il fornitore si riserva il diritto di sospendere o cancellare l\'account utente. In tal caso non sussiste alcun diritto al rimborso dei crediti.',
        ],
      },
      {
        title: '13. Modifiche alle CG',
        paragraphs: ['Il fornitore si riserva il diritto di modificare le presenti CG in qualsiasi momento. Le modifiche saranno comunicate all\'utente via e-mail o al prossimo accesso.'],
      },
      {
        title: '14. Diritto applicabile e foro competente',
        paragraphs: [
          'Si applica esclusivamente il diritto svizzero, con esclusione della Convenzione delle Nazioni Unite sui contratti di vendita internazionale di merci e delle norme di conflitto di leggi.',
          'Il foro competente è Bülach, Svizzera.',
        ],
      },
      {
        title: '15. Clausola di salvaguardia',
        paragraphs: ['Se singole disposizioni delle presenti CG sono o diventano invalide, la validità delle restanti disposizioni rimane inalterata.'],
      },
    ],
    asOf: 'Stato: febbraio 2026',
  },
  en: {
    title: 'Terms and Conditions',
    back: '← Back',
    sections: [
      {
        title: '1. Scope of Application',
        paragraphs: ['These Terms and Conditions apply to all services offered via translateshop.ch (hereinafter "provider").'],
      },
      {
        title: '2. Service Description',
        paragraphs: ['TranslateShop offers an online service for automated translation of e-commerce product data using artificial intelligence. The service includes:'],
        items: [
          'Upload of CSV files with product data',
          'Automatic translation into German, French, Italian and English',
          'Download of translated files',
          'Management of a credit balance',
        ],
      },
      {
        title: '3. Contract Conclusion and Registration',
        paragraphs: [
          'Registering a user account constitutes the conclusion of a usage contract. The user confirms that all provided data is correct and that they are of legal age or have the consent of a legal guardian.',
          'The user is responsible for keeping their login credentials confidential.',
        ],
      },
      {
        title: '4. Credit System and Prices',
        paragraphs: ['The use of the translation service operates via a credit system:'],
        items: [
          '1 credit = translation of one row into one target language',
          'Each user receives 50 free credits upon registration',
          'Additional credits can be purchased on the platform',
          'Credits do not expire and are not transferable',
          'Already purchased credits are not retroactively adjusted in case of price changes',
        ],
        paragraphs2: ['Current prices are shown on the website under "Pricing". All prices are in Swiss francs (CHF) and include statutory VAT (if applicable).'],
      },
      {
        title: '5. Unlimited Subscription',
        paragraphs: ['The unlimited subscription offers unlimited translations for a monthly fee:'],
        items: [
          'Billing is monthly in advance',
          'The subscription can be cancelled monthly at the end of the billing period',
          'Upon cancellation, access remains available until the end of the paid period',
          'No refunds are given for partial periods',
        ],
      },
      {
        title: '6. Payment',
        paragraphs: [
          'Payment is processed via the payment service provider Stripe. Common payment methods such as credit cards are accepted.',
          'By purchasing credits or subscribing, the user confirms being authorized to use the chosen payment method.',
        ],
      },
      {
        title: '7. Right of Withdrawal',
        paragraphs: [
          'As these are digital services available immediately after purchase, the user waives their right of withdrawal upon purchase if they have expressly consented to the immediate commencement of the service.',
          'The 50 free credits upon registration allow risk-free testing of the service before any purchase.',
        ],
      },
      {
        title: '8. Usage Rights and Obligations',
        paragraphs: ['The user may only use the service for legal purposes. The following is prohibited:'],
        items: [
          'Uploading illegal, offensive or copyrighted content without authorization',
          'Manipulation or circumvention of the credit system',
          'Excessive load on servers or infrastructure',
          'Resale of the service without written permission',
        ],
      },
      {
        title: '9. Warranty and Liability',
        paragraphs: [
          'Translations are created using artificial intelligence. Although we strive for high quality standards, we cannot guarantee the complete accuracy, completeness or suitability of translations for a particular purpose.',
          'The user is responsible for reviewing translations before use.',
          'The provider\'s liability is limited to intent and gross negligence. Liability for indirect damages, lost profits or consequential damages is excluded to the extent permitted by law.',
        ],
      },
      {
        title: '10. Data Protection',
        paragraphs: ['The handling of personal data is governed by our privacy policy.'],
        link: { href: '/datenschutz', text: 'Privacy Policy' },
      },
      {
        title: '11. Availability',
        paragraphs: ['We strive for high availability of the service but cannot guarantee uninterrupted availability. Maintenance work and technical disruptions may lead to temporary restrictions.'],
      },
      {
        title: '12. Termination and Account Deletion',
        paragraphs: [
          'The user can terminate their account at any time via email.',
          'In case of violation of these terms, the provider reserves the right to suspend or delete the user account. No credit refund is due in this case.',
        ],
      },
      {
        title: '13. Changes to Terms',
        paragraphs: ['The provider reserves the right to change these terms at any time. Changes will be communicated to the user by email or upon next login.'],
      },
      {
        title: '14. Applicable Law and Jurisdiction',
        paragraphs: [
          'Swiss law applies exclusively, excluding the UN Convention on Contracts for the International Sale of Goods and conflict of law rules.',
          'Place of jurisdiction is Bülach, Switzerland.',
        ],
      },
      {
        title: '15. Severability Clause',
        paragraphs: ['If individual provisions of these terms are or become invalid, the validity of the remaining provisions remains unaffected.'],
      },
    ],
    asOf: 'As of: February 2026',
  },
};

function AGBContent() {
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
        
        <div className="bg-white rounded-xl shadow-sm p-8">
          <p className="text-slate-600 mb-8">
            translateshop.ch<br />
            Lochwisstrasse 3<br />
            CH-8185 Winkel<br />
            E-Mail: <a href="mailto:kontakt@translateshop.ch" className="text-red-600 hover:underline">kontakt@translateshop.ch</a>
          </p>

          <div className="space-y-8">
            {t.sections.map((section, idx) => (
              <section key={idx}>
                <h2 className="text-xl font-semibold text-slate-800 mb-3">{section.title}</h2>
                {section.paragraphs?.map((p, i) => (
                  <p key={i} className="text-slate-600 mb-4">{p}</p>
                ))}
                {section.items && (
                  <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4 mb-4">
                    {section.items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                )}
                {section.paragraphs2?.map((p, i) => (
                  <p key={i} className="text-slate-600 mb-4">{p}</p>
                ))}
                {section.link && (
                  <p className="text-slate-600">
                    <Link href={section.link.href} className="text-red-600 hover:underline">{section.link.text}</Link>
                  </p>
                )}
              </section>
            ))}
          </div>
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

export default function AGBPage() {
  return (
    <I18nProvider>
      <AGBContent />
    </I18nProvider>
  );
}
