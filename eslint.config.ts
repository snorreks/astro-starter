// eslint.config.ts
import type { Linter } from 'eslint'

import js from '@eslint/js'
import astro from 'eslint-plugin-astro'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import perfectionist from 'eslint-plugin-perfectionist'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const config = [
  // 1. Global Ignores
  {
    ignores: ['dist/**', 'node_modules/**', '.astro/**', '**/*.d.ts', 'test-results/**', 'playwright-report/**'],
  },

  // 2. Base Configuration (Globals & JS)
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  js.configs.recommended,

  // 3. Perfectionist (Sorting)
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-imports': 'error',
      'perfectionist/sort-exports': 'error',
      'perfectionist/sort-named-exports': 'error',
      'perfectionist/sort-interfaces': 'error',
      'perfectionist/sort-object-types': 'error',
    },
  },

  // 4. TypeScript Configuration
  // We explicitly cast this to "any" to prevent deep type conflicts
  // between the plugin's internal types and ESLint's strict types.
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' }],
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  // 5. Astro Configuration
  ...astro.configs.recommended,
  ...astro.configs['jsx-a11y-strict'],

  // 6. Explicitly load the A11y Plugin
  {
    plugins: {
      'jsx-a11y': jsxA11y,
    },
  },

  // 7. Astro Overrides
  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
      'jsx-a11y/alt-text': 'error',

      // Attribute Sorting
      'perfectionist/sort-jsx-props': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          ignoreCase: true,
          customGroups: {
            id: ['id', 'name'],
            navigation: ['href', 'src', 'action', 'method'],
            meta: ['type', 'role', 'title', 'tabindex', 'target', 'rel'],
            style: ['style'],
            class: ['class', 'class:list'],
          },
          groups: ['id', 'navigation', 'meta', 'unknown', 'style', 'class'],
        },
      ],
    },
  },
] satisfies Linter.Config[] // <--- The magic type check

export default config
