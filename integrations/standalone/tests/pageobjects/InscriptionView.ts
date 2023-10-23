import { Page, expect } from '@playwright/test';
import { Accordion } from './Accordion';
import { Popover } from './Popover';

export class InscriptionView {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  static async selectElement(page: Page, pid: string) {
    const view = new InscriptionView(page);
    const server = process.env.BASE_URL ?? 'localhost:8081';
    const serverUrl = server.replace(/^https?:\/\//, '');
    const url = `?server=${serverUrl}&pid=${pid}`;
    await page.goto(url);
    await this.initPage(page);
    return view;
  }

  static async mock(page: Page, options?: { type?: string; readonly?: boolean; theme?: string }) {
    const view = new InscriptionView(page);
    let url = 'mock.html';
    if (options) {
      url += '?';
      if (options.type) {
        url += `type=${options.type}&`;
      }
      if (options.readonly) {
        url += `readonly=${options.readonly}&`;
      }
      if (options.theme) {
        url += `theme=${options.theme}&`;
      }
    }
    await page.goto(url);
    await this.initPage(page);
    return view;
  }

  static async initPage(page: Page) {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addStyleTag({ content: `.ReactQueryDevtools { display: none; }` });
  }

  accordion(partName: string) {
    return new Accordion(this.page, partName);
  }

  popover() {
    return new Popover(this.page);
  }

  async expectHeaderText(text: string, timeout?: number) {
    await expect(this.page.getByText(text).first()).toBeVisible({ timeout });
  }

  async reload() {
    this.page.reload();
  }
}
