// prettier.config.ts
import type { Config } from 'prettier';

const config: Config = {
  tabWidth: 2,
  useTabs: false, // Google style uses spaces
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'all', // "Next Gen" preference for git diff cleanliness
  bracketSpacing: true,
  arrowParens: 'always',
  printWidth: 100, // 120 can be hard to read on split screens
  endOfLine: 'lf',

  // Plugins
  plugins: [
    'prettier-plugin-astro',
    'prettier-plugin-css-order', // Strict CSS ordering
    'prettier-plugin-tailwindcss', // Strict Class ordering
  ],

  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};

export default config;
