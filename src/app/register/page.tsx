'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          company_name: companyName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-4">✉️</div>
          <h1 className="text-2xl font-bold text-slate-800 mb-4">
            Bestätigen Sie Ihre E-Mail
          </h1>
          <p className="text-slate-600 mb-6">
            Wir haben Ihnen eine E-Mail an <strong>{email}</strong> gesendet. 
            Klicken Sie auf den Link, um Ihr Konto zu aktivieren.
          </p>
          <Link href="/login" className="text-red-600 hover:underline">
            Zurück zur Anmeldung
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-slate-800">
            🌐 TranslateShop<span className="text-red-600">.ch</span>
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-slate-800">Konto erstellen</h1>
          <p className="mt-2 text-slate-600">50 Produkte gratis übersetzen</p>
        </div>

        <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-sm">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Firmenname <span className="text-slate-400">(optional)</span>
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              placeholder="Ihre Firma GmbH"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              E-Mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              placeholder="ihre@email.ch"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              placeholder="Mind. 6 Zeichen"
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? 'Wird erstellt...' : 'Kostenlos registrieren'}
          </button>

          <p className="mt-4 text-center text-sm text-slate-500">
            Mit der Registrierung akzeptieren Sie unsere AGB.
          </p>

          <p className="mt-6 text-center text-slate-600">
            Bereits ein Konto?{' '}
            <Link href="/login" className="text-red-600 hover:underline">
              Anmelden
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
