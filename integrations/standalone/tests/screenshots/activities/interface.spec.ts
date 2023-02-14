import { test } from '@playwright/test';
import { screenshotTab } from '../utils/screenshot-util';

const INTERFACE_PID = {
  DATABASE: '18141E75C9CEDD35-f3',
  WS_CALL: '160DF556A2226E66-f6',
  REST: '159FF3D428E42BB5-f46',
  REST_POST: '159FF3D428E42BB5-f39',
  EMAIL: '180D20366E0D3C6D-f3',
  RULE: '175083477C6BF05D-f3',
  PROGRAM: '16C70B87DCB65433-f8'
} as const;

test.describe('Database', () => {
  test.skip('Query Tab', async ({ page }) => {
    await screenshotTab(page, INTERFACE_PID.DATABASE, 'Query', 'database-tab-query.png');
  });
});

test.describe('Web Service Call', () => {
  test.skip('Request Tab', async ({ page }) => {
    await screenshotTab(page, INTERFACE_PID.WS_CALL, 'Request', 'web-service-call-tab-request.png');
  });

  test.skip('Response Tab', async ({ page }) => {
    await screenshotTab(page, INTERFACE_PID.WS_CALL, 'Response', 'web-service-call-tab-response.png');
  });
});

test.describe('Rest Client', () => {
  test.skip('Request Tab - GET', async ({ page }) => {
    await screenshotTab(page, INTERFACE_PID.REST, 'Request', 'rest-client-tab-request-get.png');
  });

  test.skip('Request Tab - POST', async ({ page }) => {
    await screenshotTab(page, INTERFACE_PID.REST_POST, 'Request', 'rest-client-tab-request-post.png');
  });

  test.skip('Response Tab', async ({ page }) => {
    await screenshotTab(page, INTERFACE_PID.REST_POST, 'Response', 'rest-client-tab-response.png');
  });
});

test.describe('Email', () => {
  test.skip('Header Tab', async ({ page }) => {
    await screenshotTab(page, INTERFACE_PID.EMAIL, 'Header', 'mail-tab-header.png');
  });

  test.skip('Content Tab', async ({ page }) => {
    await screenshotTab(page, INTERFACE_PID.EMAIL, 'Content', 'mail-tab-content.png');
  });

  test.skip('Attachments Tab', async ({ page }) => {
    await screenshotTab(page, INTERFACE_PID.EMAIL, 'Attachments', 'mail-tab-attachments.png');
  });
});

test.describe('Rule', () => {
  test.skip('Call Tab', async ({ page }) => {
    await screenshotTab(page, INTERFACE_PID.RULE, 'Call', 'rule-tab-call.png');
  });
});

test.describe('Program', () => {
  test.skip('Start Tab', async ({ page }) => {
    await screenshotTab(page, INTERFACE_PID.PROGRAM, 'Start', 'program-interface-tab-start.png');
  });

  test.skip('Editor Tab', async ({ page }) => {
    await screenshotTab(page, INTERFACE_PID.PROGRAM, 'Editor', 'program-interface-tab-editor.png');
  });
});
