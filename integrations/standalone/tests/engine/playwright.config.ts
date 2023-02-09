import { devices, PlaywrightTestConfig } from '@playwright/test';
import defaultConfig from '../../playwright.config';

const config: PlaywrightTestConfig = defaultConfig;
config.testDir = './';
config.projects = [
  {
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome']
    }
  }
];
config.webServer = {
  command: 'yarn start',
  url: 'http://localhost:3000',
  reuseExistingServer: !process.env.CI
};

export default config;
