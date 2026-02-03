'use client';

import { I18nProvider } from '@/i18n/I18nProvider';
import HomePage from '@/components/HomePage';

export default function Page() {
  return (
    <I18nProvider>
      <HomePage />
    </I18nProvider>
  );
}
