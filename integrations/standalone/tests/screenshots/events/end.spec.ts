import { test } from '../../test';
import { screenshotTab } from '../utils/screenshot-util';

const END_PID = {
  PAGE: '16BADA40155E7401-f1',
  ERROR: '16BBC1007C5F8F69-f2'
} as const;

test.describe('Process End view', () => {
  test('End view Tab', async ({ view }) => {
    await screenshotTab(view, END_PID.PAGE, 'End view', 'process-end-view-tab-end-view.png');
  });
});

test.describe('Error End', () => {
  test.skip('Error Tab', async ({ view }) => {
    await screenshotTab(view, END_PID.ERROR, 'Error', 'error-end-event-tab-error.png');
  });
});
