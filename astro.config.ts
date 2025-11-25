// astro.config.ts

import partytown from '@astrojs/partytown'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import compress from 'astro-compress'
import robotsTxt from 'astro-robots-txt'
import { defineConfig, envField } from 'astro/config'

const LOCALES = {
  en: 'en-US', // English (United States)
} as const

const localeKeys = Object.keys(LOCALES) as (keyof typeof LOCALES)[]

const defaultLocale = 'en'

import { site } from './src/lib/data/site-content'

// https://astro.build/config
export default defineConfig({
  output: 'static',

  env: {
    schema: {
      GOOGLE_ANALYTICS_ID: envField.string({ context: 'client', access: 'public' }),
    },
  },

  site: site.url,
  integrations: [
    robotsTxt({
      sitemap: true, // specific sitemap URL is auto-generated
      policy: [
        {
          userAgent: '*',
          allow: '/',
          // Don't waste crawl budget on 404s or private assets
          disallow: ['/404', '/_astro/'],
        },
      ],
    }),
    compress({
      // Astro already optimizes images.
      // Turning this off speeds up your build significantly.
      Image: false,

      // We want to minify SVG icons though
      SVG: true,

      // Aggressive HTML minification settings based on the types you sent
      HTML: {
        'html-minifier-terser': {
          removeComments: true,
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          // You can add other specific options here if needed
        },
      },
    }),
    sitemap({
      i18n: {
        defaultLocale,
        locales: LOCALES,
      },
      changefreq: 'weekly',
      priority: 1.0,
      namespaces: {
        news: false, // FALSE: You are not a news publisher (Google News)
        video: false, // FALSE: You don't host raw video files for indexing
        image: false, // FALSE: Standard Google Image crawling is enough for business sites

        // TRUE: This is CRITICAL for multi-language SEO.
        // It allows the sitemap to add 'xhtml:link' tags so Google
        // understands which page translates to which.
        xhtml: true,
      },
    }),
    partytown({
      config: {
        forward: ['dataLayer.push', 'gtag'],
      },
    }),
  ],

  vite: {
    // see https://github.com/tailwindlabs/tailwindcss/issues/18802
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plugins: [tailwindcss() as any],
  },

  i18n: {
    defaultLocale,
    locales: localeKeys,
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
})
