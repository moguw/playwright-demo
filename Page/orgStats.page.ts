/** Org stats permissions handle
 * Stats menu 
 * ...
*/

import { Page,expect } from '@playwright/test';

// const RemindNoPermission_element = 'h2.kui-typ.kui-typ__h2'
// const RemindNoPermission_text = "You don't have permission to view this page"
const Overview_tab = 'Overview'
const Top_menus = 'div.kui-tabs.kui-theme-dark.org-overview-tabs'
const Stats_menu = 'Stats'

export class OrgStats {
    page: Page;
    constructor(page: Page) {
      this.page = page;
    }

    // stats menu
    async goToStatsPage() {
        await this.page.goto('/automation-test/overview/stats')
    } 
    async assertHasPermissionToStats() {
        await expect(this.page.getByRole('button', {name: Overview_tab})).toBeVisible()
    }
    async assertNoPermissionToStats() {
        await expect(this.page.locator(Top_menus)).not.toContainText(Stats_menu)
    }

}