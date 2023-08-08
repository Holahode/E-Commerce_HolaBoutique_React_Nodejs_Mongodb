// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        greeting: 'Hello',
        welcome: 'Welcome to our store!',
        Home: 'Home',
      },
    },
    fr: {
      translation: {
        greeting: 'Bonjour',
        welcome: 'Bienvenue dans notre magasin !',
      },
    },
    am: {
      translation: {
        greeting: 'ሰላም',
        welcome: 'እንኳን ደህና መጡ!',
      },
    },
  },
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language if the selected one is not available
  interpolation: {
    escapeValue: false, // React already handles escaping
  },
});

export default i18n;
