// astro.config.ts

import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import compress from 'astro-compress';
import robotsTxt from 'astro-robots-txt';
import { defineConfig, envField } from 'astro/config';

import { site } from './src/lib/data/site-content';

// https://astro.build/config
export default defineConfig({
  output: 'static',

  env: {
    schema: {
      GOOGLE_ANALYTICS_ID: envField.string({
        context: 'client',
        access: 'public',
        //   optional: true
      }),
      MICROSOFT_CLARITY_ID: envField.string({
        context: 'client',
        access: 'public',
        //optional: true
      }),
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
          disallow: ['/404', '/~partytown/'],
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
          // Extra optimization: remove empty attributes
          removeEmptyAttributes: true,
          // Extra optimization: remove script type="text/javascript" (default in HTML5)
          removeScriptTypeAttributes: true,
          // Extra optimization: remove style="text/css"
          removeStyleLinkTypeAttributes: true,
        },
      },
    }),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US' },
      },
      changefreq: 'weekly',
      priority: 1,
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
        forward: [
          'dataLayer.push', // For Google Analytics 4
          'gtag', // For Google Analytics 4
          'clarity', // For Microsoft Clarity (Custom tags/identify)
        ],
      },
    }),
  ],

  vite: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Pending fix: https://github.com/tailwindlabs/tailwindcss/issues/18802
    plugins: [tailwindcss() as any],
  },
});
