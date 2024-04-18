import { test as base, type Page, type Locator } from '@playwright/test';


class AdminPage {
  // Page signed in as "admin".
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
}
class UserPage {
  // Page signed in as "user".
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
}

// Declare the types of your fixtures.
type MyFixtures = {
  adminPage: AdminPage;
  userPage: UserPage;
};

export * from '@playwright/test';
export const test = base.extend<MyFixtures>({
  adminPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: process.env.admin_user_token_path });
    const adminPage = new AdminPage(await context.newPage());
    await use(adminPage);
    await context.close();
  },
  userPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: process.env.group_user_token_path });
    const userPage = new UserPage(await context.newPage());
    await use(userPage);
    await context.close();
  },
});