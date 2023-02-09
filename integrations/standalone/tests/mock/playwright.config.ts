import type { PlaywrightTestConfig } from '@playwright/test';
import defaultConfig from '../../playwright.config';

const config: PlaywrightTestConfig = defaultConfig;
config.testDir = './';
config.use!.baseURL = 'http://localhost:3000/mock.html';
config.webServer = {
  command: 'yarn start:mock',
  url: 'http://localhost:3000/mock.html',
  reuseExistingServer: !process.env.CI
};

export default config;
