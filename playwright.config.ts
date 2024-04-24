import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
const modeExt = process.env.TEST_MODE || 'development';
dotenv.config({ path: '.env' });
dotenv.config({ path: `.env.${modeExt}`, override: true });


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './testCase',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['playwright-json-summary-reporter'],
    ['html'], // other reporters
    ['dot']
  ],
  outputDir: 'test-results',
  globalSetup: './utils/ENV-setup.ts',
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 5000,
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    // baseURL: 'https://staging-app.kawo.com/',
    baseURL: process.env.BASE_URL,
    // storageState: '.auth/admin_user.json',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    // extraHTTPHeaders: {
    //   // We set this header per GitHub guidelines.
    //   'Content-Type': 'application/json',
    //   'Accept': '*/*',
    //   // Add authorization token to all requests.
    //   // Assuming personal access token available in the environment.
    //   'Authorization': origins[0].localStorage[4].value,
    // }
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project
    // { name: 'setup', testMatch: /.*\.setup\.ts/ },
    { name: 'setup', testMatch: /.*\**\.ts/ },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
            // Use prepared auth state.
            // storageState: '.auth/user.json',
     },
      dependencies: ['setup'],
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    //   dependencies: ['setup'],
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    //   dependencies: ['setup'],
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
