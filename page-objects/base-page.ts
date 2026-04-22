import { Page } from '@playwright/test';

export class BasePage {
  constructor(public readonly page: Page) {}

  async goto(path: string = '') {
    const baseURL = 'http://136.243.9.168:5175';
    await this.page.goto(`${baseURL}${path}`);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async screenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }
}
