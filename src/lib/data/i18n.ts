import type { Locale } from '$types'

export const LOCALES = {
  en: 'en-US', // English (United States)
} as const

// src/lib/data/i18n.ts
export const languages = {
  en: { code: 'en', label: 'English', flag: '🇺🇸' },
} as const satisfies Record<Locale, { code: string; flag: string; label: string }>

export const localeKeys = Object.keys(LOCALES) as (keyof typeof LOCALES)[]

export const defaultLocale: Locale = 'en'
