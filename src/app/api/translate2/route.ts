// NEW ROUTE to bypass caching - 2026-01-31 12:56
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { translateProduct } from '@/lib/translate';

export async function POST(request: NextRequest) {
  const VERSION = 'translate2-v1';
  
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ 
        error: 'Missing env vars',
        version: VERSION
      }, { status: 500 });
    }

    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No auth', version: VERSION }, { status: 401 });
    }
    const token = authHeader.replace('Bearer ', '');

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: 'Auth failed', version: VERSION }, { status: 401 });
    }

    const { productId, targetLanguages } = await request.json();
    if (!productId || !targetLanguages?.length) {
      return NextResponse.json({ error: 'Missing params', version: VERSION }, { status: 400 });
    }

    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .eq('user_id', user.id)
      .single();

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found', version: VERSION }, { status: 404 });
    }

    const translations = await translateProduct(
      { title: product.original_title, description: product.original_description },
      product.original_language,
      targetLanguages
    );

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
      error: 'Failed',
      version: VERSION,
      message: error instanceof Error ? error.message : 'Unknown'
    }, { status: 500 });
  }
}
