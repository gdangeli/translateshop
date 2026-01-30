import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface CSVProduct {
  title: string;
  description?: string;
  [key: string]: string | undefined;
}

function parseCSV(csvText: string): CSVProduct[] {
  // Remove BOM if present
  const cleanedText = csvText.replace(/^\ufeff/, '').trim();
  
  // Handle both \r\n and \n line endings
  const lines = cleanedText.split(/\r?\n/);
  if (lines.length < 2) return [];

  // Detect delimiter (comma or semicolon)
  const firstLine = lines[0];
  const delimiter = firstLine.includes(';') ? ';' : ',';

  // Parse header (normalize to lowercase, remove quotes and whitespace)
  const headers = firstLine.split(delimiter).map(h => h.trim().toLowerCase().replace(/"/g, '').replace(/^\s+|\s+$/g, ''));
  
  // Find title and description columns
  const titleIndex = headers.findIndex(h => 
    h === 'title' || h === 'name' || h === 'titel' || h === 'produktname' || h === 'product_name'
  );
  const descIndex = headers.findIndex(h => 
    h === 'description' || h === 'beschreibung' || h === 'desc' || h === 'body' || h === 'body_html'
  );

  if (titleIndex === -1) {
    throw new Error('CSV must have a "title" or "name" column');
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

  return products;
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
    let products: CSVProduct[];
    
    try {
      products = parseCSV(csvText);
    } catch (parseError) {
      return NextResponse.json({ 
        error: parseError instanceof Error ? parseError.message : 'CSV parsing failed' 
      }, { status: 400 });
    }

    if (products.length === 0) {
      return NextResponse.json({ error: 'No valid products found in CSV' }, { status: 400 });
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
