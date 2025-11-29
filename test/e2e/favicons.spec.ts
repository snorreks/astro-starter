// test/e2e/favicons.spec.ts
import { expect, test } from '@playwright/test';

test.describe('Favicons & Assets', () => {
  test('HTML head should contain correct favicon links', async ({ page }) => {
    await page.goto('/');

    // 1. Primary SVG (Scalable)
    await expect(page.locator('link[rel="icon"][href="/favicon.svg"]').first()).toBeAttached();

    // 2. Legacy ICO (32x32)
    const ico = page.locator('link[rel="icon"][href="/favicon.ico"]');
    await expect(ico).toBeAttached();
    await expect(ico).toHaveAttribute('sizes', '32x32');

    // 3. Apple Touch (180x180)
    const apple = page.locator('link[rel="apple-touch-icon"]');
    await expect(apple).toBeAttached();
    await expect(apple).toHaveAttribute('href', '/apple-touch-icon.png');

    // 4. Manifest
    await expect(page.locator('link[rel="manifest"]')).toBeAttached();
  });

  test('Physical asset files should exist (HTTP 200)', async ({ request }) => {
    // This verifies your "pnpm generate" script actually ran before build/test
    const files = [
      '/favicon.ico',
      '/favicon.svg',
      '/apple-touch-icon.png',
      '/icon-192.png', // From Manifest
      '/icon-512.png', // From Manifest
      '/site.webmanifest',
      '/robots.txt',
      '/sitemap-index.xml',

      '/images/site_image.jpg',
    ];

    for (const file of files) {
      const response = await request.get(file);
      expect(response.status(), `Checking ${file}`).toBe(200);
    }
  });

  test('Manifest should be valid JSON and contain icons', async ({ request }) => {
    const response = await request.get('/site.webmanifest');
    expect(response.status()).toBe(200);

    const json = await response.json();
    expect(json.name).toBeTruthy();
    expect(json.icons).toHaveLength(2); // 192 and 512
    expect(json.display).toBe('standalone');
  });
});
