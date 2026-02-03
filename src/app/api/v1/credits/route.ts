// Public API v1: Credits endpoint
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { extractApiKey, validateApiKey } from '@/lib/apiKeys';

export async function GET(request: NextRequest) {
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

    // Get credits
    const { data: credits, error } = await serviceClient
      .from('credits')
      .select('credits, is_unlimited')
      .eq('email', validation.email)
      .single();

    if (error) {
      // No credits entry = new user with default credits
      return NextResponse.json({
        credits: 50, // Default for new users
        is_unlimited: false,
        email: validation.email,
      });
    }

    return NextResponse.json({
      credits: credits.credits,
      is_unlimited: credits.is_unlimited,
      email: validation.email,
    });

  } catch (error) {
    console.error('API credits error:', error);
    return NextResponse.json({
      error: 'Failed to get credits',
      message: error instanceof Error ? error.message : 'Unknown',
    }, { status: 500 });
  }
}
