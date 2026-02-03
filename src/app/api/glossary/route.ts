// API routes for glossary management
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// GET - List user's glossary entries
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

    const { data: entries, error } = await supabase
      .from('glossary')
      .select('*')
      .eq('user_id', user.id)
      .order('source_term', { ascending: true });

    if (error) {
      // Table might not exist yet
      if (error.code === '42P01') {
        return NextResponse.json({ entries: [], tableNotExists: true });
      }
      throw error;
    }

    return NextResponse.json({ entries: entries || [] });

  } catch (error) {
    console.error('Glossary GET error:', error);
    return NextResponse.json({
      error: 'Failed to load glossary',
      message: error instanceof Error ? error.message : 'Unknown',
    }, { status: 500 });
  }
}

// POST - Add new glossary entry
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

    const { sourceTerm, targetTerm, sourceLanguage, targetLanguage } = await request.json();

    if (!sourceTerm || !targetTerm) {
      return NextResponse.json({ error: 'Source and target terms required' }, { status: 400 });
    }

    const { data: entry, error } = await supabase
      .from('glossary')
      .insert({
        user_id: user.id,
        source_term: sourceTerm.trim(),
        target_term: targetTerm.trim(),
        source_language: sourceLanguage || null,
        target_language: targetLanguage || null,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, entry });

  } catch (error) {
    console.error('Glossary POST error:', error);
    return NextResponse.json({
      error: 'Failed to add glossary entry',
      message: error instanceof Error ? error.message : 'Unknown',
    }, { status: 500 });
  }
}

// DELETE - Remove glossary entry
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
    const entryId = searchParams.get('id');

    if (!entryId) {
      return NextResponse.json({ error: 'Entry ID required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('glossary')
      .delete()
      .eq('id', entryId)
      .eq('user_id', user.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Glossary DELETE error:', error);
    return NextResponse.json({
      error: 'Failed to delete glossary entry',
      message: error instanceof Error ? error.message : 'Unknown',
    }, { status: 500 });
  }
}
