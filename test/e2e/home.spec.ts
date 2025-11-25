// test/e2e/home.spec.ts
import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has correct metadata', async ({ page }) => {
    await expect(page).toHaveTitle(/Astro Starter/)
  })

  test('should not have any accessibility issues', async ({ page }) => {
    // This scans the loaded page for WCAG violations
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    // If this fails, it means you have bad contrast, missing aria-labels, etc.
    expect(accessibilityScanResults.violations).toEqual([])
  })

  // Uncomment this if you want to enable visual regression testing
  // test('visual regression check', async ({ page }) => {
  //   // This compares the current page screenshot to a "golden" image saved in your repo
  //   await expect(page).toHaveScreenshot('homepage-snapshot.png', {
  //     maxDiffPixels: 100, // Allow tiny rendering differences
  //     fullPage: true, // Take a picture of the whole scrollable page
  //   })
  // })
})
