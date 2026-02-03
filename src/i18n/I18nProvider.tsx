'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { locales, defaultLocale, type Locale } from './config';

// Import all translations
import de from './messages/de.json';
import fr from './messages/fr.json';
import it from './messages/it.json';
import en from './messages/en.json';

const messages: Record<Locale, typeof de> = { de, fr, it, en };

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    // Check URL for locale
    const pathLocale = window.location.pathname.split('/')[1] as Locale;
    if (locales.includes(pathLocale)) {
      setLocaleState(pathLocale);
    } else {
      // Check localStorage
      const saved = localStorage.getItem('locale') as Locale;
      if (saved && locales.includes(saved)) {
        setLocaleState(saved);
      } else {
        // Check browser language
        const browserLang = navigator.language.split('-')[0] as Locale;
        if (locales.includes(browserLang)) {
          setLocaleState(browserLang);
        }
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    
    // Update URL without full reload
    const currentPath = window.location.pathname;
    let newPath = currentPath;
    
    // Remove existing locale from path if present
    for (const loc of locales) {
      if (currentPath.startsWith(`/${loc}/`) || currentPath === `/${loc}`) {
        newPath = currentPath.replace(`/${loc}`, '') || '/';
        break;
      }
    }
    
    // Add new locale (except for default)
    if (newLocale !== defaultLocale) {
      newPath = `/${newLocale}${newPath === '/' ? '' : newPath}`;
    }
    
    window.history.pushState({}, '', newPath);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = messages[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Fallback to German
        value = messages.de;
        for (const k of keys) {
          if (value && typeof value === 'object' && k in value) {
            value = (value as Record<string, unknown>)[k];
          } else {
            return key; // Return key if not found
          }
        }
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

export function useTranslations() {
  const { t } = useI18n();
  return t;
}
