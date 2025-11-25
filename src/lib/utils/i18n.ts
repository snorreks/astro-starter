// src/lib/utils/i18n.ts
import type { Locale } from '$types'

import { languages, defaultLocale } from '$data/i18n'
import { ui } from '$data/ui'

/**
 * Retrieves the language from the URL path.
 * @param url - The URL to extract the language from.
 * @returns The locale string.
 */
export const getLangFromUrl = (url: URL): Locale => {
  const [, lang] = url.pathname.split('/')
  if (lang in ui) return lang as keyof typeof ui
  return defaultLocale
}

/**
 * Returns a translation function for a given language.
 * @param lang - The language to use for translations.
 * @returns A function that takes a key and returns the translated string.
 */
export const useTranslations = (lang: keyof typeof ui) => {
  return (key: keyof (typeof ui)[typeof defaultLocale]): string => {
    return ui[lang][key] || ui[defaultLocale][key]
  }
}

/**
 * Converts a string to a valid locale, defaulting to the default locale if invalid.
 * @param value - The string to convert to a locale.
 * @returns The corresponding locale.
 */
export const toLocale = (value?: string): Locale => {
  if (!value) {
    return defaultLocale
  }
  return value in languages ? (value as Locale) : defaultLocale
}
