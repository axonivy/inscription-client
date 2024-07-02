import { defineConfig } from '@playwright/test';
import defaultConfig from '../../playwright.base';

const baseUrl = process.env.CI ? 'http://localhost:4173/mock.html' : 'http://localhost:3000/mock.html';

export default defineConfig(defaultConfig, {
  testDir: './',
  timeout: 1000 * 60,
  use: {
    baseURL: baseUrl
  },
  retries: process.env.CI ? 1 : 0,
  webServer: {
    command: 'yarn serve',
    url: baseUrl,
    reuseExistingServer: !process.env.CI
  }
});
