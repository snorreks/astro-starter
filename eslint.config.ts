// eslint.config.ts
import type { Linter } from 'eslint';

import js from '@eslint/js';
import astroParser from 'astro-eslint-parser';
import prettierConfig from 'eslint-config-prettier';
import astro from 'eslint-plugin-astro';
import eslintComments from 'eslint-plugin-eslint-comments';
import importX from 'eslint-plugin-import-x';
import jsdoc from 'eslint-plugin-jsdoc';
import jsonc from 'eslint-plugin-jsonc';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import nodePlugin from 'eslint-plugin-n';
import noExtendNative from 'eslint-plugin-no-use-extend-native';
import perfectionist from 'eslint-plugin-perfectionist';
import playwright from 'eslint-plugin-playwright';
import promisePlugin from 'eslint-plugin-promise';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import jsoncParser from 'jsonc-eslint-parser';
import tseslint from 'typescript-eslint';

// Define the files that should receive TypeScript/Strict rules
const CODE_FILES = ['**/*.{js,mjs,cjs,ts,jsx,tsx,astro}'];

const config = [
  // 1. Global Ignores
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.astro/**',
      '.output/**',
      '**/*.d.ts',
      'test-results/**',
      'playwright-report/**',
    ],
  },

  // 2. Base Configuration
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  js.configs.recommended,

  // 3. JSDOC & DOCUMENTATION (Strict)
  jsdoc.configs['flat/recommended-typescript'],
  {
    rules: {
      'jsdoc/require-description': 'error',
      'jsdoc/require-description-complete-sentence': 'off',

      // FIXED: Use 'contexts' for TS nodes, 'require' for JS nodes
      'jsdoc/require-jsdoc': [
        'error',
        {
          publicOnly: true,
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            FunctionDeclaration: true,
            MethodDefinition: true,
          },
          contexts: ['TSInterfaceDeclaration', 'TSTypeAliasDeclaration', 'TSEnumDeclaration'],
        },
      ],

      'jsdoc/require-param': 'error',
      'jsdoc/require-param-type': 'off',
      'jsdoc/require-returns': 'error',
      'jsdoc/require-returns-type': 'off',
    },
  },

  // 4. STYLE & NAMING
  {
    rules: {
      'func-style': ['error', 'expression'],
    },
  },

  // 5. PROMISE & ASYNC SAFETY
  promisePlugin.configs['flat/recommended'],
  {
    rules: {
      'promise/always-return': 'off',
      'promise/param-names': 'error',
      'promise/catch-or-return': 'error',
    },
  },

  // 6. SECURITY
  {
    plugins: { 'no-use-extend-native': noExtendNative },
    rules: {
      'no-use-extend-native/no-use-extend-native': 'error',
    },
  },

  // 7. COMMENT STRICTNESS
  {
    plugins: { 'eslint-comments': eslintComments },
    rules: {
      'eslint-comments/require-description': 'error',
      'eslint-comments/no-unused-disable': 'error',
    },
  },

  // 8. UNICORN
  unicorn.configs.recommended,
  {
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: true,
            pascalCase: true,
          },
          ignore: ['README.md', 'import-map.json'],
        },
      ],
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/switch-case-braces': 'off',
      'unicorn/import-style': 'off',
      'unicorn/prefer-query-selector': 'off',
      'unicorn/no-await-expression-member': 'off',
      'unicorn/no-empty-file': 'off',
    },
  },

  // 9. IMPORT VALIDITY
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    settings: {
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      'import-x/no-cycle': 'error',
      'import-x/no-unresolved': ['error', { ignore: ['^astro:'] }],
      'import-x/no-duplicates': 'error',
      'import-x/order': 'off',
      'import-x/no-named-as-default': 'off',
      'import-x/no-named-as-default-member': 'off',
    },
  },

  // 10. NODE.JS RULES
  nodePlugin.configs['flat/recommended-module'],
  {
    rules: {
      'n/no-missing-import': 'off',
      'n/no-unpublished-import': 'off',
      'n/no-unsupported-features/node-builtins': 'off',
    },
  },

  // 11. PERFECTIONIST (Sorting)
  {
    plugins: { perfectionist },
    rules: {
      'perfectionist/sort-imports': ['error', { type: 'natural', order: 'asc' }],
      'perfectionist/sort-exports': ['error', { type: 'natural', order: 'asc' }],
      'perfectionist/sort-named-exports': ['error', { type: 'natural', order: 'asc' }],
      'perfectionist/sort-interfaces': ['error', { type: 'natural', order: 'asc' }],
      'perfectionist/sort-object-types': ['error', { type: 'natural', order: 'asc' }],
      'perfectionist/sort-classes': ['error', { type: 'natural', order: 'asc' }],
    },
  },

  // 12. TYPESCRIPT (Strict)
  ...tseslint.configs.strict.map((c) => ({ ...c, files: CODE_FILES })),
  ...tseslint.configs.stylistic.map((c) => ({ ...c, files: CODE_FILES })),
  {
    files: CODE_FILES,
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message: 'Enums are forbidden. Use union types or objects with "as const".',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: ['variable', 'import'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: ['objectLiteralProperty', 'typeProperty'],
          format: null,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },

  // 13. PLAYWRIGHT
  {
    files: ['**/e2e/**/*.spec.{js,ts,mjs}'],
    ...playwright.configs['flat/recommended'],
    rules: {
      'playwright/prefer-web-first-assertions': 'error',
      'playwright/no-wait-for-timeout': 'error',
    },
  },

  // 14. JSON SORTING
  ...jsonc.configs['flat/recommended-with-jsonc'],
  {
    files: ['**/*.json', '**/*.jsonc'],
    languageOptions: { parser: jsoncParser },
    rules: {
      'jsonc/sort-keys': ['error', { pathPattern: '^$', order: { type: 'asc' } }],
    },
  },

  // 15. ASTRO CONFIG
  ...astro.configs.recommended,
  ...astro.configs['jsx-a11y-strict'],
  {
    plugins: { 'jsx-a11y': jsxA11y },
  },

  // 16. ASTRO OVERRIDES
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tseslint.parser,
        project: './tsconfig.json',
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
      'jsx-a11y/alt-text': 'error',
      'n/no-unsupported-features/es-syntax': 'off',
      'n/no-missing-import': 'off',
      'func-style': ['error', 'expression'],

      // FORCE JSDoc on Component Props in Astro
      'jsdoc/require-jsdoc': [
        'error',
        {
          publicOnly: false,
          require: {
            // Standard JS/TS require blocks still apply if needed
          },
          contexts: [
            // Track the 'Props' type specifically in Astro files
            'TSTypeAliasDeclaration[id.name="Props"]',
            'ExportNamedDeclaration',
          ],
        },
      ],

      'perfectionist/sort-jsx-props': [
        'error',
        {
          type: 'natural',
          order: 'asc',
          ignoreCase: true,
          groups: ['id', 'navigation', 'meta', 'unknown', 'style', 'class'],
          customGroups: {
            id: ['id', 'name', 'key', 'ref'],
            navigation: ['href', 'src', 'action', 'method'],
            meta: ['type', 'role', 'title', 'tabindex', 'target', 'rel'],
            style: ['style'],
            class: ['class', 'class:list'],
          },
        },
      ],
    },
  },

  // 17. PRETTIER
  prettierConfig,
] satisfies Linter.Config[];

export default config;
