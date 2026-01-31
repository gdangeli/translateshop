import { NextResponse } from 'next/server';

export async function GET() {
  const timestamp = '2026-01-31T12:45:00Z';
  return NextResponse.json({
    status: 'ok',
    deployedAt: timestamp,
    envVars: {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 20),
      supabaseKeyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length,
      claudeKeyExists: !!process.env.CLAUDE_API_KEY,
    }
  });
}
