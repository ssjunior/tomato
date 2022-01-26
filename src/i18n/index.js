import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationPTBR from "../translations/pt-BR/locale.json";

i18n.use(initReactI18next).init({
  resources: {
    "pt-BR": {
      translation: translationPTBR,
    },
  },
  language: "en-US",
  languages: ["en-US", "pt-BR"],
  fallbackLng: "en-US",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
  debug: false,
  returnEmptyString: false,
  react: {
    wait: true,
    useSuspense: false,
  },
  saveMissing: true,
});

const t = i18n.t.bind(i18n);

export { i18n, t };
