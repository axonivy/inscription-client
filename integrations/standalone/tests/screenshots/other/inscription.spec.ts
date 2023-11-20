import { test } from '@playwright/test';
import { screenshotAccordion } from '../utils/screenshot-util';

const SCRIPT_PID = '168F0C6DF682858E-f3' as const;

test.describe('Inscription View', () => {
  test('Example', async ({ page }) => {
    await screenshotAccordion(page, SCRIPT_PID, 'Output', 'example-inscription-view.png', true);
  });
});
