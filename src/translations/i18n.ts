import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const appName = 'Can I Afford';

const resources = {
  EN: {
    translation: {
      welcome: 'Welcome',
      appName: appName,
      // Add other translations here
    },
  },
  PT: {
    translation: {
      welcome: 'Bem-vindo',
      appName: appName,
      // Add other translations here
    },
  },
};

i18n
.use(initReactI18next)
.init({
  resources,
  lng: 'EN', // default language
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
