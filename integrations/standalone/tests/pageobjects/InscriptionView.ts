import { Page, expect } from '@playwright/test';
import { Accordion } from './Accordion';

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

  accordion(partName: string) {
    return new Accordion(this.page, partName);
  }

  async expectHeaderText(text: string) {
    await expect(this.page.getByText(text).first()).toBeVisible();
  }

  reload() {
    this.page.reload();
  }
}
