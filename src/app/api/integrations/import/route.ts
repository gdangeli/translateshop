// API route to import products from connected shops
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { fetchShopifyProducts } from '@/lib/integrations/shopify';
import { fetchWooCommerceProducts } from '@/lib/integrations/woocommerce';

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

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

    const { integrationId, language } = await request.json();

    if (!integrationId) {
      return NextResponse.json({ error: 'Integration ID required' }, { status: 400 });
    }

    // Get integration with credentials
    const { data: integration, error: integrationError } = await supabase
      .from('integrations')
      .select('*')
      .eq('id', integrationId)
      .eq('user_id', user.id)
      .single();

    if (integrationError || !integration) {
      return NextResponse.json({ error: 'Integration not found' }, { status: 404 });
    }

    // Parse credentials
    const credentials = JSON.parse(integration.credentials_encrypted);

    // Fetch products based on platform
    let fetchResult: { products: any[]; error?: string };

    if (integration.platform === 'shopify') {
      fetchResult = await fetchShopifyProducts({
        shopUrl: credentials.shopUrl,
        accessToken: credentials.accessToken,
      });
    } else if (integration.platform === 'woocommerce') {
      fetchResult = await fetchWooCommerceProducts({
        siteUrl: credentials.siteUrl,
        consumerKey: credentials.consumerKey,
        consumerSecret: credentials.consumerSecret,
      });
    } else {
      return NextResponse.json({ error: 'Unsupported platform' }, { status: 400 });
    }

    if (fetchResult.error) {
      return NextResponse.json({
        error: 'Failed to fetch products',
        details: fetchResult.error,
      }, { status: 500 });
    }

    if (fetchResult.products.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No products found',
        imported: 0,
      });
    }

    // Import products to our database
    const productsToInsert = fetchResult.products.map(p => ({
      user_id: user.id,
      original_language: language || 'de',
      original_title: p.title,
      original_description: p.description || null,
      external_id: p.externalId,
      external_platform: integration.platform,
      integration_id: integration.id,
    }));

    // Check for duplicates (by external_id and platform)
    const existingProducts = await supabase
      .from('products')
      .select('external_id')
      .eq('user_id', user.id)
      .eq('external_platform', integration.platform)
      .in('external_id', productsToInsert.map(p => p.external_id));

    const existingIds = new Set(existingProducts.data?.map(p => p.external_id) || []);
    const newProducts = productsToInsert.filter(p => !existingIds.has(p.external_id));

    if (newProducts.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'All products already imported',
        imported: 0,
        skipped: productsToInsert.length,
      });
    }

    const { data: insertedProducts, error: insertError } = await supabase
      .from('products')
      .insert(newProducts)
      .select();

    if (insertError) {
      // Check if it's because columns don't exist
      if (insertError.message.includes('external_id') || insertError.message.includes('external_platform')) {
        // Fall back to basic insert without external fields
        const basicProducts = newProducts.map(({ external_id, external_platform, integration_id, ...rest }) => rest);
        
        const { data: basicInserted, error: basicError } = await supabase
          .from('products')
          .insert(basicProducts)
          .select();

        if (basicError) throw basicError;

        return NextResponse.json({
          success: true,
          imported: basicInserted?.length || 0,
          skipped: existingIds.size,
          note: 'Imported without external tracking (DB migration needed)',
        });
      }
      throw insertError;
    }

    return NextResponse.json({
      success: true,
      imported: insertedProducts?.length || 0,
      skipped: existingIds.size,
    });

  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json({
      error: 'Import failed',
      message: error instanceof Error ? error.message : 'Unknown',
    }, { status: 500 });
  }
}
