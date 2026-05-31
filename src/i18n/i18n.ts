import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
import en from '../assets/Locales/En/translation.json'
import ru from '../assets/Locales/Ru/translation.json'
import uz from '../assets/Locales/Uz/translation.json'
import fr from '../assets/Locales/Fr/translation.json'
import es from '../assets/Locales/Es/translation.json'
import zh from '../assets/Locales/Zh/translation.json'

i18next.use(I18nextBrowserLanguageDetector).use(initReactI18next).init({
    detection: {
        order: ["localStorage"],
        lookupLocalStorage: 'i18next'
    },
    resources: {
        en: { translation: en },
        ru: { translation: ru },
        uz: { translation: uz },
        fr: { translation: fr },
        es: { translation: es },
        zh: { translation: zh },
    }
})