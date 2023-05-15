import { devices, PlaywrightTestConfig } from '@playwright/test';
import defaultConfig from '../../playwright.config';

const config: PlaywrightTestConfig = defaultConfig;
config.testDir = './';
config.projects = [
  {
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome'],
      viewport: { width: 800, height: 300 },
      contextOptions: { reducedMotion: 'reduce' }
    }
  }
];
config.webServer = {
  command: 'yarn start',
  url: 'http://localhost:3000',
  reuseExistingServer: !process.env.CI
};

export default config;
