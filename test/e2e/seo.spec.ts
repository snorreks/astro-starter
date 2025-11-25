// test/e2e/seo.spec.ts
import { test, expect } from '@playwright/test'

import { site } from '../../src/lib/data/site-content'

test.describe('SEO & Metadata', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has correct basic meta tags', async ({ page }) => {
    await expect(page).toHaveTitle(new RegExp(site.name))

    const description = page.locator('meta[name="description"]')
    // Ensure description matches what is in site-content.ts
    await expect(description).toHaveAttribute('content', site.description)

    // FIX: Expect the Production URL defined in your config, not localhost
    // We construct a Regex because there might be trailing slashes
    const urlRegex = new RegExp(site.url)

    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', urlRegex)
  })

  test('has valid JSON-LD Structured Data', async ({ page }) => {
    const jsonLdScript = page.locator('script[type="application/ld+json"]')
    const textContent = await jsonLdScript.textContent()

    expect(textContent).toBeTruthy()

    if (textContent) {
      const json = JSON.parse(textContent)

      expect(json['@context']).toBe('https://schema.org')
      expect(json['@type']).toBe('Organization')
      expect(json.name).toBe(site.name)
      // FIX: Check against the configured site URL
      expect(json.url).toContain(site.url)
    }
  })

  test('has correct Open Graph (Social) tags', async ({ page }) => {
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', new RegExp(site.name))

    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website')

    // We use a regex for the image too, so we don't worry about localhost vs production domains in the test
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /social_preview_image/)
  })

  test('has correct Hreflang tags for i18n', async ({ page }) => {
    const enLink = page.locator('link[rel="alternate"][hreflang="en"]')
    await expect(enLink).toBeAttached()
    const xDefault = page.locator('link[rel="alternate"][hreflang="x-default"]')
    await expect(xDefault).toBeAttached()
  })
})
