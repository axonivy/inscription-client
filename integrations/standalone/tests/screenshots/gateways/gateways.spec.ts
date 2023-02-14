import { test } from '@playwright/test';
import { screenshotTab } from '../utils/screenshot-util';

const GATEWAY_PID = {
  ALTERNATIVE: '16B9DA1B2A591E8C-f2',
  TASKS: '167C7307A5664620-f9'
} as const;

test.describe('Alternative', () => {
  test.skip('Condition Tab', async ({ page }) => {
    await screenshotTab(page, GATEWAY_PID.ALTERNATIVE, 'Condition', 'alternative-tab-condition.png');
  });
});

test.describe('Task Switch Gateway', () => {
  test.skip('Tasks Tab', async ({ page }) => {
    await screenshotTab(page, GATEWAY_PID.TASKS, 'Tasks', 'task-switch-gateway-tab-task.png');
  });
});
