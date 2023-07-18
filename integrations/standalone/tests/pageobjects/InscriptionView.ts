import { Page, expect } from '@playwright/test';
import { Accordion } from './Accordion';
import { Popover } from './Popover';

export class InscriptionView {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectElement(pid: string) {
    const app = process.env.TEST_APP ?? '';
    const server = process.env.BASE_URL ? process.env.BASE_URL + app : 'localhost:8081/designer';
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

  async expectHeaderMessages(messages: string[]) {
    const headerMessages = this.page.locator('.header-messages');
    if (messages.length === 0) {
      await expect(headerMessages).toBeHidden();
    } else {
      const msgLocator = headerMessages.locator('.header-status');
      for (var index = 0; index < messages.length; index++) {
        await expect(msgLocator.nth(index)).toContainText(messages[index]);
      }
    }
  }

  async reload() {
    this.page.reload();
  }
}
