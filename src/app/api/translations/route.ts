// API route to update translations
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function PUT(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    // Auth check
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.replace('Bearer ', '');

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request
    const { productId, translations } = await request.json();
    
    if (!productId || !translations) {
      return NextResponse.json({ error: 'Missing productId or translations' }, { status: 400 });
    }

    // Verify product belongs to user
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('id')
      .eq('id', productId)
      .eq('user_id', user.id)
      .single();

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Update each translation
    const results = [];
    for (const [language, data] of Object.entries(translations)) {
      const translationData = data as { title: string; description?: string };
      
      const { data: result, error } = await supabase
        .from('translations')
        .upsert({
          product_id: productId,
          language,
          title: translationData.title,
          description: translationData.description || null,
        }, { onConflict: 'product_id,language' })
        .select()
        .single();

      if (error) {
        console.error(`Error updating ${language}:`, error);
        results.push({ language, success: false, error: error.message });
      } else {
        results.push({ language, success: true, data: result });
      }
    }

    return NextResponse.json({
      success: true,
      results,
    });

  } catch (error) {
    console.error('Translation update error:', error);
    return NextResponse.json({
      error: 'Failed to update translations',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
