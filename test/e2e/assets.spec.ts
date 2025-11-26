// test/e2e/assets.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Assets & Branding', () => {
  test('favicons and manifest should exist in the DOM', async ({ page }) => {
    await page.goto('/')

    // Check for the standard favicon
    await expect(page.locator('link[rel="icon"][href="/favicon.ico"]')).toBeAttached()

    // Check for the SVG favicon (modern browsers)
    await expect(page.locator('link[rel="icon"][href="/favicon.svg"]')).toBeAttached()

    // Check for the Web Manifest (PWA support)
    await expect(page.locator('link[rel="manifest"]')).toBeAttached()
  })

  test('branding files should be served correctly (HTTP 200)', async ({ request }) => {
    // We use the 'request' fixture to ping the files directly without loading the UI
    // This ensures your build process actually copied the files to /public

    const filesToCheck = [
      '/favicon.ico',
      '/favicon.svg',
      '/site.webmanifest',
      '/sitemap-index.xml',
      '/robots.txt',
      '/social_preview_image.jpg',
    ]

    for (const file of filesToCheck) {
      const response = await request.get(file)
      expect(response.status(), `File ${file} should exist`).toBe(200)
    }
  })

  test('logo should be visible and have alt text', async ({ page }) => {
    await page.goto('/')

    const logo = page.locator('header nav a img') // Adjust selector based on your HTML structure
    await expect(logo).toBeVisible()
    await expect(logo).toHaveAttribute('alt', /Logo/)
  })
})
