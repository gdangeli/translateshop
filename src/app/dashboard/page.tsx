'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import CSVUpload from '@/components/CSVUpload';

interface Profile {
  email: string;
  company_name: string | null;
  plan: string;
  products_limit: number;
}

interface Product {
  id: string;
  original_title: string;
  original_description: string | null;
  original_language: string;
  created_at: string;
  translations: Translation[];
}

interface Translation {
  language: string;
  title: string;
  description: string | null;
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [translating, setTranslating] = useState<string | null>(null);
  const router = useRouter();

  const loadData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push('/login');
      return;
    }

    // Get profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    // Get products with translations
    const { data: productsData } = await supabase
      .from('products')
      .select(`
        *,
        translations (*)
      `)
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    setProfile(profileData);
    setProducts(productsData || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleTranslate = async (productId: string) => {
    setTranslating(productId);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          productId,
          targetLanguages: ['de', 'fr', 'it', 'en'],
        }),
      });

      if (response.ok) {
        await loadData(); // Reload to show translations
      }
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      setTranslating(null);
    }
  };

  const handleExportCSV = () => {
    // Create CSV content
    let csv = 'original_title,original_description,de_title,de_description,fr_title,fr_description,it_title,it_description,en_title,en_description\n';
    
    for (const product of products) {
      const getTranslation = (lang: string) => 
        product.translations?.find(t => t.language === lang);
      
      const de = getTranslation('de');
      const fr = getTranslation('fr');
      const it = getTranslation('it');
      const en = getTranslation('en');

      csv += [
        `"${product.original_title?.replace(/"/g, '""') || ''}"`,
        `"${product.original_description?.replace(/"/g, '""') || ''}"`,
        `"${de?.title?.replace(/"/g, '""') || ''}"`,
        `"${de?.description?.replace(/"/g, '""') || ''}"`,
        `"${fr?.title?.replace(/"/g, '""') || ''}"`,
        `"${fr?.description?.replace(/"/g, '""') || ''}"`,
        `"${it?.title?.replace(/"/g, '""') || ''}"`,
        `"${it?.description?.replace(/"/g, '""') || ''}"`,
        `"${en?.title?.replace(/"/g, '""') || ''}"`,
        `"${en?.description?.replace(/"/g, '""') || ''}"`,
      ].join(',') + '\n';
    }

    // Download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'translations.csv';
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-slate-600">Laden...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-slate-800">
            🌐 TranslateShop<span className="text-red-600">.ch</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-600">{profile?.email}</span>
            <button onClick={handleLogout} className="text-slate-500 hover:text-slate-700">
              Abmelden
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome & Stats */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Willkommen{profile?.company_name ? `, ${profile.company_name}` : ''}! 👋
            </h1>
            <p className="text-slate-600 mt-2">
              Plan: <span className="font-semibold capitalize">{profile?.plan || 'Free'}</span> — 
              {products.length} / {profile?.products_limit || 50} Produkte
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowUpload(true)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              + CSV hochladen
            </button>
            {products.length > 0 && (
              <button
                onClick={handleExportCSV}
                className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition"
              >
                📥 Export
              </button>
            )}
          </div>
        </div>

        {/* Upload Modal */}
        {showUpload && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Produkte hochladen</h2>
                <button onClick={() => setShowUpload(false)} className="text-slate-400 hover:text-slate-600">
                  ✕
                </button>
              </div>
              <CSVUpload onUploadComplete={() => { setShowUpload(false); loadData(); }} />
            </div>
          </div>
        )}

        {/* Products List */}
        {products.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-xl font-semibold mb-2">Noch keine Produkte</h2>
            <p className="text-slate-600 mb-6">
              Laden Sie Ihre erste CSV-Datei hoch, um zu starten.
            </p>
            <button 
              onClick={() => setShowUpload(true)}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              CSV hochladen
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-600">Produkt</th>
                  <th className="text-center p-4 font-semibold text-slate-600">DE</th>
                  <th className="text-center p-4 font-semibold text-slate-600">FR</th>
                  <th className="text-center p-4 font-semibold text-slate-600">IT</th>
                  <th className="text-center p-4 font-semibold text-slate-600">EN</th>
                  <th className="text-right p-4 font-semibold text-slate-600">Aktion</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const hasLang = (lang: string) => 
                    product.original_language === lang || 
                    product.translations?.some(t => t.language === lang);

                  return (
                    <tr key={product.id} className="border-b last:border-0">
                      <td className="p-4">
                        <div className="font-medium text-slate-800">{product.original_title}</div>
                        {product.original_description && (
                          <div className="text-sm text-slate-500 truncate max-w-md">
                            {product.original_description}
                          </div>
                        )}
                      </td>
                      <td className="text-center p-4">
                        {hasLang('de') ? '✅' : '—'}
                      </td>
                      <td className="text-center p-4">
                        {hasLang('fr') ? '✅' : '—'}
                      </td>
                      <td className="text-center p-4">
                        {hasLang('it') ? '✅' : '—'}
                      </td>
                      <td className="text-center p-4">
                        {hasLang('en') ? '✅' : '—'}
                      </td>
                      <td className="text-right p-4">
                        <button
                          onClick={() => handleTranslate(product.id)}
                          disabled={translating === product.id}
                          className="text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
                        >
                          {translating === product.id ? 'Übersetze...' : 'Übersetzen'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
