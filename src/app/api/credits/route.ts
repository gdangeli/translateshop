import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getUserCredits } from '@/lib/credits';

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: 'Missing env vars' }, { status: 500 });
    }

    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No auth' }, { status: 401 });
    }
    const token = authHeader.replace('Bearer ', '');

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user?.email) {
      return NextResponse.json({ error: 'Auth failed' }, { status: 401 });
    }

    // Use service client for credits table (bypass RLS for insert)
    const serviceKey = process.env.SUPABASE_SERVICE_KEY || supabaseAnonKey;
    const serviceClient = createClient(supabaseUrl, serviceKey);

    const credits = await getUserCredits(serviceClient, user.email);

    return NextResponse.json(credits);

  } catch (error) {
    console.error('Credits fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch credits' }, { status: 500 });
  }
}
