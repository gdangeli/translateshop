'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import CSVUpload from '@/components/CSVUpload';
import CreditsDisplay from '@/components/CreditsDisplay';

// Translation settings options
const INDUSTRIES = [
  { value: 'fashion', label: 'Mode & Bekleidung' },
  { value: 'electronics', label: 'Elektronik & Technik' },
  { value: 'food', label: 'Lebensmittel & Getränke' },
  { value: 'furniture', label: 'Möbel & Einrichtung' },
  { value: 'beauty', label: 'Beauty & Kosmetik' },
  { value: 'sports', label: 'Sport & Outdoor' },
  { value: 'toys', label: 'Spielzeug & Spiele' },
  { value: 'jewelry', label: 'Schmuck & Uhren' },
  { value: 'automotive', label: 'Auto & Zubehör' },
  { value: 'health', label: 'Gesundheit & Wellness' },
  { value: 'garden', label: 'Garten & Outdoor' },
  { value: 'pet', label: 'Tierbedarf' },
  { value: 'office', label: 'Büro & Schreibwaren' },
  { value: 'general', label: 'Allgemein / Andere' },
];

const TONES = [
  { value: 'formal', label: 'Formell (Sie/vous/Lei)' },
  { value: 'informal', label: 'Informell (du/tu/tu)' },
  { value: 'neutral', label: 'Neutral' },
];

interface Profile {
  email: string;
  company_name: string | null;
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

interface Credits {
  credits: number;
  is_unlimited: boolean;
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [credits, setCredits] = useState<Credits>({ credits: 0, is_unlimited: false });
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [translating, setTranslating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [industry, setIndustry] = useState('general');
  const [tone, setTone] = useState('neutral');
  const [showSettings, setShowSettings] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editedTranslations, setEditedTranslations] = useState<Record<string, { title: string; description: string }>>({});
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const LANGUAGES = [
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  const loadData = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      router.push('/login');
      return;
    }

    // Get profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('email, company_name')
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

    // Get credits
    try {
      const creditsRes = await fetch('/api/credits', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (creditsRes.ok) {
        const creditsData = await creditsRes.json();
        setCredits(creditsData);
      }
    } catch (e) {
      console.error('Failed to fetch credits:', e);
    }

    setProfile(profileData);
    setProducts(productsData || []);
    setLoading(false);
  };

  // Load settings from localStorage
  useEffect(() => {
    const savedIndustry = localStorage.getItem('translateshop_industry');
    const savedTone = localStorage.getItem('translateshop_tone');
    if (savedIndustry) setIndustry(savedIndustry);
    if (savedTone) setTone(savedTone);
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('translateshop_industry', industry);
    localStorage.setItem('translateshop_tone', tone);
  }, [industry, tone]);

  useEffect(() => {
    loadData();

    // Refresh credits when window gets focus (after payment)
    const handleFocus = () => {
      loadData();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleTranslate = async (productId: string) => {
    setTranslating(productId);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch('/api/translate2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          productId,
          targetLanguages: ['de', 'fr', 'it', 'en'],
          industry,
          tone,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error === 'Not enough credits') {
          setError(`Nicht genug Credits. Du hast ${result.current} Credits, brauchst aber ${result.required}.`);
        } else {
          setError(result.error || 'Übersetzung fehlgeschlagen');
        }
        return;
      }

      await loadData(); // Reload to show translations + updated credits
    } catch (error) {
      console.error('Translation failed:', error);
      setError('Übersetzung fehlgeschlagen');
    } finally {
      setTranslating(null);
    }
  };

  const handleEditProduct = (product: Product) => {
    // Initialize edited translations with current values
    const initial: Record<string, { title: string; description: string }> = {};
    
    for (const lang of LANGUAGES) {
      if (lang.code === product.original_language) {
        initial[lang.code] = {
          title: product.original_title,
          description: product.original_description || '',
        };
      } else {
        const translation = product.translations?.find(t => t.language === lang.code);
        initial[lang.code] = {
          title: translation?.title || '',
          description: translation?.description || '',
        };
      }
    }
    
    setEditedTranslations(initial);
    setEditingProduct(product);
  };

  const handleSaveTranslations = async () => {
    if (!editingProduct) return;
    
    setSaving(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Filter out the original language and empty translations
      const translationsToSave: Record<string, { title: string; description?: string }> = {};
      
      for (const [lang, data] of Object.entries(editedTranslations)) {
        if (lang !== editingProduct.original_language && data.title.trim()) {
          translationsToSave[lang] = {
            title: data.title.trim(),
            description: data.description.trim() || undefined,
          };
        }
      }

      const response = await fetch('/api/translations', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          productId: editingProduct.id,
          translations: translationsToSave,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to save');
      }

      await loadData();
      setEditingProduct(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Speichern fehlgeschlagen');
    } finally {
      setSaving(false);
    }
  };

  const handleTranslateAll = async () => {
    // Get products that need translation
    const needsTranslation = products.filter(p => {
      const hasAll = ['de', 'fr', 'it', 'en'].every(
        lang => p.original_language === lang || p.translations?.some(t => t.language === lang)
      );
      return !hasAll;
    });

    if (needsTranslation.length === 0) {
      setError('Alle Produkte sind bereits übersetzt');
      return;
    }

    // Calculate required credits (3 languages per product typically)
    const requiredCredits = needsTranslation.length * 3;
    if (!credits.is_unlimited && credits.credits < requiredCredits) {
      setError(`Nicht genug Credits. Du hast ${credits.credits}, brauchst aber ca. ${requiredCredits} für ${needsTranslation.length} Produkte.`);
      return;
    }

    setError(null);

    // Translate each product sequentially
    for (const product of needsTranslation) {
      await handleTranslate(product.id);
    }
  };

  const handleExportCSV = () => {
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

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
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
        {/* Welcome & Credits */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Willkommen{profile?.company_name ? `, ${profile.company_name}` : ''}! 👋
            </h1>
            <p className="text-slate-600 mt-2">
              {products.length} Produkte hochgeladen
            </p>
          </div>
          <CreditsDisplay
            credits={credits.credits}
            isUnlimited={credits.is_unlimited}
            userEmail={profile?.email || ''}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
            <button onClick={() => setError(null)} className="float-right font-bold">✕</button>
          </div>
        )}

        {/* Translation Settings */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">⚙️</span>
              <span className="font-semibold text-slate-800">Übersetzungs-Einstellungen</span>
              <span className="text-sm text-slate-500">
                ({INDUSTRIES.find(i => i.value === industry)?.label}, {TONES.find(t => t.value === tone)?.label})
              </span>
            </div>
            <span className="text-slate-400">{showSettings ? '▲' : '▼'}</span>
          </button>
          
          {showSettings && (
            <div className="mt-4 pt-4 border-t grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Branche / Shop-Kategorie
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                >
                  {INDUSTRIES.map(ind => (
                    <option key={ind.value} value={ind.value}>{ind.label}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-1">
                  Hilft bei mehrdeutigen Begriffen (z.B. &quot;Tank&quot; = Top in Mode)
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Ansprache / Tonalität
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                >
                  {TONES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-1">
                  Bestimmt ob &quot;Sie&quot; oder &quot;du&quot; verwendet wird
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setShowUpload(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            + CSV hochladen
          </button>
          {products.length > 0 && (
            <>
              <button
                onClick={handleTranslateAll}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                🌍 Alle übersetzen
              </button>
              <button
                onClick={handleExportCSV}
                className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition"
              >
                📥 Export
              </button>
            </>
          )}
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

        {/* Edit Translations Modal */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="flex justify-between items-center p-6 border-b">
                <div>
                  <h2 className="text-xl font-semibold">Übersetzungen bearbeiten</h2>
                  <p className="text-sm text-slate-500 mt-1">{editingProduct.original_title}</p>
                </div>
                <button 
                  onClick={() => setEditingProduct(null)} 
                  className="text-slate-400 hover:text-slate-600 text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="overflow-y-auto p-6 flex-1">
                <div className="space-y-6">
                  {LANGUAGES.map((lang) => {
                    const isOriginal = lang.code === editingProduct.original_language;
                    return (
                      <div key={lang.code} className={`p-4 rounded-lg ${isOriginal ? 'bg-blue-50 border border-blue-200' : 'bg-slate-50'}`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl">{lang.flag}</span>
                          <span className="font-semibold">{lang.label}</span>
                          {isOriginal && (
                            <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">
                              Original
                            </span>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Titel
                            </label>
                            <input
                              type="text"
                              value={editedTranslations[lang.code]?.title || ''}
                              onChange={(e) => setEditedTranslations(prev => ({
                                ...prev,
                                [lang.code]: { ...prev[lang.code], title: e.target.value }
                              }))}
                              disabled={isOriginal}
                              className={`w-full px-3 py-2 border rounded-lg outline-none transition ${
                                isOriginal 
                                  ? 'bg-white/50 border-blue-200 text-slate-600' 
                                  : 'border-slate-200 focus:ring-2 focus:ring-red-500'
                              }`}
                              placeholder={isOriginal ? '' : 'Übersetzung eingeben...'}
                            />
                          </div>
                          
                          {(editingProduct.original_description || editedTranslations[lang.code]?.description) && (
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">
                                Beschreibung
                              </label>
                              <textarea
                                value={editedTranslations[lang.code]?.description || ''}
                                onChange={(e) => setEditedTranslations(prev => ({
                                  ...prev,
                                  [lang.code]: { ...prev[lang.code], description: e.target.value }
                                }))}
                                disabled={isOriginal}
                                rows={3}
                                className={`w-full px-3 py-2 border rounded-lg outline-none transition resize-none ${
                                  isOriginal 
                                    ? 'bg-white/50 border-blue-200 text-slate-600' 
                                    : 'border-slate-200 focus:ring-2 focus:ring-red-500'
                                }`}
                                placeholder={isOriginal ? '' : 'Übersetzung eingeben...'}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="flex justify-end gap-3 p-6 border-t bg-slate-50">
                <button
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleSaveTranslations}
                  disabled={saving}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                >
                  {saving ? 'Speichern...' : 'Änderungen speichern'}
                </button>
              </div>
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
                        <div className="flex justify-end gap-2">
                          {product.translations?.length > 0 && (
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="text-slate-600 hover:text-slate-800 font-medium"
                            >
                              ✏️ Bearbeiten
                            </button>
                          )}
                          <button
                            onClick={() => handleTranslate(product.id)}
                            disabled={translating === product.id}
                            className="text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
                          >
                            {translating === product.id ? 'Übersetze...' : 'Übersetzen'}
                          </button>
                        </div>
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
