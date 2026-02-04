// Force Node.js runtime for Buffer support
export const runtime = 'nodejs';

// API route to sync translations back to connected shops
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { updateWooCommerceProduct } from '@/lib/integrations/woocommerce';
import { updateShopifyProduct } from '@/lib/integrations/shopify';

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

    const { productId, targetLanguage } = await request.json();

    if (!productId || !targetLanguage) {
      return NextResponse.json({ 
        error: 'productId and targetLanguage required' 
      }, { status: 400 });
    }

    // Get the product with translations
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .eq('user_id', user.id)
      .single();

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Check if product has external connection
    if (!product.external_id || !product.integration_id) {
      return NextResponse.json({ 
        error: 'Product is not connected to an external shop',
        hint: 'Only imported products can be synced back'
      }, { status: 400 });
    }

    // Get the translation
    const { data: translation, error: translationError } = await supabase
      .from('translations')
      .select('*')
      .eq('product_id', productId)
      .eq('language', targetLanguage)
      .single();

    if (translationError || !translation) {
      return NextResponse.json({ 
        error: `No ${targetLanguage.toUpperCase()} translation found for this product`,
        hint: 'Please translate the product first'
      }, { status: 404 });
    }

    // Get the integration credentials
    const { data: integration, error: integrationError } = await supabase
      .from('integrations')
      .select('*')
      .eq('id', product.integration_id)
      .eq('user_id', user.id)
      .single();

    if (integrationError || !integration) {
      return NextResponse.json({ error: 'Integration not found' }, { status: 404 });
    }

    const credentials = JSON.parse(integration.credentials_encrypted);
    let syncResult: { success: boolean; error?: string };

    // Sync based on platform
    if (integration.platform === 'woocommerce') {
      // For WooCommerce, we update meta_data with translations
      // This works with WPML/Polylang or can be read by themes
      syncResult = await updateWooCommerceProduct(
        {
          siteUrl: credentials.siteUrl,
          consumerKey: credentials.consumerKey,
          consumerSecret: credentials.consumerSecret,
        },
        product.external_id,
        {
          meta_data: [
            { key: `_title_${targetLanguage}`, value: translation.translated_title },
            { key: `_description_${targetLanguage}`, value: translation.translated_description },
            { key: '_translateshop_synced', value: new Date().toISOString() },
            { key: '_translateshop_languages', value: targetLanguage },
          ],
        }
      );
    } else if (integration.platform === 'shopify') {
      // For Shopify, update metafields
      syncResult = await updateShopifyProduct(
        {
          shopUrl: credentials.shopUrl,
          accessToken: credentials.accessToken,
        },
        product.external_id,
        {
          metafields: [
            {
              namespace: 'translateshop',
              key: `title_${targetLanguage}`,
              value: translation.translated_title,
              type: 'single_line_text_field',
            },
            {
              namespace: 'translateshop',
              key: `description_${targetLanguage}`,
              value: translation.translated_description || '',
              type: 'multi_line_text_field',
            },
          ],
        }
      );
    } else {
      return NextResponse.json({ error: 'Unsupported platform' }, { status: 400 });
    }

    if (!syncResult.success) {
      return NextResponse.json({
        error: 'Sync failed',
        details: syncResult.error,
      }, { status: 500 });
    }

    // Update translation record to mark as synced
    await supabase
      .from('translations')
      .update({ 
        synced_at: new Date().toISOString(),
        sync_status: 'synced'
      })
      .eq('id', translation.id);

    return NextResponse.json({
      success: true,
      message: `Translation synced to ${integration.platform}`,
      platform: integration.platform,
      language: targetLanguage,
      productId: product.external_id,
    });

  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json({
      error: 'Sync failed',
      message: error instanceof Error ? error.message : 'Unknown',
    }, { status: 500 });
  }
}

// Bulk sync - sync all translations for a product
export async function PUT(request: NextRequest) {
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

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: 'productId required' }, { status: 400 });
    }

    // Get product
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .eq('user_id', user.id)
      .single();

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    if (!product.external_id || !product.integration_id) {
      return NextResponse.json({ 
        error: 'Product is not connected to an external shop'
      }, { status: 400 });
    }

    // Get all translations
    const { data: translations, error: translationsError } = await supabase
      .from('translations')
      .select('*')
      .eq('product_id', productId);

    if (translationsError || !translations || translations.length === 0) {
      return NextResponse.json({ 
        error: 'No translations found for this product'
      }, { status: 404 });
    }

    // Get integration
    const { data: integration, error: integrationError } = await supabase
      .from('integrations')
      .select('*')
      .eq('id', product.integration_id)
      .eq('user_id', user.id)
      .single();

    if (integrationError || !integration) {
      return NextResponse.json({ error: 'Integration not found' }, { status: 404 });
    }

    const credentials = JSON.parse(integration.credentials_encrypted);
    const results: { language: string; success: boolean; error?: string }[] = [];

    // Sync each translation
    for (const translation of translations) {
      let syncResult: { success: boolean; error?: string };

      if (integration.platform === 'woocommerce') {
        syncResult = await updateWooCommerceProduct(
          {
            siteUrl: credentials.siteUrl,
            consumerKey: credentials.consumerKey,
            consumerSecret: credentials.consumerSecret,
          },
          product.external_id,
          {
            meta_data: [
              { key: `_title_${translation.language}`, value: translation.translated_title },
              { key: `_description_${translation.language}`, value: translation.translated_description },
            ],
          }
        );
      } else if (integration.platform === 'shopify') {
        syncResult = await updateShopifyProduct(
          {
            shopUrl: credentials.shopUrl,
            accessToken: credentials.accessToken,
          },
          product.external_id,
          {
            metafields: [
              {
                namespace: 'translateshop',
                key: `title_${translation.language}`,
                value: translation.translated_title,
                type: 'single_line_text_field',
              },
              {
                namespace: 'translateshop',
                key: `description_${translation.language}`,
                value: translation.translated_description || '',
                type: 'multi_line_text_field',
              },
            ],
          }
        );
      } else {
        syncResult = { success: false, error: 'Unsupported platform' };
      }

      results.push({
        language: translation.language,
        success: syncResult.success,
        error: syncResult.error,
      });

      if (syncResult.success) {
        await supabase
          .from('translations')
          .update({ 
            synced_at: new Date().toISOString(),
            sync_status: 'synced'
          })
          .eq('id', translation.id);
      }
    }

    const successCount = results.filter(r => r.success).length;

    return NextResponse.json({
      success: successCount > 0,
      message: `${successCount}/${results.length} translations synced`,
      results,
    });

  } catch (error) {
    console.error('Bulk sync error:', error);
    return NextResponse.json({
      error: 'Bulk sync failed',
      message: error instanceof Error ? error.message : 'Unknown',
    }, { status: 500 });
  }
}
