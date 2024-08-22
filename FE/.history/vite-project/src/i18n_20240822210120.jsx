import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

//! Primary Lookup in Current Language:
// When you request a translation, i18next first checks the specified namespace and,
// if not found, checks the default namespace within the currently active language.

//! Fallback to fallbackLng:
// If the key isn't found in any namespace within the currently active language,
// i18next will switch to the fallbackLng (e.g., en in your configuration) and perform the same lookup sequence in that language.

//! Searching in All Namespaces of fallbackLng:
// When i18next switches to the fallback language,
// it will search through all the namespaces listed in your configuration (ns: ['common', 'header', 'footer']) in the fallback language,
// just as it does in the active language.

//! Final Fallback:

// If the key still isn't found, the key itself is returned as the translation, serving as an indicator that a translation is missing.

i18n.use(Backend) //* Uses the Backend plugin to load translations
    .use(LanguageDetector) //* Detects the user's preferred language
    .use(initReactI18next) //* Integrates i18next with React
    .init({
        fallbackLng: "en", //* Fallback language if the user's language is not available

        debug: true, //* Enables debug mode to log information to the console

        //* When you set up multiple namespaces for different languages,
        //* you typically want each language to have the same set of namespaces, with each namespace containing the same keys.
        ns: ["login", "table"], //* Namespaces to organize translation files

        defaultNS: "common", //* Specifies the default namespace

        interpolation: {
            escapeValue: false, //* Disables escaping, as React already handles it
            formatSeparator: ",",
        },
    });

export default i18n;
