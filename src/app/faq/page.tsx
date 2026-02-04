'use client';

import Link from 'next/link';
import { useState } from 'react';
import { I18nProvider, useI18n } from '@/i18n/I18nProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const content = {
  de: {
    title: 'Häufige Fragen',
    subtitle: 'Alles was Sie über TranslateShop wissen müssen. Finden Sie keine Antwort? Schreiben Sie uns an',
    back: '← Zurück',
    all: 'Alle',
    stillQuestions: 'Noch Fragen?',
    stillQuestionsText: 'Testen Sie TranslateShop einfach selbst — kostenlos und ohne Risiko. 50 Credits geschenkt, keine Kreditkarte nötig.',
    startFree: 'Kostenlos starten →',
    contactSupport: 'Support kontaktieren',
    categories: {
      general: 'Allgemein',
      credits: 'Credits & Preise',
      features: 'Funktionen',
      technical: 'Technisches',
      support: 'Support',
    },
    items: [
      { category: 'general', question: 'Was ist TranslateShop?', answer: 'TranslateShop ist ein KI-gestützter Übersetzungsservice speziell für Schweizer Online-Shops. Wir übersetzen Ihre Produkttexte in Deutsch, Französisch, Italienisch und Englisch — optimiert für den Schweizer Markt mit korrekter Währung (CHF), Helvetismen und der richtigen Anrede.' },
      { category: 'general', question: 'Für welche Shop-Systeme funktioniert TranslateShop?', answer: 'TranslateShop funktioniert mit allen Shop-Systemen, die CSV-Import/Export unterstützen: Shopify, WooCommerce, PrestaShop, Magento, Shopware und viele mehr. Für Shopify und WooCommerce bieten wir zusätzlich eine direkte Integration an.' },
      { category: 'general', question: 'Wie gut ist die Übersetzungsqualität?', answer: 'Wir nutzen modernste KI-Technologie (GPT-4), die speziell auf E-Commerce-Texte und Schweizer Besonderheiten trainiert wurde. Die Qualität ist vergleichbar mit professionellen Übersetzern — zu einem Bruchteil der Kosten und in Sekunden statt Wochen.' },
      { category: 'credits', question: 'Was ist ein Credit?', answer: '1 Credit = 1 Zeile × 1 Sprache. Wenn Sie z.B. 100 Produkttitel von Deutsch nach Französisch UND Italienisch übersetzen, benötigen Sie 200 Credits (100 Zeilen × 2 Sprachen).' },
      { category: 'credits', question: 'Verfallen meine Credits?', answer: 'Nein! Ihre Credits verfallen nie. Sie können jederzeit weitere Credits nachkaufen, wenn Sie mehr benötigen.' },
      { category: 'credits', question: 'Gibt es ein Abo?', answer: 'Nein, wir bieten keine Abos an. Sie kaufen einmalig Credit-Pakete und nutzen diese, wann immer Sie möchten. Keine versteckten Kosten, keine automatischen Verlängerungen.' },
      { category: 'credits', question: 'Kann ich TranslateShop kostenlos testen?', answer: 'Ja! Bei der Registrierung erhalten Sie 50 Credits geschenkt — ohne Kreditkarte. So können Sie die Qualität unserer Übersetzungen risikofrei testen.' },
      { category: 'features', question: 'Was ist das Glossar?', answer: 'Mit dem Glossar können Sie Begriffe definieren, die immer gleich übersetzt werden sollen. Perfekt für Markennamen, Fachbegriffe oder firmenspezifische Ausdrücke. Beispiel: "Natel" soll immer "Natel" bleiben, nicht zu "portable" übersetzt werden.' },
      { category: 'features', question: 'Kann ich Übersetzungen nachträglich bearbeiten?', answer: 'Ja! Alle Übersetzungen können vor dem Export manuell angepasst werden. Sie haben volle Kontrolle über das Endergebnis.' },
      { category: 'features', question: 'Wie funktioniert die Shopify/WooCommerce Integration?', answer: 'Sie verbinden Ihren Shop einmalig mit TranslateShop. Danach können Sie Produkte direkt importieren, übersetzen und die Übersetzungen zurück in Ihren Shop synchronisieren — ohne manuellen CSV-Export/Import.' },
      { category: 'technical', question: 'Welches CSV-Format wird unterstützt?', answer: 'Wir unterstützen Standard-CSV-Dateien (komma- oder semikolongetrennt) sowie Excel-Exporte. Die Spalten werden automatisch erkannt. Gängige Shop-System-Exporte (Shopify, WooCommerce, etc.) funktionieren out-of-the-box.' },
      { category: 'technical', question: 'Gibt es eine API?', answer: 'Ja! Wir bieten eine REST API für Entwickler. Damit können Sie Übersetzungen direkt in Ihre Workflows integrieren. API-Schlüssel können im Dashboard erstellt werden.' },
      { category: 'technical', question: 'Wo werden meine Daten gespeichert?', answer: 'Alle Daten werden ausschliesslich in der Schweiz gehostet. Wir sind vollständig DSGVO-konform und geben keine Daten an Dritte weiter.' },
      { category: 'support', question: 'Wie erreiche ich den Support?', answer: 'Sie erreichen uns per E-Mail unter support@translateshop.ch. Wir antworten in der Regel innerhalb von 24 Stunden (werktags).' },
      { category: 'support', question: 'Gibt es eine Dokumentation?', answer: 'Ja! Unter /docs finden Sie ausführliche Anleitungen für alle Funktionen, inklusive Schritt-für-Schritt Guides für Shopify und WooCommerce.' },
    ],
  },
  fr: {
    title: 'Questions fréquentes',
    subtitle: 'Tout ce que vous devez savoir sur TranslateShop. Vous ne trouvez pas de réponse ? Écrivez-nous à',
    back: '← Retour',
    all: 'Tout',
    stillQuestions: 'Encore des questions ?',
    stillQuestionsText: 'Testez TranslateShop gratuitement et sans risque. 50 crédits offerts, sans carte de crédit.',
    startFree: 'Commencer gratuitement →',
    contactSupport: 'Contacter le support',
    categories: {
      general: 'Général',
      credits: 'Crédits & Prix',
      features: 'Fonctionnalités',
      technical: 'Technique',
      support: 'Support',
    },
    items: [
      { category: 'general', question: 'Qu\'est-ce que TranslateShop ?', answer: 'TranslateShop est un service de traduction basé sur l\'IA, spécialement conçu pour les boutiques en ligne suisses. Nous traduisons vos textes de produits en allemand, français, italien et anglais — optimisés pour le marché suisse avec la devise correcte (CHF), les helvétismes et le bon vouvoiement.' },
      { category: 'general', question: 'Avec quels systèmes de boutique TranslateShop fonctionne-t-il ?', answer: 'TranslateShop fonctionne avec tous les systèmes de boutique qui supportent l\'import/export CSV : Shopify, WooCommerce, PrestaShop, Magento, Shopware et bien d\'autres. Pour Shopify et WooCommerce, nous offrons également une intégration directe.' },
      { category: 'general', question: 'Quelle est la qualité des traductions ?', answer: 'Nous utilisons la technologie IA la plus avancée (GPT-4), spécialement entraînée pour les textes e-commerce et les particularités suisses. La qualité est comparable à celle de traducteurs professionnels — pour une fraction du coût et en quelques secondes au lieu de semaines.' },
      { category: 'credits', question: 'Qu\'est-ce qu\'un crédit ?', answer: '1 crédit = 1 ligne × 1 langue. Par exemple, si vous traduisez 100 titres de produits de l\'allemand vers le français ET l\'italien, vous aurez besoin de 200 crédits (100 lignes × 2 langues).' },
      { category: 'credits', question: 'Mes crédits expirent-ils ?', answer: 'Non ! Vos crédits n\'expirent jamais. Vous pouvez acheter des crédits supplémentaires à tout moment.' },
      { category: 'credits', question: 'Y a-t-il un abonnement ?', answer: 'Non, nous ne proposons pas d\'abonnements. Vous achetez des paquets de crédits une fois et les utilisez quand vous le souhaitez. Pas de frais cachés, pas de renouvellement automatique.' },
      { category: 'credits', question: 'Puis-je tester TranslateShop gratuitement ?', answer: 'Oui ! Lors de l\'inscription, vous recevez 50 crédits gratuits — sans carte de crédit. Vous pouvez ainsi tester la qualité de nos traductions sans risque.' },
      { category: 'features', question: 'Qu\'est-ce que le glossaire ?', answer: 'Le glossaire vous permet de définir des termes qui doivent toujours être traduits de la même manière. Parfait pour les noms de marques, termes techniques ou expressions spécifiques à votre entreprise.' },
      { category: 'features', question: 'Puis-je modifier les traductions après coup ?', answer: 'Oui ! Toutes les traductions peuvent être ajustées manuellement avant l\'export. Vous avez un contrôle total sur le résultat final.' },
      { category: 'features', question: 'Comment fonctionne l\'intégration Shopify/WooCommerce ?', answer: 'Vous connectez votre boutique une seule fois à TranslateShop. Ensuite, vous pouvez importer des produits directement, les traduire et synchroniser les traductions vers votre boutique — sans export/import CSV manuel.' },
      { category: 'technical', question: 'Quel format CSV est supporté ?', answer: 'Nous supportons les fichiers CSV standard (séparés par virgule ou point-virgule) ainsi que les exports Excel. Les colonnes sont automatiquement reconnues. Les exports des systèmes de boutique courants (Shopify, WooCommerce, etc.) fonctionnent directement.' },
      { category: 'technical', question: 'Y a-t-il une API ?', answer: 'Oui ! Nous offrons une API REST pour les développeurs. Vous pouvez ainsi intégrer les traductions directement dans vos workflows. Les clés API peuvent être créées dans le tableau de bord.' },
      { category: 'technical', question: 'Où mes données sont-elles stockées ?', answer: 'Toutes les données sont hébergées exclusivement en Suisse. Nous sommes entièrement conformes au RGPD et ne transmettons aucune donnée à des tiers.' },
      { category: 'support', question: 'Comment puis-je contacter le support ?', answer: 'Vous pouvez nous joindre par e-mail à support@translateshop.ch. Nous répondons généralement dans les 24 heures (jours ouvrables).' },
      { category: 'support', question: 'Y a-t-il une documentation ?', answer: 'Oui ! Sous /docs vous trouverez des guides détaillés pour toutes les fonctionnalités, y compris des guides étape par étape pour Shopify et WooCommerce.' },
    ],
  },
  it: {
    title: 'Domande frequenti',
    subtitle: 'Tutto quello che devi sapere su TranslateShop. Non trovi una risposta? Scrivici a',
    back: '← Indietro',
    all: 'Tutto',
    stillQuestions: 'Altre domande?',
    stillQuestionsText: 'Prova TranslateShop gratuitamente e senza rischi. 50 crediti in regalo, nessuna carta di credito richiesta.',
    startFree: 'Inizia gratis →',
    contactSupport: 'Contatta il supporto',
    categories: {
      general: 'Generale',
      credits: 'Crediti & Prezzi',
      features: 'Funzionalità',
      technical: 'Tecnico',
      support: 'Supporto',
    },
    items: [
      { category: 'general', question: 'Cos\'è TranslateShop?', answer: 'TranslateShop è un servizio di traduzione basato sull\'IA, progettato appositamente per i negozi online svizzeri. Traduciamo i vostri testi dei prodotti in tedesco, francese, italiano e inglese — ottimizzati per il mercato svizzero con la valuta corretta (CHF), gli elvetismi e il corretto registro linguistico.' },
      { category: 'general', question: 'Con quali sistemi di negozio funziona TranslateShop?', answer: 'TranslateShop funziona con tutti i sistemi di negozio che supportano l\'import/export CSV: Shopify, WooCommerce, PrestaShop, Magento, Shopware e molti altri. Per Shopify e WooCommerce offriamo anche un\'integrazione diretta.' },
      { category: 'general', question: 'Qual è la qualità delle traduzioni?', answer: 'Utilizziamo la tecnologia IA più avanzata (GPT-4), appositamente addestrata per testi e-commerce e particolarità svizzere. La qualità è paragonabile a quella di traduttori professionisti — a una frazione del costo e in pochi secondi invece di settimane.' },
      { category: 'credits', question: 'Cos\'è un credito?', answer: '1 credito = 1 riga × 1 lingua. Ad esempio, se traducete 100 titoli di prodotti dal tedesco al francese E all\'italiano, avrete bisogno di 200 crediti (100 righe × 2 lingue).' },
      { category: 'credits', question: 'I miei crediti scadono?', answer: 'No! I vostri crediti non scadono mai. Potete acquistare crediti aggiuntivi in qualsiasi momento.' },
      { category: 'credits', question: 'C\'è un abbonamento?', answer: 'No, non offriamo abbonamenti. Acquistate pacchetti di crediti una volta e li utilizzate quando volete. Nessun costo nascosto, nessun rinnovo automatico.' },
      { category: 'credits', question: 'Posso provare TranslateShop gratuitamente?', answer: 'Sì! Alla registrazione riceverete 50 crediti gratuiti — senza carta di credito. Così potete testare la qualità delle nostre traduzioni senza rischi.' },
      { category: 'features', question: 'Cos\'è il glossario?', answer: 'Il glossario vi permette di definire termini che devono sempre essere tradotti allo stesso modo. Perfetto per nomi di marchi, termini tecnici o espressioni specifiche della vostra azienda.' },
      { category: 'features', question: 'Posso modificare le traduzioni successivamente?', answer: 'Sì! Tutte le traduzioni possono essere adattate manualmente prima dell\'esportazione. Avete il pieno controllo sul risultato finale.' },
      { category: 'features', question: 'Come funziona l\'integrazione Shopify/WooCommerce?', answer: 'Collegate il vostro negozio una sola volta a TranslateShop. Poi potete importare prodotti direttamente, tradurli e sincronizzare le traduzioni nel vostro negozio — senza export/import CSV manuale.' },
      { category: 'technical', question: 'Quale formato CSV è supportato?', answer: 'Supportiamo file CSV standard (separati da virgola o punto e virgola) e export Excel. Le colonne vengono riconosciute automaticamente. Gli export dei sistemi di negozio comuni (Shopify, WooCommerce, ecc.) funzionano direttamente.' },
      { category: 'technical', question: 'C\'è un\'API?', answer: 'Sì! Offriamo un\'API REST per sviluppatori. Così potete integrare le traduzioni direttamente nei vostri workflow. Le chiavi API possono essere create nella dashboard.' },
      { category: 'technical', question: 'Dove vengono memorizzati i miei dati?', answer: 'Tutti i dati sono ospitati esclusivamente in Svizzera. Siamo pienamente conformi al GDPR e non trasmettiamo dati a terzi.' },
      { category: 'support', question: 'Come posso contattare il supporto?', answer: 'Potete raggiungerci via e-mail a support@translateshop.ch. Rispondiamo generalmente entro 24 ore (giorni lavorativi).' },
      { category: 'support', question: 'C\'è una documentazione?', answer: 'Sì! Sotto /docs troverete guide dettagliate per tutte le funzionalità, incluse guide passo-passo per Shopify e WooCommerce.' },
    ],
  },
  en: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about TranslateShop. Can\'t find an answer? Write to us at',
    back: '← Back',
    all: 'All',
    stillQuestions: 'Still have questions?',
    stillQuestionsText: 'Try TranslateShop for free and without risk. 50 credits as a gift, no credit card required.',
    startFree: 'Start for free →',
    contactSupport: 'Contact support',
    categories: {
      general: 'General',
      credits: 'Credits & Pricing',
      features: 'Features',
      technical: 'Technical',
      support: 'Support',
    },
    items: [
      { category: 'general', question: 'What is TranslateShop?', answer: 'TranslateShop is an AI-powered translation service specially designed for Swiss online shops. We translate your product texts into German, French, Italian and English — optimized for the Swiss market with the correct currency (CHF), Helvetisms and the right form of address.' },
      { category: 'general', question: 'Which shop systems does TranslateShop work with?', answer: 'TranslateShop works with all shop systems that support CSV import/export: Shopify, WooCommerce, PrestaShop, Magento, Shopware and many more. For Shopify and WooCommerce, we also offer a direct integration.' },
      { category: 'general', question: 'How good is the translation quality?', answer: 'We use the most advanced AI technology (GPT-4), specially trained for e-commerce texts and Swiss specifics. The quality is comparable to professional translators — at a fraction of the cost and in seconds instead of weeks.' },
      { category: 'credits', question: 'What is a credit?', answer: '1 credit = 1 row × 1 language. For example, if you translate 100 product titles from German to French AND Italian, you will need 200 credits (100 rows × 2 languages).' },
      { category: 'credits', question: 'Do my credits expire?', answer: 'No! Your credits never expire. You can buy additional credits anytime you need more.' },
      { category: 'credits', question: 'Is there a subscription?', answer: 'No, we don\'t offer subscriptions. You buy credit packages once and use them whenever you want. No hidden costs, no automatic renewals.' },
      { category: 'credits', question: 'Can I try TranslateShop for free?', answer: 'Yes! When you register, you receive 50 credits for free — no credit card required. This way you can test the quality of our translations risk-free.' },
      { category: 'features', question: 'What is the glossary?', answer: 'The glossary allows you to define terms that should always be translated the same way. Perfect for brand names, technical terms or company-specific expressions.' },
      { category: 'features', question: 'Can I edit translations afterwards?', answer: 'Yes! All translations can be manually adjusted before export. You have full control over the final result.' },
      { category: 'features', question: 'How does the Shopify/WooCommerce integration work?', answer: 'You connect your shop once to TranslateShop. Then you can import products directly, translate them and sync the translations back to your shop — without manual CSV export/import.' },
      { category: 'technical', question: 'Which CSV format is supported?', answer: 'We support standard CSV files (comma or semicolon separated) and Excel exports. Columns are automatically detected. Common shop system exports (Shopify, WooCommerce, etc.) work out-of-the-box.' },
      { category: 'technical', question: 'Is there an API?', answer: 'Yes! We offer a REST API for developers. This allows you to integrate translations directly into your workflows. API keys can be created in the dashboard.' },
      { category: 'technical', question: 'Where is my data stored?', answer: 'All data is hosted exclusively in Switzerland. We are fully GDPR compliant and do not share data with third parties.' },
      { category: 'support', question: 'How can I reach support?', answer: 'You can reach us by email at support@translateshop.ch. We usually respond within 24 hours (business days).' },
      { category: 'support', question: 'Is there documentation?', answer: 'Yes! Under /docs you will find detailed guides for all features, including step-by-step guides for Shopify and WooCommerce.' },
    ],
  },
};

function FAQContent() {
  const { locale } = useI18n();
  const t = content[locale];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const categoryKeys = ['all', 'general', 'credits', 'features', 'technical', 'support'];
  const filteredItems = activeCategory === 'all' 
    ? t.items 
    : t.items.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl md:text-2xl font-bold text-slate-800">
            🌐 TranslateShop<span className="text-red-600">.ch</span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link href="/" className="text-slate-600 hover:text-slate-800">{t.back}</Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t.subtitle}{' '}
            <a href="mailto:support@translateshop.ch" className="text-red-600 hover:underline">
              support@translateshop.ch
            </a>
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categoryKeys.map(key => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === key
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {key === 'all' ? t.all : t.categories[key as keyof typeof t.categories]}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {filteredItems.map((item, index) => {
            const globalIndex = t.items.indexOf(item);
            const isOpen = openIndex === globalIndex;
            
            return (
              <div 
                key={globalIndex}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition"
                >
                  <span className="font-medium text-slate-800 pr-4">{item.question}</span>
                  <svg 
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 text-slate-600">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-slate-800 text-white rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t.stillQuestions}
          </h2>
          <p className="text-slate-300 mb-6 max-w-xl mx-auto">
            {t.stillQuestionsText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register" 
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              {t.startFree}
            </Link>
            <a 
              href="mailto:support@translateshop.ch" 
              className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              {t.contactSupport}
            </a>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t bg-white mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© 2026 TranslateShop.ch</p>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-slate-800">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-slate-800">Datenschutz</Link>
            <Link href="/agb" className="hover:text-slate-800">AGB</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function FAQPage() {
  return (
    <I18nProvider>
      <FAQContent />
    </I18nProvider>
  );
}
