// prettier.config.ts
import type { Config } from 'prettier'

const config: Config = {
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  printWidth: 120,
  plugins: ['prettier-plugin-astro', 'prettier-plugin-css-order', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}

export default config
