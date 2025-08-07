'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { i18n } from '@/i18n';

type Language = 'en' | 'zh';

const LANGUAGES = {
  en: { name: 'English', nativeName: 'English' },
  zh: { name: 'Chinese', nativeName: '中文' },
} as const;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isLanguage: (lang: Language) => boolean;
  availableLanguages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = (lang: Language) => {
    if (!(lang in LANGUAGES)) {
      console.warn(`Unsupported language: ${lang}`);
      return;
    }

    setLanguageState(lang);
    i18n.activate(lang);
    localStorage.setItem('language', lang);
  };

  const isLanguage = (lang: Language) => language === lang;

  const availableLanguages = Object.keys(LANGUAGES) as Language[];

  // Load saved language on mount
  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && saved in LANGUAGES) {
      setLanguage(saved);
    }
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isLanguage,
        availableLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
