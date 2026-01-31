// FRESH REWRITE - 2026-01-31 12:49
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { translateProduct } from '@/lib/translate';

export async function POST(request: NextRequest) {
  // Version marker to verify deployment
  const VERSION = 'v2-fresh-2026-01-31';
  
  try {
    // Get env vars at runtime
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ 
        error: 'Missing environment variables',
        version: VERSION,
        debug: { urlExists: !!supabaseUrl, keyExists: !!supabaseAnonKey }
      }, { status: 500 });
    }

    // Get auth token
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No auth header', version: VERSION }, { status: 401 });
    }
    const token = authHeader.replace('Bearer ', '');

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    // Verify user
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: 'Auth failed', version: VERSION, details: authError?.message }, { status: 401 });
    }

    // Parse request
    const { productId, targetLanguages } = await request.json();
    if (!productId || !targetLanguages?.length) {
      return NextResponse.json({ error: 'Missing productId or targetLanguages', version: VERSION }, { status: 400 });
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

    // Translate
    const translations = await translateProduct(
      { title: product.original_title, description: product.original_description },
      product.original_language,
      targetLanguages
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

    return NextResponse.json({ success: true, version: VERSION, translations });

  } catch (error) {
    return NextResponse.json({ 
      error: 'Translation failed',
      version: VERSION,
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
