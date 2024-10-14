import { defineConfig, devices } from '@playwright/test';
import defaultConfig from '../../playwright.base';

export default defineConfig(defaultConfig, {
  testDir: './',
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 500, height: 1000 },
        contextOptions: { reducedMotion: 'reduce' }
      }
    }
  ],
  timeout: 1000 * 60,
  webServer: {
    command: 'npm run serve',
    url: process.env.CI ? 'http://localhost:4173' : 'http://localhost:3000',
    reuseExistingServer: !process.env.CI
  }
});
