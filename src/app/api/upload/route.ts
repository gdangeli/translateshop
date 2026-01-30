import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface CSVProduct {
  title: string;
  description?: string;
  [key: string]: string | undefined;
}

interface ParseResult {
  products: CSVProduct[];
  debug: {
    cleanedTextStart: string;
    lineCount: number;
    delimiter: string;
    headers: string[];
    headerCharCodes: number[][];
    titleIndex: number;
    descIndex: number;
  };
}

function parseCSVWithDebug(csvText: string): ParseResult {
  // Remove BOM if present (various BOM types)
  const cleanedText = csvText
    .replace(/^\ufeff/, '')  // UTF-8 BOM
    .replace(/^\xef\xbb\xbf/, '')  // UTF-8 BOM as bytes
    .replace(/^\ufffe/, '')  // UTF-16 LE BOM
    .replace(/^\xfe\xff/, '')  // UTF-16 BE BOM
    .trim();
  
  // Handle both \r\n and \n line endings
  const lines = cleanedText.split(/\r?\n/).filter(line => line.trim());
  
  // Detect delimiter (comma or semicolon)
  const firstLine = lines[0] || '';
  const delimiter = firstLine.includes(';') ? ';' : ',';

  // Parse header (normalize to lowercase, remove quotes and whitespace)
  const headers = firstLine.split(delimiter).map(h => h.trim().toLowerCase().replace(/"/g, ''));
  
  // Debug: Get char codes for headers
  const headerCharCodes = headers.map(h => Array.from(h).map(c => c.charCodeAt(0)));
  
  // Find title and description columns - more flexible matching
  const titleIndex = headers.findIndex(h => 
    h === 'title' || h === 'name' || h === 'titel' || h === 'produktname' || h === 'product_name' ||
    h.includes('title') || h.includes('titel') || h.includes('name')
  );
  const descIndex = headers.findIndex(h => 
    h === 'description' || h === 'beschreibung' || h === 'desc' || h === 'body' || h === 'body_html' ||
    h.includes('desc') || h.includes('beschreib')
  );

  const debug = {
    cleanedTextStart: cleanedText.substring(0, 100),
    lineCount: lines.length,
    delimiter,
    headers,
    headerCharCodes,
    titleIndex,
    descIndex,
  };

  if (titleIndex === -1) {
    throw new Error(`CSV must have a "title" or "name" column. Found headers: ${JSON.stringify(headers)}`);
  }

  // Parse rows
  const products: CSVProduct[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i], delimiter);
    if (values.length > titleIndex && values[titleIndex].trim()) {
      products.push({
        title: values[titleIndex].trim(),
        description: descIndex !== -1 ? values[descIndex]?.trim() : undefined,
      });
    }
  }

  return { products, debug };
}

function parseCSVLine(line: string, delimiter: string = ','): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === delimiter && !inQuotes) {
      result.push(current.replace(/^"|"$/g, ''));
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.replace(/^"|"$/g, ''));

  return result;
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Create Supabase client with user's access token
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized', details: authError?.message }, { status: 401 });
    }

    // Get user's profile to check limits
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('products_limit')
      .eq('id', user.id)
      .single();

    // If no profile exists yet, use default limit
    const limit = profile?.products_limit || 50;

    // Count existing products
    const { count: existingCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const language = formData.get('language') as string || 'de';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const csvText = await file.text();
    
    // Debug: Log first 500 chars of CSV
    console.log('CSV Content (first 500 chars):', csvText.substring(0, 500));
    console.log('CSV char codes (first 20):', Array.from(csvText.substring(0, 20)).map(c => c.charCodeAt(0)));
    
    let products: CSVProduct[];
    let debugInfo: any = {};
    
    try {
      const result = parseCSVWithDebug(csvText);
      products = result.products;
      debugInfo = result.debug;
    } catch (parseError) {
      return NextResponse.json({ 
        error: parseError instanceof Error ? parseError.message : 'CSV parsing failed',
        debug: debugInfo
      }, { status: 400 });
    }

    if (products.length === 0) {
      return NextResponse.json({ error: 'No valid products found in CSV', debug: debugInfo }, { status: 400 });
    }

    // Check limit
    const totalAfterUpload = (existingCount || 0) + products.length;
    
    if (totalAfterUpload > limit) {
      return NextResponse.json({ 
        error: `Product limit exceeded. You can add ${limit - (existingCount || 0)} more products.`,
        limit,
        current: existingCount,
        trying: products.length,
      }, { status: 400 });
    }

    // Insert products
    const { data: insertedProducts, error: insertError } = await supabase
      .from('products')
      .insert(
        products.map(p => ({
          user_id: user.id,
          original_language: language,
          original_title: p.title,
          original_description: p.description,
        }))
      )
      .select();

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json({ 
        error: 'Failed to save products',
        details: insertError.message 
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      count: insertedProducts?.length || 0,
      products: insertedProducts,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Upload failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
