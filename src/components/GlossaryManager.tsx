'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface GlossaryEntry {
  id: string;
  source_term: string;
  target_term: string;
  source_language: string | null;
  target_language: string | null;
  created_at: string;
}

interface GlossaryManagerProps {
  onClose: () => void;
}

const LANGUAGES = [
  { code: '', label: 'Alle Sprachen' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Französisch' },
  { code: 'it', label: 'Italienisch' },
  { code: 'en', label: 'Englisch' },
];

export default function GlossaryManager({ onClose }: GlossaryManagerProps) {
  const [entries, setEntries] = useState<GlossaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tableNotExists, setTableNotExists] = useState(false);
  
  // New entry form
  const [sourceTerm, setSourceTerm] = useState('');
  const [targetTerm, setTargetTerm] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    loadGlossary();
  }, []);

  const loadGlossary = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch('/api/glossary', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      const data = await response.json();
      
      if (data.tableNotExists) {
        setTableNotExists(true);
      } else if (data.entries) {
        setEntries(data.entries);
      }
    } catch (err) {
      setError('Fehler beim Laden des Glossars');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceTerm.trim() || !targetTerm.trim()) return;

    setAdding(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch('/api/glossary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          sourceTerm,
          targetTerm,
          sourceLanguage: sourceLanguage || null,
          targetLanguage: targetLanguage || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Fehler beim Hinzufügen');
      }

      // Reset form and reload
      setSourceTerm('');
      setTargetTerm('');
      setSourceLanguage('');
      setTargetLanguage('');
      await loadGlossary();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Hinzufügen');
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteEntry = async (id: string) => {
    if (!confirm('Diesen Eintrag wirklich löschen?')) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(`/api/glossary?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (!response.ok) {
        throw new Error('Fehler beim Löschen');
      }

      await loadGlossary();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Löschen');
    }
  };

  const getLanguageLabel = (code: string | null) => {
    if (!code) return 'Alle';
    return LANGUAGES.find(l => l.code === code)?.label || code;
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
            <h2 className="text-xl font-semibold">📖 Glossar</h2>
            <p className="text-sm text-slate-500 mt-1">
              Begriffe die immer gleich übersetzt werden sollen
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl">
            ✕
          </button>
        </div>

        <div className="overflow-y-auto p-6 flex-1">
          {tableNotExists ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 font-medium">⚠️ Glossar-Tabelle nicht eingerichtet</p>
              <p className="text-yellow-700 text-sm mt-1">
                Die Datenbank-Tabelle für das Glossar muss noch erstellt werden.
                Bitte kontaktiere den Support.
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

              {/* Add new entry form */}
              <form onSubmit={handleAddEntry} className="bg-slate-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-3">Neuer Eintrag</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Quellbegriff *
                    </label>
                    <input
                      type="text"
                      value={sourceTerm}
                      onChange={(e) => setSourceTerm(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      placeholder="z.B. Tank"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Übersetzung *
                    </label>
                    <input
                      type="text"
                      value={targetTerm}
                      onChange={(e) => setTargetTerm(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      placeholder="z.B. Top"
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Quellsprache (optional)
                    </label>
                    <select
                      value={sourceLanguage}
                      onChange={(e) => setSourceLanguage(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    >
                      {LANGUAGES.map(lang => (
                        <option key={`src-${lang.code}`} value={lang.code}>{lang.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Zielsprache (optional)
                    </label>
                    <select
                      value={targetLanguage}
                      onChange={(e) => setTargetLanguage(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    >
                      {LANGUAGES.map(lang => (
                        <option key={`tgt-${lang.code}`} value={lang.code}>{lang.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={adding || !sourceTerm.trim() || !targetTerm.trim()}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                >
                  {adding ? 'Wird hinzugefügt...' : '+ Eintrag hinzufügen'}
                </button>
              </form>

              {/* Entries list */}
              {entries.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <div className="text-4xl mb-2">📖</div>
                  <p>Noch keine Glossar-Einträge</p>
                  <p className="text-sm">Fügen Sie Begriffe hinzu, die immer gleich übersetzt werden sollen.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-sm text-slate-500 mb-2">
                    {entries.length} Einträge
                  </div>
                  {entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="font-medium">{entry.source_term}</span>
                          {entry.source_language && (
                            <span className="text-xs text-slate-400 ml-1">
                              ({getLanguageLabel(entry.source_language)})
                            </span>
                          )}
                        </div>
                        <span className="text-slate-400">→</span>
                        <div>
                          <span className="font-medium text-red-600">{entry.target_term}</span>
                          {entry.target_language && (
                            <span className="text-xs text-slate-400 ml-1">
                              ({getLanguageLabel(entry.target_language)})
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="text-slate-400 hover:text-red-600 transition"
                        title="Löschen"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
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
