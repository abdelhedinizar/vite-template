'use client';

import * as React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

import '@/styles/global.css';

import { config } from '@/config';
import { applyDefaultSettings } from '@/lib/settings/apply-default-settings';
import { getSettings as getPersistedSettings } from '@/lib/settings/get-settings';
import { UserProvider } from '@/contexts/auth/user-context';
import { SettingsProvider } from '@/contexts/settings';
import { Analytics } from '@/components/core/analytics';
import { I18nProvider } from '@/components/core/i18n-provider';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { AssistanceButton } from '@/components/core/assistance/assistance-button';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';
import { Toaster } from '@/components/core/toaster';

const metadata = { title: config.site.name };

export function Root({ children }) {
  const settings = React.useRef(applyDefaultSettings(getPersistedSettings()));
  const location = useLocation();
  const showAssistanceButton = location.pathname.startsWith('/dashboard');

  return (
    <HelmetProvider>
      <Helmet>
        <html lang={settings.current.language} />
        <title>{metadata.title}</title>
        <meta content={config.site.themeColor} name="theme-color" />
      </Helmet>
      <Analytics>
        <LocalizationProvider>
          <UserProvider>
            <SettingsProvider settings={settings.current}>
              <I18nProvider lng={settings.current.language}>
                <ThemeProvider>
                  {children}
                  {showAssistanceButton ? <AssistanceButton /> : null}
                  <Toaster position="bottom-right" />
                </ThemeProvider>
              </I18nProvider>
            </SettingsProvider>
          </UserProvider>
        </LocalizationProvider>
      </Analytics>
    </HelmetProvider>
  );
}
