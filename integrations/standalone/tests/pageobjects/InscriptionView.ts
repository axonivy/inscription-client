import { Page, expect } from '@playwright/test';
import { Accordion } from './Accordion';
import { Popover } from './Popover';

export class InscriptionView {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectElement(pid: string) {
    const server = process.env.BASE_URL ?? 'localhost:8081';
    var serverUrl = server.replace(/^https?:\/\//, '');
    var url = `?server=${serverUrl}&pid=${pid}`;
    await this.page.goto(url);
  }

  async mock(options?: { type?: string; readonly?: boolean; theme?: string }) {
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
    await this.page.goto(url);
  }

  accordion(partName: string) {
    return new Accordion(this.page, partName);
  }

  popover() {
    return new Popover(this.page);
  }

  async expectHeaderText(text: string) {
    await expect(this.page.getByText(text).first()).toBeVisible();
  }

  async reload() {
    this.page.reload();
  }
}
