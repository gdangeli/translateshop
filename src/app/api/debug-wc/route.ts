// TEMPORARY DEBUG ENDPOINT - DELETE AFTER TESTING
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';

function normalizeUrl(url: string): string {
  let normalized = url.trim().replace(/\/$/, '');
  if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
    normalized = `https://${normalized}`;
  }
  return normalized;
}

export async function POST(request: NextRequest) {
  try {
    const { siteUrl, consumerKey, consumerSecret } = await request.json();
    
    const baseUrl = normalizeUrl(siteUrl);
    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    
    const response = await fetch(`${baseUrl}/wp-json/wc/v3/system_status`, {
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ 
        success: false, 
        status: response.status,
        error: text.substring(0, 500)
      });
    }

    const data = await response.json();
    return NextResponse.json({ 
      success: true, 
      siteUrl: data.environment?.home_url,
      version: data.environment?.version
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
