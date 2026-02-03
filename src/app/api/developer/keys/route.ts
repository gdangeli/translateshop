// API Key management endpoints
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateApiKey, hashApiKey } from '@/lib/apiKeys';

// GET - List user's API keys
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

    const { data: keys, error } = await supabase
      .from('api_keys')
      .select('id, name, key_prefix, is_active, created_at, last_used_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      if (error.code === '42P01') {
        return NextResponse.json({ keys: [], tableNotExists: true });
      }
      throw error;
    }

    return NextResponse.json({ keys: keys || [] });

  } catch (error) {
    console.error('API Keys GET error:', error);
    return NextResponse.json({
      error: 'Failed to load API keys',
      message: error instanceof Error ? error.message : 'Unknown',
    }, { status: 500 });
  }
}

// POST - Create new API key
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

    const { name } = await request.json();

    // Generate new API key
    const apiKey = generateApiKey();
    const keyHash = hashApiKey(apiKey);
    const keyPrefix = apiKey.substring(0, 10) + '...'; // Show first 10 chars

    const { data: newKey, error } = await supabase
      .from('api_keys')
      .insert({
        user_id: user.id,
        name: name || 'API Key',
        key_hash: keyHash,
        key_prefix: keyPrefix,
        is_active: true,
      })
      .select('id, name, key_prefix, created_at')
      .single();

    if (error) {
      throw error;
    }

    // Return the full key ONLY on creation (it's never stored/shown again)
    return NextResponse.json({
      success: true,
      key: {
        ...newKey,
        apiKey, // Full key - only shown once!
      },
      warning: 'Speichern Sie diesen API-Key sicher! Er wird nur einmal angezeigt.',
    });

  } catch (error) {
    console.error('API Key POST error:', error);
    return NextResponse.json({
      error: 'Failed to create API key',
      message: error instanceof Error ? error.message : 'Unknown',
    }, { status: 500 });
  }
}

// DELETE - Revoke API key
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
    const keyId = searchParams.get('id');

    if (!keyId) {
      return NextResponse.json({ error: 'Key ID required' }, { status: 400 });
    }

    // Soft delete (deactivate) instead of hard delete
    const { error } = await supabase
      .from('api_keys')
      .update({ is_active: false })
      .eq('id', keyId)
      .eq('user_id', user.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('API Key DELETE error:', error);
    return NextResponse.json({
      error: 'Failed to revoke API key',
      message: error instanceof Error ? error.message : 'Unknown',
    }, { status: 500 });
  }
}
