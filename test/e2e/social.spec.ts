// test/e2e/social.spec.ts
import { expect, test } from '@playwright/test';

import { site } from '../../src/lib/data/site-content';

test.describe('Social & SEO Metadata', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Open Graph (Facebook/LinkedIn) tags', async ({ page }) => {
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
      'content',
      site.name,
    );
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');

    // Check Title
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content');

    // Check Image
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toBeAttached();
    // Ensure it is an absolute URL
    await expect(ogImage).toHaveAttribute('content', /^https?:\/\//);
  });

  test('Twitter Card tags', async ({ page }) => {
    await expect(page.locator('meta[property="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    );

    // If you have a twitter handle set in config, check it
    if (site.social.twitter) {
      await expect(page.locator('meta[property="twitter:creator"]')).toHaveAttribute(
        'content',
        site.social.twitter,
      );
    }
  });

  test('Hreflang and Canonical tags', async ({ page }) => {
    // Canonical
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /^https?:\/\//);

    // Hreflang
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toBeAttached();
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toBeAttached();
  });
});
