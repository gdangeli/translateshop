'use client';

import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';

interface CSVUploadProps {
  onUploadComplete: () => void;
}

export default function CSVUpload({ onUploadComplete }: CSVUploadProps) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [language, setLanguage] = useState('de');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Nicht angemeldet');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('language', language);

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Upload fehlgeschlagen');
      } else {
        setSuccess(`${result.count} Produkte erfolgreich hochgeladen!`);
        onUploadComplete();
      }
    } catch (err) {
      setError('Upload fehlgeschlagen');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) {
      handleUpload(file);
    } else {
      setError('Bitte eine CSV-Datei hochladen');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <div className="w-full">
      {/* Language Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Originalsprache der Produkte:
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
        >
          <option value="de">Deutsch</option>
          <option value="fr">Französisch</option>
          <option value="it">Italienisch</option>
          <option value="en">Englisch</option>
        </select>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition
          ${dragging ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-red-300'}
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".csv"
          className="hidden"
          disabled={uploading}
        />

        {uploading ? (
          <div className="text-slate-600">
            <div className="text-4xl mb-4">⏳</div>
            <p>Wird hochgeladen...</p>
          </div>
        ) : (
          <div>
            <div className="text-4xl mb-4">📤</div>
            <p className="text-slate-800 font-semibold mb-2">
              CSV-Datei hierher ziehen
            </p>
            <p className="text-slate-500 text-sm">
              oder klicken zum Auswählen
            </p>
          </div>
        )}
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
          {success}
        </div>
      )}

      {/* CSV Format Help */}
      <div className="mt-4 text-sm text-slate-500">
        <p className="font-medium mb-1">CSV-Format:</p>
        <p>Spalten: <code className="bg-slate-100 px-1 rounded">title</code> (Pflicht), <code className="bg-slate-100 px-1 rounded">description</code> (optional)</p>
      </div>
    </div>
  );
}
