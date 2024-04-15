/** login function handle
 * email login
 * ...
*/

import { Page,expect } from '@playwright/test';

const emailAddressInput_element = 'input[placeholder="Email"]'
const emailPwdInput_element = 'input[placeholder="Password"]'

const loginBtn_text = 'Log in'


export class Login {
    page: Page;
    constructor(page: Page) {
      this.page = page;
    }
    async goToLoginPage() {
        await this.page.goto('login?loginMode=email'); 
    }
    async emailLogin(email_address,email_pwd) {
        await this.page.locator(emailAddressInput_element).fill(email_address)
        await this.page.locator(emailPwdInput_element).fill(email_pwd)
        await this.page.getByRole('button',{ name: loginBtn_text }).click()
    }
    async assertLoginSuccess() {
        await expect(this.page).toHaveURL(/.*organizations/)
    }

}