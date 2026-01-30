// Translation service using Claude API

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

interface TranslationRequest {
  text: string;
  fromLang: string;
  toLang: string;
  context?: string; // e.g., "product title" or "product description"
}

interface TranslationResult {
  translatedText: string;
  fromLang: string;
  toLang: string;
}

const LANGUAGE_NAMES: Record<string, string> = {
  de: 'German (Swiss)',
  fr: 'French (Swiss)',
  it: 'Italian (Swiss)',
  en: 'English',
};

export async function translateText({
  text,
  fromLang,
  toLang,
  context = 'e-commerce product text',
}: TranslationRequest): Promise<TranslationResult> {
  if (!CLAUDE_API_KEY) {
    throw new Error('CLAUDE_API_KEY not configured');
  }

  const systemPrompt = `You are a professional translator specializing in Swiss e-commerce. 
Translate the following ${context} from ${LANGUAGE_NAMES[fromLang]} to ${LANGUAGE_NAMES[toLang]}.

Important guidelines:
- Use Swiss German conventions if translating to German (e.g., "ss" instead of "ß")
- Use appropriate Swiss French/Italian formulations
- Keep product-specific terms accurate
- Maintain the same tone and style
- If there are prices, keep CHF as the currency
- Do not add any explanations, just provide the translation`;

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
  targetLangs: string[]
): Promise<Record<string, { title: string; description?: string }>> {
  const translations: Record<string, { title: string; description?: string }> = {};

  for (const toLang of targetLangs) {
    if (toLang === fromLang) continue;

    const titleResult = await translateText({
      text: product.title,
      fromLang,
      toLang,
      context: 'product title',
    });

    let descriptionResult;
    if (product.description) {
      descriptionResult = await translateText({
        text: product.description,
        fromLang,
        toLang,
        context: 'product description',
      });
    }

    translations[toLang] = {
      title: titleResult.translatedText,
      description: descriptionResult?.translatedText,
    };
  }

  return translations;
}
