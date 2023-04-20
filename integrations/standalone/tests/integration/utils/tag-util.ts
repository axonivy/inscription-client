import { expect, Page } from '@playwright/test';
import { CollapseUtil } from './collapse-util';

export namespace TagUtil {
  export async function addTags(page: Page, tags: string[]) {
    await CollapseUtil.open(page, 'Tags');
    for (let i = 0; i < tags.length; i++) {
      await page.getByRole('button', { name: 'Add new tag' }).click();
      const input = page.getByLabel('New Tag', { exact: true });
      await input.fill(tags[i]);
      await input.press('Enter');
    }
  }

  export async function clearTags(page: Page, tags: string[]) {
    for (let i = 0; i < tags.length; i++) {
      await page.getByRole('button', { name: `Remove Tag ${tags[i]}` }).click();
    }
  }

  export async function assertTags(page: Page, tags: string[]) {
    for (let i = 0; i < tags.length; i++) {
      await expect(page.getByRole('gridcell').nth(i)).toHaveText(tags[i]);
    }
  }

  export async function assertEmpty(page: Page) {
    await CollapseUtil.assertClosed(page, 'Tags');
  }
}
