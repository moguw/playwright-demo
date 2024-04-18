/** Org settings permissions handle
 * General menu 
 * Users tab
 * ...
*/

import { Page,expect } from '@playwright/test';

const RemindNoPermission_element = 'h2.kui-typ.kui-typ__h2'

const RemindNoPermission_text = "You don't have permission to view this page"
const UsersTab_text = "Users"

export class OrgSettings {
    page: Page;
    constructor(page: Page) {
      this.page = page;
    }
    async goToGeneralPage() {
        await this.page.goto('/automation-test/settings/general')
    } 
    async assertHasPermissionToGeneral() {
        await expect(this.page).toHaveTitle(/.*General/)
    }
    async assertNoPermissionToPage() {
        await expect(this.page.locator(RemindNoPermission_element)).toHaveText(RemindNoPermission_text)
    }   

    async goToUsersPage() {
        await this.page.goto('/automation-test/settings/users')
    }
    async assertHasPermissionToUsers () {
        await expect(this.page.getByRole('button', { name: UsersTab_text })).toBeVisible()
    }
}