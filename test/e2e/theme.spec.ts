// test/e2e/theme.spec.ts
import { expect, test } from '@playwright/test';

test.describe('Theme Toggling', () => {
  test('should toggle the theme when the theme button is clicked', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    const body = page.locator('body');
    const themeToggleButton = page.getByLabel('Toggle theme');

    const lightThemeBgColor = 'oklch(1 0 0)';
    const darkThemeBgColor = 'oklch(0.249 0.012 263.43)';

    // 1. Check initial theme based on prefers-color-scheme: light
    // We assume the test runner is in light mode.
    await expect(html).not.toHaveClass(/dark/);
    await expect(page.locator('#theme-toggle-light-icon')).toBeVisible();
    await expect(page.locator('#theme-toggle-dark-icon')).toBeHidden();
    await expect(body).toHaveCSS('background-color', lightThemeBgColor);

    // 2. Click the button to switch to dark mode
    await themeToggleButton.click();

    // Verify dark mode is applied
    await expect(html).toHaveClass(/dark/);
    await expect(page.locator('#theme-toggle-light-icon')).toBeHidden();
    await expect(page.locator('#theme-toggle-dark-icon')).toBeVisible();
    await expect(body).toHaveCSS('background-color', darkThemeBgColor);
    // Check localStorage
    const theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(theme).toBe('dark');

    // 3. Click the button again to switch back to light mode
    await themeToggleButton.click();

    // Verify light mode is re-applied
    await expect(html).not.toHaveClass(/dark/);
    await expect(page.locator('#theme-toggle-light-icon')).toBeVisible();
    await expect(page.locator('#theme-toggle-dark-icon')).toBeHidden();
    await expect(body).toHaveCSS('background-color', lightThemeBgColor);
    // Check localStorage
    const theme2 = await page.evaluate(() => localStorage.getItem('theme'));
    expect(theme2).toBe('light');
  });
});
