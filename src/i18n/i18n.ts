import { use } from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from 'src/locales/en/home.json'
import PRODUCT_EN from 'src/locales/en/product.json'
import HOME_VI from 'src/locales/vi/home.json'
import PRODUCT_VI from 'src/locales/vi/product.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt',
}

export const resources = {
  en: {
    home: HOME_EN,
    product: PRODUCT_EN,
  },
  vi: {
    home: HOME_VI,
    product: PRODUCT_VI,
  },
}

export const defaultNS = 'home'

use(initReactI18next).init({
  resources,
  lng: 'vi',
  fallbackLng: 'vi',
  ns: ['home', 'product'],
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
})
