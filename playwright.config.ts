// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './test/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html', // Generates a nice visual report

  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry', // Record a "video" of the test if it fails
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Auto-start your Astro server before running tests
  webServer: {
    command: 'pnpm run preview', // Uses the production build (more accurate)
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: 'ignore',
    stderr: 'pipe',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
})
