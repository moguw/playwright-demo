import { test as setup, expect } from '@playwright/test';
// import { users } from '../fixture/user_info.json'

const name_element = 'input[placeholder="Email"]'
const pwd_element = 'input[type="Password"]'
const loginButton_elelment = "text=Log in"

/** save org owner authentication */
setup('authenticate as org owner', async ({ page }) => {
  await page.goto('/login');
  await page.fill(name_element,process.env.org_owner_name || '');
  await page.fill(pwd_element, process.env.org_owner_pwd || '');
  await page.locator(loginButton_elelment).first().click();
  // Wait until the page receives the cookies.
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('/organizations');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page).toHaveURL(/.*organizations/);

  // End of authentication steps.

  await page.context().storageState({ path: process.env.org_owner_token_path });
});

/** save group_owner authentication */
setup('authenticate as group_owner', async ({ page }) => {
  await page.goto('/login');
  await page.fill(name_element,process.env.group_owner_name || '');
  await page.fill(pwd_element, process.env.group_owner_pwd || '');
  await page.locator(loginButton_elelment).first().click();
  // Wait until the page receives the cookies.
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('/organizations');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await  expect(page).toHaveURL(/.*organizations/);

  // End of authentication steps.

  await page.context().storageState({ path: process.env.group_owner_token_path });
});

/** save brand_owner authentication */
setup('authenticate as brand_owner', async ({ page }) => {
  await page.goto('/login');
  await page.fill(name_element,process.env.brand_owner_name || '');
  await page.fill(pwd_element, process.env.brand_owner_pwd || '');
  await page.locator(loginButton_elelment).first().click();
  // Wait until the page receives the cookies.
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('/organizations');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page).toHaveURL(/.*organizations/);
  // End of authentication steps.
  await page.context().storageState({ path: process.env.brand_owner_token_path });
});

/** save operator authentication */
setup('authenticate as operator', async ({ page }) => {
  await page.goto('/login');
  await page.fill(name_element,process.env.operator_name || '');
  await page.fill(pwd_element, process.env.operator_pwd || '');
  await page.locator(loginButton_elelment).first().click();
  // Wait until the page receives the cookies.
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('/organizations');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page).toHaveURL(/.*organizations/);
  // End of authentication steps.
  await page.context().storageState({ path: process.env.operator_token_path });
});