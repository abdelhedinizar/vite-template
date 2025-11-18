'use client';

import * as React from 'react';
import { use } from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

import { logger } from '@/lib/default-logger';
import { de } from '@/locales/de';
import { en } from '@/locales/en';
import { es } from '@/locales/es';
import { fr } from '@/locales/fr';

use(initReactI18next)
  .init({
    debug: false,
    ns: Object.keys(fr),
    lng: 'fr',
    defaultNS: 'common',
    fallbackNS: 'common',
    fallbackLng: 'fr',
    resources: {
      fr,
      en,
      de,
      es,
    },
  })
  .catch((err) => {
    logger.error('Failed to initialize i18n', err);
  });

export function I18nProvider({ children, lng = 'fr' }) {
  const { i18n } = useTranslation();

  React.useEffect(() => {
    i18n.changeLanguage(lng).catch(() => {
      logger.error(`Failed to change language to ${lng}`);
    });
  }, [i18n, lng]);

  return <React.Fragment>{children}</React.Fragment>;
}
