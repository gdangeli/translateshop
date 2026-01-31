// Minimal Supabase test - 2026-01-31 13:08
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const version = 'test-v1';
  
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!url || !key) {
      return NextResponse.json({ 
        version,
        error: 'Missing env vars',
        urlExists: !!url,
        keyExists: !!key
      });
    }
    
    // Try to create client
    const client = createClient(url, key);
    
    // Try a simple query
    const { data, error } = await client.from('profiles').select('count').limit(1);
    
    return NextResponse.json({
      version,
      success: true,
      clientCreated: true,
      queryResult: error ? error.message : 'OK',
      urlLength: url.length,
      keyLength: key.length
    });
    
  } catch (err) {
    return NextResponse.json({
      version,
      error: err instanceof Error ? err.message : 'Unknown',
      stack: err instanceof Error ? err.stack?.split('\n')[0] : undefined
    });
  }
}
