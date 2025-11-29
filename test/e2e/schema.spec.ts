// test/e2e/schema.spec.ts
import { expect, test } from '@playwright/test';

import { site } from '../../src/lib/data/site-content';

test.describe('JSON-LD Schema', () => {
  test('should render valid Graph-based JSON-LD', async ({ page }) => {
    await page.goto('/');

    const script = page.locator('script[type="application/ld+json"]');

    await expect(script).toHaveCount(1);

    const textContent = await script.textContent();

    if (textContent) {
      const json = JSON.parse(textContent);

      // 1. Verify Context
      expect(json['@context']).toBe('https://schema.org');
      expect(json['@graph']).toBeInstanceOf(Array);

      const graph = json['@graph'];

      // 2. Find WebSite Node
      const website = graph.find((node: Record<string, unknown>) => node['@type'] === 'WebSite');
      expect(website).toBeDefined();
      expect(website.name).toBe(site.name);
      expect(website.url).toBe(site.url);

      // 3. Find Identity (Organization) Node
      const org = graph.find((node: Record<string, unknown>) => node['@type'] === 'Organization');
      expect(org).toBeDefined();
      expect(org.name).toBe(site.name);

      // 4. Verify Connection (WebSite should publish Identity)
      expect(website.publisher['@id']).toContain('#identity');
    }
  });
});
