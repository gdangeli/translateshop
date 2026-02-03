export const locales = ['de', 'fr', 'it', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'de';

export const localeNames: Record<Locale, string> = {
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  en: 'English',
};

export const localeFlags: Record<Locale, string> = {
  de: '🇨🇭',
  fr: '🇨🇭',
  it: '🇨🇭',
  en: '🇬🇧',
};
