import { test } from '@playwright/test';
import { screenshotTab } from '../utils/screenshot-util';

const WORKFLOW_PID = {
  CALL_SUB: '16BD5F7B1D71F926-f2',
  TRIGGER: '16BD5F7B1D71F926-f7'
} as const;

test.describe('Call Sub', () => {
  test('Process Call Tab', async ({ page }) => {
    await screenshotTab(page, WORKFLOW_PID.CALL_SUB, 'Process call', 'call-sub-tab-process-call.png');
  });
});

test.describe('Trigger', () => {
  test('Trigger Tab', async ({ page }) => {
    await screenshotTab(page, WORKFLOW_PID.TRIGGER, 'Trigger', 'trigger-tab-trigger.png');
  });
});
