import { test } from '@playwright/test';
import { screenshotTab } from '../utils/screenshot-util';

const INTERMEDIATE_PID = {
  WAIT: '16C70B87DCB65433-f0'
} as const;

test.describe('Wait Program', () => {
  test.skip('Event Tab', async ({ page }) => {
    await screenshotTab(page, INTERMEDIATE_PID.WAIT, 'Event', 'wait-intermediate-event-tab-event.png');
  });

  test.skip('Editor Tab', async ({ page }) => {
    await screenshotTab(page, INTERMEDIATE_PID.WAIT, 'Editor', 'wait-intermediate-event-tab-editor.png');
  });

  test.skip('Task Tab', async ({ page }) => {
    await screenshotTab(page, INTERMEDIATE_PID.WAIT, 'Task', 'wait-intermediate-event-tab-task.png');
  });
});
