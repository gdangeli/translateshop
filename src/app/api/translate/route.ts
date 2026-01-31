import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { translateProduct } from '@/lib/translate';

export async function POST(request: NextRequest) {
  try {
    // Debug: Log all SUPABASE env vars
    const allEnvKeys = Object.keys(process.env).filter(k => k.includes('SUPABASE') || k.includes('NEXT_PUBLIC'));
    console.log('Available env keys:', allEnvKeys);
    
    // Read env vars at runtime (not build time)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    console.log('Env var check:', { 
      urlExists: !!supabaseUrl, 
      urlLength: supabaseUrl?.length,
      keyExists: !!supabaseAnonKey,
      keyLength: supabaseAnonKey?.length 
    });
    
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ 
        error: 'Server configuration error',
        debug: { urlExists: !!supabaseUrl, keyExists: !!supabaseAnonKey, availableKeys: allEnvKeys }
      }, { status: 500 });
    }

    // Get auth token from header
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Create Supabase client with anon key, then authenticate with user's token
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get request body
    const { productId, targetLanguages } = await request.json();

    if (!productId || !targetLanguages || targetLanguages.length === 0) {
      return NextResponse.json({ error: 'Missing productId or targetLanguages' }, { status: 400 });
    }

    // Fetch product
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .eq('user_id', user.id)
      .single();

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Translate
    const translations = await translateProduct(
      {
        title: product.original_title,
        description: product.original_description,
      },
      product.original_language,
      targetLanguages
    );

    // Save translations to database
    for (const [lang, translation] of Object.entries(translations)) {
      await supabase.from('translations').upsert({
        product_id: productId,
        language: lang,
        title: translation.title,
        description: translation.description,
      }, {
        onConflict: 'product_id,language',
      });
    }

    return NextResponse.json({ 
      success: true, 
      translations 
    });

  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json({ 
      error: 'Translation failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack?.split('\n').slice(0, 5) : undefined
    }, { status: 500 });
  }
}
