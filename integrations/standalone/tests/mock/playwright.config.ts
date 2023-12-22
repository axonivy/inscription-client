import { defineConfig } from '@playwright/test';
import defaultConfig from '../../playwright.base';

export default defineConfig(defaultConfig, {
  testDir: './',
  timeout: 1000 * 30,
  use: {
    baseURL: 'http://localhost:3000/mock.html'
  },
  retries: process.env.CI ? 1 : 0,
  webServer: {
    command: 'yarn start:mock',
    url: 'http://localhost:3000/mock.html',
    reuseExistingServer: !process.env.CI
  }
});
