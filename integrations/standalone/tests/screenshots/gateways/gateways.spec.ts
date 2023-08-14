import { test } from '../../test';
import { screenshotTab } from '../utils/screenshot-util';

const GATEWAY_PID = {
  ALTERNATIVE: '16B9DA1B2A591E8C-f2',
  TASKS: '167C7307A5664620-f9'
} as const;

test.describe('Alternative', () => {
  test('Condition Tab', async ({ view }) => {
    await screenshotTab(view, GATEWAY_PID.ALTERNATIVE, 'Condition', 'alternative-tab-condition.png');
  });
});

test.describe('Task Switch Gateway', () => {
  test('Tasks Tab', async ({ view }) => {
    await screenshotTab(view, GATEWAY_PID.TASKS, 'Tasks', 'task-switch-gateway-tab-task.png');
  });
});
