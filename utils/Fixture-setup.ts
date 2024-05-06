import { test as base, type Page } from '@playwright/test';

class Roles {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
}
// Declare the types of your fixtures.
type MyFixtures = {
  orgOwner,groupOwner,brandOwner,operator: Roles;
};

export * from '@playwright/test';
export const test = base.extend<MyFixtures>({
  orgOwner: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: process.env.org_owner_token_path });
    const orgOwner = new Roles(await context.newPage());
    await use(orgOwner);
    await context.close();
  },
  groupOwner: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: process.env.group_owner_token_path });
    const groupOwner = new Roles(await context.newPage());
    await use(groupOwner);
    await context.close();
  },
  brandOwner: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: process.env.brand_owner_token_path });
    const brandOwner = new Roles(await context.newPage());
    await use(brandOwner);
    await context.close();
  },
  operator: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: process.env.operator_token_path });
    const operator = new Roles(await context.newPage());
    await use(operator);
    await context.close();
  },
});