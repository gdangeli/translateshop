// CREDIT-BASED TRANSLATION - 2026-02-02
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { translateProduct } from '@/lib/translate';
import { hasEnoughCredits, deductCredits } from '@/lib/credits';

export async function POST(request: NextRequest) {
  const VERSION = 'translate2-credits-v1';

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceKey = process.env.SUPABASE_SERVICE_KEY || supabaseAnonKey;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({
        error: 'Missing env vars',
        version: VERSION
      }, { status: 500 });
    }

    // Auth check
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No auth', version: VERSION }, { status: 401 });
    }
    const token = authHeader.replace('Bearer ', '');

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user?.email) {
      return NextResponse.json({ error: 'Auth failed', version: VERSION }, { status: 401 });
    }

    // Parse request
    const { productId, targetLanguages, industry, tone } = await request.json();
    if (!productId || !targetLanguages?.length) {
      return NextResponse.json({ error: 'Missing params', version: VERSION }, { status: 400 });
    }

    // Get product
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .eq('user_id', user.id)
      .single();

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found', version: VERSION }, { status: 404 });
    }

    // Calculate required credits
    // Filter out languages that already exist or match original
    const existingTranslations = await supabase
      .from('translations')
      .select('language')
      .eq('product_id', productId);

    const existingLangs = new Set([
      product.original_language,
      ...(existingTranslations.data?.map(t => t.language) || [])
    ]);

    const langsToTranslate = targetLanguages.filter((lang: string) => !existingLangs.has(lang));

    if (langsToTranslate.length === 0) {
      return NextResponse.json({
        success: true,
        version: VERSION,
        message: 'Already translated',
        creditsUsed: 0
      });
    }

    // 1 Credit per language per product
    const requiredCredits = langsToTranslate.length;

    // Use service client for credits operations
    const serviceClient = createClient(supabaseUrl, serviceKey!);

    // Check credits
    const creditCheck = await hasEnoughCredits(serviceClient, user.email, requiredCredits);

    if (!creditCheck.hasEnough) {
      return NextResponse.json({
        error: 'Not enough credits',
        version: VERSION,
        current: creditCheck.current,
        required: requiredCredits,
        is_unlimited: creditCheck.is_unlimited
      }, { status: 402 }); // 402 Payment Required
    }

    // Load user's glossary (silently fail if table doesn't exist)
    let glossary: any[] = [];
    try {
      const { data: glossaryData } = await supabase
        .from('glossary')
        .select('source_term, target_term, source_language, target_language')
        .eq('user_id', user.id);
      
      if (glossaryData) {
        glossary = glossaryData;
      }
    } catch (e) {
      // Glossary table might not exist yet - continue without it
      console.log('Glossary not available:', e);
    }

    // Perform translation with industry, tone, and glossary context
    const translations = await translateProduct(
      { title: product.original_title, description: product.original_description },
      product.original_language,
      langsToTranslate,
      { industry: industry || 'general', tone: tone || 'neutral', glossary }
    );

    // Save translations
    for (const [lang, translation] of Object.entries(translations)) {
      await supabase.from('translations').upsert({
        product_id: productId,
        language: lang,
        title: translation.title,
        description: translation.description,
      }, { onConflict: 'product_id,language' });
    }

    // Deduct credits AFTER successful translation
    const deductResult = await deductCredits(serviceClient, user.email, requiredCredits);

    return NextResponse.json({
      success: true,
      version: VERSION,
      translations,
      creditsUsed: requiredCredits,
      creditsRemaining: deductResult.remaining,
      is_unlimited: creditCheck.is_unlimited
    });

  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json({
      error: 'Translation failed',
      version: VERSION,
      message: error instanceof Error ? error.message : 'Unknown'
    }, { status: 500 });
  }
}
