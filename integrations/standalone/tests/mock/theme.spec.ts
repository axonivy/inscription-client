import { InscriptionView } from '../pageobjects/InscriptionView';
import { test, expect } from '../test';

test.describe('Theme mode dark', () => {
  test.use({
    colorScheme: 'dark'
  });

  test('dark browser', async ({ view, colorScheme: dark }) => {
    await view.mock();
    await assertThemeMode(view, 'dark');
  });

  test('light param', async ({ view }) => {
    await view.mock({ theme: 'light' });
    await assertThemeMode(view, 'light');
  });
});

test.describe('Theme mode light', () => {
  test.use({
    colorScheme: 'light'
  });

  test('light browser', async ({ view, colorScheme: dark }) => {
    await view.mock();
    await assertThemeMode(view, 'light');
  });

  test('dark param', async ({ view }) => {
    await view.mock({ theme: 'dark' });
    await assertThemeMode(view, 'dark');
  });
});

async function assertThemeMode(view: InscriptionView, theme: 'dark' | 'light'): Promise<void> {
  await expect(view.page.locator('.editor-root')).toHaveCSS('color-scheme', theme);
}
