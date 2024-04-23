import { test as base, type Page, type Locator } from '@playwright/test';


class OrgOwner {
  // Page signed in as "org owner".
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
}

class GroupOwner {
  // Page signed in as "group owner".
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
}

class BrandOwner {
  // Page signed in as "brand owner".
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
}

class Operator {
  // Page signed in as "operator".
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
}

// Declare the types of your fixtures.
type MyFixtures = {
  orgOwner: OrgOwner;
  groupOwner: GroupOwner;
  brandOwner: BrandOwner;
  operator: Operator
};

export * from '@playwright/test';
export const test = base.extend<MyFixtures>({
  orgOwner: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: process.env.org_owner_token_path });
    const orgOwner = new OrgOwner(await context.newPage());
    await use(orgOwner);
    await context.close();
  },
  groupOwner: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: process.env.group_owner_token_path });
    const groupOwner = new GroupOwner(await context.newPage());
    await use(groupOwner);
    await context.close();
  },
  brandOwner: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: process.env.brand_owner_token_path });
    const brandOwner = new BrandOwner(await context.newPage());
    await use(brandOwner);
    await context.close();
  },
  operator: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: process.env.operator_token_path });
    const operator = new Operator(await context.newPage());
    await use(operator);
    await context.close();
  },
});