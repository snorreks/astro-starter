import type { languages } from '$data/i18n'

export type Locale = keyof typeof languages

export type Language = {
  code: string
  flag: string
  label: string
}
