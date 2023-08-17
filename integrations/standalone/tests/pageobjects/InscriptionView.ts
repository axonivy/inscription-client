import { Page, expect } from '@playwright/test';
import { Accordion } from './Accordion';
import { Popover } from './Popover';
import { GlspHelper } from '../glsp-helper';
import { ElementType } from '@axonivy/inscription-protocol';

export class InscriptionView {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    page.emulateMedia({ reducedMotion: 'reduce' });
  }

  async selectElement(pid: string) {
    const server = process.env.BASE_URL ?? 'localhost:8081';
    var serverUrl = server.replace(/^https?:\/\//, '');
    var url = `?server=${serverUrl}&pid=${pid}`;
    await this.page.goto(url);
  }

  async type(
    type: ElementType,
    options?: {
      location?: { x: number; y: number };
      connectTo?: ElementType[];
      additionalElements?: ElementType[];
      boundaryType?: 'error' | 'signal';
    }
  ) {
    const glsp = new GlspHelper();
    const processId = await glsp.initProcess();
    let elementId = await glsp.createElement(processId, type, options?.location);
    if (options?.connectTo) {
      for (const connectType of options.connectTo) {
        const newElementId = await glsp.createElement(processId, connectType, { x: 200, y: 200 });
        await glsp.connect(elementId, newElementId);
      }
    }
    if (options?.additionalElements) {
      for (const elementType of options.additionalElements) {
        await glsp.createElement(processId, elementType, { x: 200, y: 200 });
      }
    }
    if (options?.boundaryType) {
      elementId = await glsp.attachBoundary(elementId, options.boundaryType);
    }
    await this.selectElement(elementId);
    return { processId, elementId };
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
