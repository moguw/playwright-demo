/** groups function handle
 * groups create 
 * groups delete
 * groups rename
*/
// import { test,expect, Page } from '../../fixture/fixture'
// import { Admin } from './brandSetting/Admin.page'
import { Page,expect } from '@playwright/test';
const createGroupButton_element = 'button.kui-button-base.kui-button'
const Page_elelment = "text=automation test"
const CreateGroupIcon_element = 'button[data-tooltip="Create Group"]'
const groupIcon_element = 'ul.brand-groups-list > li.kui-lst-item > div.kui-lst-item__action'
const DeleteGroup_element = 'text=Delete Group'
const groupName_element = 'span.kui-typ.kui-typ__body2.kui-lst-item__text'

export class Groups {
    page: Page;
    constructor(page: Page) {
      this.page = page;
    }
    async goToOverviewPage() {
      await this.page.goto('/automation-test/overview');
    }
    async createGroup() {     
        await this.page.locator(createGroupButton_element).first().click();
        await this.page.locator(Page_elelment).first().click()
    }
    async deleteGroup() {
        await this.page.locator(groupIcon_element).last().click()
        await this.page.locator(DeleteGroup_element).click()
    }
    async checkGroupElementIsExsit(except_num){
      let locator_element_num = this.page.locator(CreateGroupIcon_element).count();
      locator_element_num.then(async (locator_element_num) =>{
        await expect(locator_element_num).toBe(except_num)
      });
    }
  }
   