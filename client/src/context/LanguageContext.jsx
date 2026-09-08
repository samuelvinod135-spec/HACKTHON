import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import enLocale from '../i18n/locales/en.json';
import hiLocale from '../i18n/locales/hi.json';
import taLocale from '../i18n/locales/ta.json';
import teLocale from '../i18n/locales/te.json';
import { getLocalizedElement as localizeElementHelper } from '../i18n/elements_i18n.js';

const BUNDLED_LOCALES = {
  en: enLocale,
  hi: hiLocale,
  ta: taLocale,
  te: teLocale,
};

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', native: 'English', script: 'Latin', badge: 'EN' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', script: 'Devanagari', badge: 'HI' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', script: 'Tamil', badge: 'TA' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', script: 'Telugu', badge: 'TE' },
];

const SPEECH_LANG_MAP = {
  en: 'en-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  te: 'te-IN',
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLangState] = useState(() => {
    try {
      return localStorage.getItem('labxplore_language') || 'en';
    } catch {
      return 'en';
    }
  });

  const [translations, setTranslations] = useState(() => {
    // Prime local cache for all bundled languages to guarantee 100% offline availability
    const dict = {};
    Object.keys(BUNDLED_LOCALES).forEach((lang) => {
      try {
        dict[lang] = BUNDLED_LOCALES[lang];
        localStorage.setItem(`labxplore_i18n_cache_${lang}`, JSON.stringify(BUNDLED_LOCALES[lang]));
      } catch {
        dict[lang] = BUNDLED_LOCALES[lang];
      }
    });
    return dict;
  });

  // Ensure active language is cached and saved
  const setLanguage = useCallback((newLang) => {
    if (!BUNDLED_LOCALES[newLang]) return;
    setCurrentLangState(newLang);
    try {
      localStorage.setItem('labxplore_language', newLang);
      localStorage.setItem(
        `labxplore_i18n_cache_${newLang}`,
        JSON.stringify(BUNDLED_LOCALES[newLang])
      );
    } catch (err) {
      console.warn('Language persistence error:', err);
    }
  }, []);

  // t('nav.chemistryLab', 'Chemistry Lab')
  const t = useCallback(
    (keyPath, fallback = '') => {
      if (!keyPath) return fallback;
      const activeDict = BUNDLED_LOCALES[currentLang] || translations[currentLang] || BUNDLED_LOCALES.en;
      const keys = keyPath.split('.');
      let val = activeDict;
      for (const k of keys) {
        if (val && typeof val === 'object' && k in val) {
          val = val[k];
        } else {
          val = undefined;
          break;
        }
      }

      if (val !== undefined && typeof val === 'string') {
        return val;
      }

      // Fallback to English if translation is missing in regional language
      if (currentLang !== 'en') {
        let engVal = BUNDLED_LOCALES.en || translations.en;
        for (const k of keys) {
          if (engVal && typeof engVal === 'object' && k in engVal) {
            engVal = engVal[k];
          } else {
            engVal = undefined;
            break;
          }
        }
        if (engVal !== undefined && typeof engVal === 'string') {
          return engVal;
        }
      }

      return fallback || keyPath;
    },
    [currentLang, translations]
  );

  const getLocalizedElement = useCallback(
    (element) => {
      return localizeElementHelper(element, currentLang);
    },
    [currentLang]
  );

  const speechLangCode = SPEECH_LANG_MAP[currentLang] || 'en-IN';

  const value = {
    currentLang,
    setLanguage,
    t,
    getLocalizedElement,
    speechLangCode,
    supportedLanguages: SUPPORTED_LANGUAGES,
    isRegional: currentLang !== 'en',
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Safe fallback if used outside provider
    return {
      currentLang: 'en',
      setLanguage: () => {},
      t: (k, fb = '') => fb || k,
      getLocalizedElement: (el) => el,
      speechLangCode: 'en-IN',
      supportedLanguages: SUPPORTED_LANGUAGES,
      isRegional: false,
    };
  }
  return context;
}
