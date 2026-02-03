// Public API v1: Translate endpoint
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { extractApiKey, validateApiKey } from '@/lib/apiKeys';
import { translateProduct } from '@/lib/translate';
import { hasEnoughCredits, deductCredits } from '@/lib/credits';

export async function POST(request: NextRequest) {
  const VERSION = 'api-v1';

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceKey = process.env.SUPABASE_SERVICE_KEY || supabaseAnonKey;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    // Validate API key
    const apiKey = extractApiKey(request);
    if (!apiKey) {
      return NextResponse.json({
        error: 'API key required',
        hint: 'Include your API key in the Authorization header: Bearer ts_xxx',
      }, { status: 401 });
    }

    const serviceClient = createClient(supabaseUrl, serviceKey!);
    const validation = await validateApiKey(serviceClient, apiKey);

    if (!validation.valid) {
      return NextResponse.json({
        error: 'Invalid API key',
        details: validation.error,
      }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const {
      text,
      title,
      description,
      sourceLanguage = 'de',
      targetLanguages = ['fr', 'it', 'en'],
      industry = 'general',
      tone = 'neutral',
    } = body;

    // Validate input
    const textToTranslate = text || title;
    if (!textToTranslate) {
      return NextResponse.json({
        error: 'Missing required field: text or title',
        example: {
          title: 'Product Title',
          description: 'Product description (optional)',
          sourceLanguage: 'de',
          targetLanguages: ['fr', 'it', 'en'],
          industry: 'fashion',
          tone: 'informal',
        },
      }, { status: 400 });
    }

    // Filter target languages
    const validLangs = ['de', 'fr', 'it', 'en'];
    const filteredTargets = targetLanguages.filter(
      (lang: string) => validLangs.includes(lang) && lang !== sourceLanguage
    );

    if (filteredTargets.length === 0) {
      return NextResponse.json({
        error: 'No valid target languages',
        hint: 'Valid languages: de, fr, it, en',
      }, { status: 400 });
    }

    // Check credits
    const requiredCredits = filteredTargets.length;
    const creditCheck = await hasEnoughCredits(serviceClient, validation.email!, requiredCredits);

    if (!creditCheck.hasEnough) {
      return NextResponse.json({
        error: 'Insufficient credits',
        required: requiredCredits,
        available: creditCheck.current,
        is_unlimited: creditCheck.is_unlimited,
      }, { status: 402 });
    }

    // Load glossary (if available)
    let glossary: any[] = [];
    try {
      const { data: userData } = await serviceClient
        .from('profiles')
        .select('id')
        .eq('email', validation.email)
        .single();

      if (userData) {
        const { data: glossaryData } = await serviceClient
          .from('glossary')
          .select('source_term, target_term, source_language, target_language')
          .eq('user_id', userData.id);
        
        if (glossaryData) {
          glossary = glossaryData;
        }
      }
    } catch (e) {
      // Glossary not available - continue without it
    }

    // Perform translation
    const translations = await translateProduct(
      { title: textToTranslate, description: description || text ? undefined : body.description },
      sourceLanguage,
      filteredTargets,
      { industry, tone, glossary }
    );

    // Deduct credits
    const deductResult = await deductCredits(serviceClient, validation.email!, requiredCredits);

    return NextResponse.json({
      success: true,
      version: VERSION,
      source: {
        language: sourceLanguage,
        text: textToTranslate,
        description: description || undefined,
      },
      translations,
      credits: {
        used: requiredCredits,
        remaining: deductResult.remaining,
        is_unlimited: creditCheck.is_unlimited,
      },
    });

  } catch (error) {
    console.error('API translate error:', error);
    return NextResponse.json({
      error: 'Translation failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

// GET - API info
export async function GET() {
  return NextResponse.json({
    name: 'TranslateShop API v1',
    version: '1.0',
    endpoints: {
      'POST /api/v1/translate': 'Translate text or product',
      'GET /api/v1/credits': 'Check credit balance',
      'GET /api/v1/languages': 'List supported languages',
    },
    authentication: 'Bearer token (API key) in Authorization header',
    documentation: 'https://translateshop.ch/docs/api',
  });
}
