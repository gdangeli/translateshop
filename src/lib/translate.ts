// Translation service using Claude API

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

interface GlossaryEntry {
  source_term: string;
  target_term: string;
  source_language: string | null;
  target_language: string | null;
}

interface TranslationRequest {
  text: string;
  fromLang: string;
  toLang: string;
  context?: string; // e.g., "product title" or "product description"
  industry?: string;
  tone?: string;
  glossary?: GlossaryEntry[];
}

interface TranslationResult {
  translatedText: string;
  fromLang: string;
  toLang: string;
}

interface TranslateProductOptions {
  industry?: string;
  tone?: string;
  glossary?: GlossaryEntry[];
}

const LANGUAGE_NAMES: Record<string, string> = {
  de: 'German (Swiss)',
  fr: 'French (Swiss)',
  it: 'Italian (Swiss)',
  en: 'English',
};

const INDUSTRY_CONTEXT: Record<string, string> = {
  fashion: 'fashion and clothing (e.g., Tank = tank top, not military vehicle)',
  electronics: 'consumer electronics and technology',
  food: 'food and beverages',
  furniture: 'furniture and home decor',
  beauty: 'beauty and cosmetics',
  sports: 'sports and outdoor equipment',
  toys: 'toys and games',
  jewelry: 'jewelry and watches',
  automotive: 'automotive parts and accessories',
  health: 'health and wellness products',
  garden: 'garden and outdoor living',
  pet: 'pet supplies and accessories',
  office: 'office supplies and stationery',
  general: 'general retail products',
};

const TONE_INSTRUCTIONS: Record<string, string> = {
  formal: 'Use formal language (Sie/vous/Lei). Professional and respectful tone.',
  informal: 'Use informal language (du/tu/tu). Friendly and casual tone.',
  neutral: 'Use neutral language that works in both formal and informal contexts where possible.',
};

export async function translateText({
  text,
  fromLang,
  toLang,
  context = 'e-commerce product text',
  industry = 'general',
  tone = 'neutral',
  glossary = [],
}: TranslationRequest): Promise<TranslationResult> {
  if (!CLAUDE_API_KEY) {
    throw new Error('CLAUDE_API_KEY not configured');
  }

  const industryContext = INDUSTRY_CONTEXT[industry] || INDUSTRY_CONTEXT.general;
  const toneInstruction = TONE_INSTRUCTIONS[tone] || TONE_INSTRUCTIONS.neutral;

  // Build glossary section if entries exist
  let glossarySection = '';
  if (glossary && glossary.length > 0) {
    // Filter glossary entries relevant to this translation
    const relevantEntries = glossary.filter(entry => {
      const matchesSource = !entry.source_language || entry.source_language === fromLang;
      const matchesTarget = !entry.target_language || entry.target_language === toLang;
      return matchesSource && matchesTarget;
    });

    if (relevantEntries.length > 0) {
      glossarySection = `\n\nGLOSSARY - Use these exact translations for the following terms:\n${
        relevantEntries.map(e => `- "${e.source_term}" → "${e.target_term}"`).join('\n')
      }\n`;
    }
  }

  const systemPrompt = `You are a professional translator specializing in Swiss e-commerce.
Translate the following ${context} from ${LANGUAGE_NAMES[fromLang]} to ${LANGUAGE_NAMES[toLang]}.

INDUSTRY CONTEXT: This is a ${industryContext} shop. Use appropriate terminology for this industry.

TONE: ${toneInstruction}${glossarySection}

Important guidelines:
- Use Swiss German conventions if translating to German (e.g., "ss" instead of "ß", Swiss terminology)
- Use appropriate Swiss French/Italian formulations
- Keep product-specific terms accurate for the ${industry} industry
- Maintain the same tone and style as the original
- If there are prices, keep CHF as the currency
- Do not add any explanations, just provide the translation
- Keep formatting (line breaks, bullet points) if present
${glossary.length > 0 ? '- IMPORTANT: Always use the glossary translations for specified terms!' : ''}`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: text,
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Translation failed: ${error}`);
  }

  const data = await response.json();
  const translatedText = data.content[0].text;

  return {
    translatedText,
    fromLang,
    toLang,
  };
}

export async function translateProduct(
  product: { title: string; description?: string },
  fromLang: string,
  targetLangs: string[],
  options: TranslateProductOptions = {}
): Promise<Record<string, { title: string; description?: string }>> {
  const translations: Record<string, { title: string; description?: string }> = {};
  const { industry = 'general', tone = 'neutral', glossary = [] } = options;

  for (const toLang of targetLangs) {
    if (toLang === fromLang) continue;

    const titleResult = await translateText({
      text: product.title,
      fromLang,
      toLang,
      context: 'product title',
      industry,
      tone,
      glossary,
    });

    let descriptionResult;
    if (product.description) {
      descriptionResult = await translateText({
        text: product.description,
        fromLang,
        toLang,
        context: 'product description',
        industry,
        tone,
        glossary,
      });
    }

    translations[toLang] = {
      title: titleResult.translatedText,
      description: descriptionResult?.translatedText,
    };
  }

  return translations;
}

// Export available options for frontend
export const INDUSTRIES = [
  { value: 'fashion', label: 'Mode & Bekleidung' },
  { value: 'electronics', label: 'Elektronik & Technik' },
  { value: 'food', label: 'Lebensmittel & Getränke' },
  { value: 'furniture', label: 'Möbel & Einrichtung' },
  { value: 'beauty', label: 'Beauty & Kosmetik' },
  { value: 'sports', label: 'Sport & Outdoor' },
  { value: 'toys', label: 'Spielzeug & Spiele' },
  { value: 'jewelry', label: 'Schmuck & Uhren' },
  { value: 'automotive', label: 'Auto & Zubehör' },
  { value: 'health', label: 'Gesundheit & Wellness' },
  { value: 'garden', label: 'Garten & Outdoor' },
  { value: 'pet', label: 'Tierbedarf' },
  { value: 'office', label: 'Büro & Schreibwaren' },
  { value: 'general', label: 'Allgemein / Andere' },
];

export const TONES = [
  { value: 'formal', label: 'Formell (Sie/vous/Lei)' },
  { value: 'informal', label: 'Informell (du/tu/tu)' },
  { value: 'neutral', label: 'Neutral' },
];
