// src/lib/utils/i18n.ts
import type { Locale } from '$types'

import { languages, defaultLang } from '$data/i18n'
import { ui } from '$data/ui'

export { defaultLang, languages }

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/')
  if (lang in ui) return lang as keyof typeof ui
  return defaultLang
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key]
  }
}

export const toLocale = (value?: string): Locale => {
  if (!value) {
    return defaultLang
  }
  return value in languages ? (value as Locale) : defaultLang
}
