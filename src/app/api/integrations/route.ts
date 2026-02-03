// API routes for managing shop integrations
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { testShopifyConnection, fetchShopifyProducts } from '@/lib/integrations/shopify';
import { testWooCommerceConnection, fetchWooCommerceProducts } from '@/lib/integrations/woocommerce';

// GET - List user's integrations
export async function GET(request: NextRequest) {
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

    const { data: integrations, error } = await supabase
      .from('integrations')
      .select('id, platform, shop_name, shop_url, is_active, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      // Table might not exist
      if (error.code === '42P01') {
        return NextResponse.json({ integrations: [], tableNotExists: true });
      }
      throw error;
    }

    return NextResponse.json({ integrations: integrations || [] });

  } catch (error) {
    console.error('Integrations GET error:', error);
    return NextResponse.json({
      error: 'Failed to load integrations',
      message: error instanceof Error ? error.message : 'Unknown',
    }, { status: 500 });
  }
}

// POST - Add new integration
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

    const { platform, credentials } = await request.json();

    if (!platform || !credentials) {
      return NextResponse.json({ error: 'Platform and credentials required' }, { status: 400 });
    }

    // Test connection based on platform
    let testResult: { success: boolean; shopName?: string; error?: string };
    let shopUrl: string;

    if (platform === 'shopify') {
      shopUrl = credentials.shopUrl;
      testResult = await testShopifyConnection({
        shopUrl: credentials.shopUrl,
        accessToken: credentials.accessToken,
      });
    } else if (platform === 'woocommerce') {
      shopUrl = credentials.siteUrl;
      testResult = await testWooCommerceConnection({
        siteUrl: credentials.siteUrl,
        consumerKey: credentials.consumerKey,
        consumerSecret: credentials.consumerSecret,
      });
    } else {
      return NextResponse.json({ error: 'Unsupported platform' }, { status: 400 });
    }

    if (!testResult.success) {
      return NextResponse.json({
        error: 'Connection test failed',
        details: testResult.error,
      }, { status: 400 });
    }

    // Store integration (credentials are stored encrypted in a separate table or as JSON)
    const { data: integration, error } = await supabase
      .from('integrations')
      .insert({
        user_id: user.id,
        platform,
        shop_name: testResult.shopName || shopUrl,
        shop_url: shopUrl,
        credentials_encrypted: JSON.stringify(credentials), // In production, encrypt this!
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      integration: {
        id: integration.id,
        platform: integration.platform,
        shop_name: integration.shop_name,
        shop_url: integration.shop_url,
        is_active: integration.is_active,
      },
    });

  } catch (error) {
    console.error('Integration POST error:', error);
    return NextResponse.json({
      error: 'Failed to add integration',
      message: error instanceof Error ? error.message : 'Unknown',
    }, { status: 500 });
  }
}

// DELETE - Remove integration
export async function DELETE(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const integrationId = searchParams.get('id');

    if (!integrationId) {
      return NextResponse.json({ error: 'Integration ID required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('integrations')
      .delete()
      .eq('id', integrationId)
      .eq('user_id', user.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Integration DELETE error:', error);
    return NextResponse.json({
      error: 'Failed to delete integration',
      message: error instanceof Error ? error.message : 'Unknown',
    }, { status: 500 });
  }
}
