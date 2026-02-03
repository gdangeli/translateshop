'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Integration {
  id: string;
  platform: 'shopify' | 'woocommerce';
  shop_name: string;
  shop_url: string;
  is_active: boolean;
  created_at: string;
}

interface IntegrationsManagerProps {
  onClose: () => void;
  onImportComplete: () => void;
}

const PLATFORMS = {
  shopify: {
    name: 'Shopify',
    icon: '🛍️',
    color: 'bg-green-600',
    fields: [
      { key: 'shopUrl', label: 'Shop URL', placeholder: 'your-store.myshopify.com', type: 'text' },
      { key: 'accessToken', label: 'Admin API Access Token', placeholder: 'shpat_...', type: 'password' },
    ],
    helpUrl: 'https://help.shopify.com/en/manual/apps/app-types/custom-apps',
  },
  woocommerce: {
    name: 'WooCommerce',
    icon: '🔮',
    color: 'bg-purple-600',
    fields: [
      { key: 'siteUrl', label: 'Shop URL', placeholder: 'https://your-store.com', type: 'text' },
      { key: 'consumerKey', label: 'Consumer Key', placeholder: 'ck_...', type: 'text' },
      { key: 'consumerSecret', label: 'Consumer Secret', placeholder: 'cs_...', type: 'password' },
    ],
    helpUrl: 'https://woocommerce.com/document/woocommerce-rest-api/',
  },
};

export default function IntegrationsManager({ onClose, onImportComplete }: IntegrationsManagerProps) {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tableNotExists, setTableNotExists] = useState(false);
  
  // Add integration form
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'shopify' | 'woocommerce' | null>(null);
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [adding, setAdding] = useState(false);
  
  // Import
  const [importing, setImporting] = useState<string | null>(null);
  const [importLanguage, setImportLanguage] = useState('de');

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch('/api/integrations', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      const data = await response.json();
      
      if (data.tableNotExists) {
        setTableNotExists(true);
      } else if (data.integrations) {
        setIntegrations(data.integrations);
      }
    } catch (err) {
      setError('Fehler beim Laden der Integrationen');
    } finally {
      setLoading(false);
    }
  };

  const handleAddIntegration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlatform) return;

    setAdding(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch('/api/integrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          platform: selectedPlatform,
          credentials,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Verbindung fehlgeschlagen');
      }

      // Reset form and reload
      setShowAddForm(false);
      setSelectedPlatform(null);
      setCredentials({});
      await loadIntegrations();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Hinzufügen');
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteIntegration = async (id: string) => {
    if (!confirm('Diese Integration wirklich entfernen?')) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(`/api/integrations?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (!response.ok) {
        throw new Error('Fehler beim Löschen');
      }

      await loadIntegrations();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Löschen');
    }
  };

  const handleImport = async (integrationId: string) => {
    setImporting(integrationId);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch('/api/integrations/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          integrationId,
          language: importLanguage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Import fehlgeschlagen');
      }

      alert(`✅ Import erfolgreich!\n\n${data.imported} Produkte importiert${data.skipped ? `\n${data.skipped} übersprungen (bereits vorhanden)` : ''}`);
      onImportComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Import fehlgeschlagen');
    } finally {
      setImporting(null);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8">
          <div className="text-xl text-slate-600">Laden...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">🔗 Shop-Integrationen</h2>
            <p className="text-sm text-slate-500 mt-1">
              Verbinden Sie Ihren Shop für direkten Import/Export
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl">
            ✕
          </button>
        </div>

        <div className="overflow-y-auto p-6 flex-1">
          {tableNotExists ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 font-medium">⚠️ Integrations-Tabelle nicht eingerichtet</p>
              <p className="text-yellow-700 text-sm mt-1">
                Die Datenbank-Tabelle für Integrationen muss noch erstellt werden.
              </p>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                  <button onClick={() => setError(null)} className="float-right font-bold">✕</button>
                </div>
              )}

              {/* Connected integrations */}
              {integrations.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Verbundene Shops</h3>
                  <div className="space-y-3">
                    {integrations.map((integration) => {
                      const platform = PLATFORMS[integration.platform];
                      return (
                        <div
                          key={integration.id}
                          className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{platform.icon}</span>
                            <div>
                              <div className="font-medium">{integration.shop_name}</div>
                              <div className="text-sm text-slate-500">{platform.name}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <select
                              value={importLanguage}
                              onChange={(e) => setImportLanguage(e.target.value)}
                              className="text-sm border border-slate-200 rounded px-2 py-1"
                            >
                              <option value="de">DE</option>
                              <option value="fr">FR</option>
                              <option value="it">IT</option>
                              <option value="en">EN</option>
                            </select>
                            <button
                              onClick={() => handleImport(integration.id)}
                              disabled={importing === integration.id}
                              className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                            >
                              {importing === integration.id ? 'Importiere...' : '📥 Import'}
                            </button>
                            <button
                              onClick={() => handleDeleteIntegration(integration.id)}
                              className="text-red-600 hover:text-red-700 p-1.5"
                              title="Entfernen"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Add new integration */}
              {!showAddForm ? (
                <div>
                  <h3 className="font-semibold mb-3">Shop verbinden</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(PLATFORMS).map(([key, platform]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedPlatform(key as 'shopify' | 'woocommerce');
                          setShowAddForm(true);
                          setCredentials({});
                        }}
                        className="flex items-center gap-3 p-4 border-2 border-dashed border-slate-200 rounded-lg hover:border-slate-400 transition text-left"
                      >
                        <span className="text-3xl">{platform.icon}</span>
                        <div>
                          <div className="font-semibold">{platform.name}</div>
                          <div className="text-sm text-slate-500">Verbinden</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : selectedPlatform && (
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <span>{PLATFORMS[selectedPlatform].icon}</span>
                      {PLATFORMS[selectedPlatform].name} verbinden
                    </h3>
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        setSelectedPlatform(null);
                      }}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <form onSubmit={handleAddIntegration} className="space-y-4">
                    {PLATFORMS[selectedPlatform].fields.map((field) => (
                      <div key={field.key}>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          value={credentials[field.key] || ''}
                          onChange={(e) => setCredentials(prev => ({ ...prev, [field.key]: e.target.value }))}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                          placeholder={field.placeholder}
                          required
                        />
                      </div>
                    ))}
                    
                    <div className="text-sm text-slate-500">
                      <a 
                        href={PLATFORMS[selectedPlatform].helpUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        📖 Anleitung: API-Zugangsdaten erhalten
                      </a>
                    </div>

                    <button
                      type="submit"
                      disabled={adding}
                      className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
                    >
                      {adding ? 'Verbinde...' : 'Verbindung testen & speichern'}
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex justify-end gap-3 p-6 border-t bg-slate-50">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
          >
            Schliessen
          </button>
        </div>
      </div>
    </div>
  );
}
