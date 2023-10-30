import { test } from '@playwright/test';
import { screenshotTab } from './utils/screenshot-util';

const GENERIC_PID = {
  SCRIPT: '168F0C6DF682858E-f3',
  USER_TASK: '168F0C6DF682858E-f5',
  WS_CALL: '160DF556A2226E66-f3',
  SUB_START: '16A7DD0A1D330578-f0'
} as const;

test.describe('Generic Tabs', () => {
  test('Name Tab', async ({ page }) => {
    await screenshotTab(page, GENERIC_PID.SCRIPT, 'General', 'tab-name.png');
  });

  test('Output Tab', async ({ page }) => {
    await screenshotTab(page, GENERIC_PID.USER_TASK, 'Output', 'tab-output.png');
  });

  test('Code Tab', async ({ page }) => {
    await screenshotTab(page, GENERIC_PID.SCRIPT, 'Code', 'tab-code.png');
  });

  test.skip('Start Tab', async ({ page }) => {
    await screenshotTab(page, GENERIC_PID.SUB_START, 'Start', 'tab-start.png');
  });

  test.skip('Result Tab', async ({ page }) => {
    await screenshotTab(page, GENERIC_PID.SUB_START, 'Result', 'tab-result.png');
  });

  test.skip('Data Cache Tab', async ({ page }) => {
    await screenshotTab(page, GENERIC_PID.WS_CALL, 'Data Cache', 'tab-data-cache.png');
  });

  test('Case Tab', async ({ page }) => {
    await screenshotTab(page, GENERIC_PID.USER_TASK, 'Case', 'tab-case.png');
  });

  test('Task Tab', async ({ page }) => {
    await screenshotTab(page, GENERIC_PID.USER_TASK, 'Task', 'tab-task.png');
  });

  test('Call Tab', async ({ page }) => {
    await screenshotTab(page, GENERIC_PID.USER_TASK, 'Call', 'tab-call.png');
  });
});
