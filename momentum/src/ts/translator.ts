import i18n from "i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { i18nextPlugin } from "translation-check";

const initPromise = i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // get missing translations on
  // http://localhost:3000?showtranslations
  .use(i18nextPlugin)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    backend: {
      loadPath: "public/locales/{{lng}}/translation.json",
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });
export { initPromise as i18nInitPromise };

export function changeLanguage(lang: string) {
  i18n.language !== lang && i18n.changeLanguage(lang);
}

export function t(key: string) {
  return i18n.t(key);
}

export function onLanguageChanged(callback: () => void) {
  i18n.on("languageChanged", callback);
}

export function getAvaliableLanguages() {
  const rb = i18n.getResourceBundle("en", "translation");
  if (rb && rb.settings && rb.settings.lang) {
    return Object.keys(rb.settings.lang);
  }
  return [];
}

document.addEventListener("keyup", (e) => {
  if (e.key === "q") {
    changeLanguage("en");
  } else if (e.key === "w") {
    changeLanguage("ru");
  }
});
