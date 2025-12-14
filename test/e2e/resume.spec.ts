import AxeBuilder from '@axe-core/playwright';
// test/e2e/resume.spec.ts
import { expect, test } from '@playwright/test';

test.describe('Resume Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/resume');
    // Disable animations to prevent Playwright from waiting indefinitely
    await page.addStyleTag({
      content: `
        *,
        *::before,
        *::after {
          transition-property: none !important;
          transform: none !important;
          animation: none !important;
        }
      `,
    });
  });

  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    // This scans the loaded page for WCAG violations

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should display the main sections', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '10x Programmer' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Summary' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Skills' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Education' })).toBeVisible();
  });

  test('should display the skills', async ({ page }) => {
    await expect(page.getByText('GCP')).toBeVisible();
    await expect(page.getByText('AWS')).toBeVisible();
    await expect(page.getByText('svelte')).toBeVisible();
    await expect(page.getByText('rust')).toBeVisible();
    await expect(page.getByText('Godot')).toBeVisible();
  });
});
