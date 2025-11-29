// test/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // We pass 'isMobile' to detect if we are running on the Pixel 5 project
  test('navbar links should be visible on desktop', async ({ page, isMobile }) => {
    // Skip this test if we are on a mobile device because the menu is hidden
    if (isMobile) {
      test.skip();
    }

    // FIX: We scope the locator to 'header nav' to avoid finding the "Get Started" button in the hero
    const nav = page.locator('header nav');

    await expect(nav.getByRole('link', { name: 'Services' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Contact' })).toBeVisible();
  });

  test('social links should work and open in new tabs', async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip(); // Social links are hidden on mobile in your current CSS
    }

    // FIX: Use a more specific selector than just ".justify-end"
    // We look for the container that holds the social links
    const socialContainer = page.locator('header nav div').last();
    const socialLinks = socialContainer.locator('a');

    const count = await socialLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; ++i) {
      const link = socialLinks.nth(i);
      await expect(link).toHaveAttribute('target', '_blank');

      // Optional: Check if href is valid
      const href = await link.getAttribute('href');
      expect(href).toMatch(/^https?:\/\//);
    }
  });

  test('footer should render with copyright', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    // Using a regex makes the test resilient to year changes (2024, 2025, etc.)
    await expect(footer).toContainText(/All rights reserved/);
  });
});
