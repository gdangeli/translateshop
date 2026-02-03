'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface ApiKey {
  id: string;
  name: string;
  key_prefix: string;
  is_active: boolean;
  created_at: string;
  last_used_at: string | null;
}

interface DeveloperApiManagerProps {
  onClose: () => void;
}

export default function DeveloperApiManager({ onClose }: DeveloperApiManagerProps) {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tableNotExists, setTableNotExists] = useState(false);
  
  // Create key
  const [creating, setCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    loadKeys();
  }, []);

  const loadKeys = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch('/api/developer/keys', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      const data = await response.json();
      
      if (data.tableNotExists) {
        setTableNotExists(true);
      } else if (data.keys) {
        setKeys(data.keys);
      }
    } catch (err) {
      setError('Fehler beim Laden der API-Keys');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch('/api/developer/keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ name: newKeyName || 'API Key' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fehler beim Erstellen');
      }

      // Show the newly created key (only shown once!)
      setNewlyCreatedKey(data.key.apiKey);
      setShowCreateForm(false);
      setNewKeyName('');
      await loadKeys();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Erstellen');
    } finally {
      setCreating(false);
    }
  };

  const handleRevokeKey = async (id: string) => {
    if (!confirm('Diesen API-Key wirklich widerrufen? Er kann danach nicht mehr verwendet werden.')) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(`/api/developer/keys?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (!response.ok) {
        throw new Error('Fehler beim Widerrufen');
      }

      await loadKeys();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Widerrufen');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('In Zwischenablage kopiert!');
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
            <h2 className="text-xl font-semibold">🔑 Developer API</h2>
            <p className="text-sm text-slate-500 mt-1">
              API-Keys für programmatischen Zugriff
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl">
            ✕
          </button>
        </div>

        <div className="overflow-y-auto p-6 flex-1">
          {tableNotExists ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 font-medium">⚠️ API-Keys-Tabelle nicht eingerichtet</p>
              <p className="text-yellow-700 text-sm mt-1">
                Die Datenbank-Tabelle muss noch erstellt werden.
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

              {/* Newly created key warning */}
              {newlyCreatedKey && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800 font-semibold mb-2">✅ API-Key erstellt!</p>
                  <p className="text-green-700 text-sm mb-3">
                    Kopieren und sicher speichern Sie diesen Key. Er wird nur einmal angezeigt!
                  </p>
                  <div className="flex items-center gap-2 bg-white p-3 rounded border border-green-300">
                    <code className="flex-1 text-sm font-mono break-all">{newlyCreatedKey}</code>
                    <button
                      onClick={() => copyToClipboard(newlyCreatedKey)}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                    >
                      Kopieren
                    </button>
                  </div>
                  <button
                    onClick={() => setNewlyCreatedKey(null)}
                    className="mt-3 text-sm text-green-700 hover:underline"
                  >
                    Verstanden, ich habe den Key gespeichert
                  </button>
                </div>
              )}

              {/* API Documentation */}
              <div className="bg-slate-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-3">📖 API-Dokumentation</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">Basis-URL:</p>
                    <code className="text-xs bg-white px-2 py-1 rounded">https://translateshop.ch/api/v1</code>
                  </div>
                  <div>
                    <p className="font-medium">Authentifizierung:</p>
                    <code className="text-xs bg-white px-2 py-1 rounded">Authorization: Bearer ts_xxx</code>
                  </div>
                  <div>
                    <p className="font-medium">Endpoints:</p>
                    <ul className="mt-1 space-y-1 text-slate-600">
                      <li><code className="text-xs bg-white px-1 rounded">POST /translate</code> - Text übersetzen</li>
                      <li><code className="text-xs bg-white px-1 rounded">GET /credits</code> - Credits abfragen</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Beispiel:</p>
                    <pre className="mt-1 text-xs bg-white p-2 rounded overflow-x-auto">
{`curl -X POST https://translateshop.ch/api/v1/translate \\
  -H "Authorization: Bearer ts_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{"title": "Produkt", "targetLanguages": ["fr", "en"]}'`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Create new key */}
              {!showCreateForm ? (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="mb-6 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  + Neuen API-Key erstellen
                </button>
              ) : (
                <form onSubmit={handleCreateKey} className="bg-slate-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold mb-3">Neuen API-Key erstellen</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      placeholder="Name (optional, z.B. 'Production')"
                    />
                    <button
                      type="submit"
                      disabled={creating}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                    >
                      {creating ? 'Erstelle...' : 'Erstellen'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="px-4 py-2 text-slate-600 hover:text-slate-800"
                    >
                      Abbrechen
                    </button>
                  </div>
                </form>
              )}

              {/* Existing keys */}
              {keys.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <div className="text-4xl mb-2">🔑</div>
                  <p>Noch keine API-Keys</p>
                  <p className="text-sm">Erstellen Sie einen API-Key für programmatischen Zugriff.</p>
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold mb-3">Ihre API-Keys</h3>
                  <div className="space-y-2">
                    {keys.map((key) => (
                      <div
                        key={key.id}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          key.is_active 
                            ? 'bg-white border-slate-200' 
                            : 'bg-slate-100 border-slate-200 opacity-60'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{key.name}</span>
                            {!key.is_active && (
                              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                                Widerrufen
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-slate-500 font-mono">
                            {key.key_prefix}
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            Erstellt: {new Date(key.created_at).toLocaleDateString('de-CH')}
                            {key.last_used_at && (
                              <> · Zuletzt: {new Date(key.last_used_at).toLocaleDateString('de-CH')}</>
                            )}
                          </div>
                        </div>
                        {key.is_active && (
                          <button
                            onClick={() => handleRevokeKey(key.id)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            Widerrufen
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
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
