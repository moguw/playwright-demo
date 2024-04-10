import { test as setup, expect } from '@playwright/test';
import { users } from '../fixture/user_info.json'

const name_element = 'input[placeholder="Email"]'
const pwd_element = 'input[type="Password"]'
const loginButton_elelment = "text=Log in"

/** save admin_user authenticate */
setup('authenticate as admin_user', async ({ page }) => {
  await page.goto('/login');
  await page.fill(name_element,users.admin_user.name);
  await page.fill(pwd_element, users.admin_user.pwd);
  await page.locator(loginButton_elelment).first().click();
  // Wait until the page receives the cookies.
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('/organizations');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page).toHaveURL(/.*organizations/);

  // End of authentication steps.

  await page.context().storageState({ path: users.admin_user.admin_User_Token_File_Path });
});

/** save group_user authenticate */
setup('authenticate as group_user', async ({ page }) => {
  await page.goto('/login');
  await page.fill(name_element,users.group_user.name);
  await page.fill(pwd_element, users.group_user.pwd);
  await page.locator(loginButton_elelment).first().click();
  // Wait until the page receives the cookies.
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('/organizations');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await  expect(page).toHaveURL(/.*organizations/);

  // End of authentication steps.

  await page.context().storageState({ path: users.group_user.group_User_Token_File_Path });
});