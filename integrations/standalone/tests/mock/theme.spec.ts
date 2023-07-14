import { test, expect, Page } from '@playwright/test';
import { InscriptionView } from '../pageobjects/InscriptionView';

test.describe('Theme mode dark', () => {
  test.use({
    colorScheme: 'dark'
  });

  test('dark browser', async ({ page, colorScheme: dark }) => {
    await new InscriptionView(page).mock();
    await assertThemeMode(page, 'dark');
  });

  test('light param', async ({ page }) => {
    await new InscriptionView(page).mock({ theme: 'light' });
    await assertThemeMode(page, 'light');
  });
});

test.describe('Theme mode light', () => {
  test.use({
    colorScheme: 'light'
  });

  test('light browser', async ({ page, colorScheme: dark }) => {
    await new InscriptionView(page).mock();
    await assertThemeMode(page, 'light');
  });

  test('dark param', async ({ page }) => {
    await new InscriptionView(page).mock({ theme: 'dark' });
    await assertThemeMode(page, 'dark');
  });
});

async function assertThemeMode(page: Page, theme: 'dark' | 'light'): Promise<void> {
  await expect(page.locator('.editor-root')).toHaveCSS('color-scheme', theme);
}
