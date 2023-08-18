import { defineConfig, devices } from '@playwright/test';

const config = defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0, //Maybe after undo is implemented: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['../custom-reporter.ts'], ['junit', { outputFile: 'report.xml' }], ['list']] : 'html',
  use: {
    actionTimeout: 0,
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
    headless: process.env.CI ? true : false
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        contextOptions: { reducedMotion: 'reduce' }
      }
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox']
      }
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari']
      }
    }
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'yarn start:mock',
    url: 'http://localhost:3000/mock.html',
    reuseExistingServer: !process.env.CI
  }
});

export default config;
