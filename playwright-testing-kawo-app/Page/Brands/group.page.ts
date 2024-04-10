/** groups function handle
 * groups create 
 * groups delete
 * groups rename
*/

import { Page,expect } from '@playwright/test';
const createGroupButton_element = 'button.kui-button-base.kui-button'
const Page_elelment = "text=automation test"
const CreateGroupIcon_element = 'button[data-tooltip="Create Group"]'

//   export default setup
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
    async renameGroup() {     
      // ...
    }
    async deleteGroup() {     
    // ...
    }
    async checkGroupElementIsExsit(num){
      if(num == 0){
        let locator_element_num = this.page.locator(CreateGroupIcon_element).count();
        locator_element_num.then(async (locator_element_num) =>{
          await expect(locator_element_num).toBe(num)
        });
      }
      
      else{
        await expect(this.page).toHaveURL(/.*overview/)
      } 
    }
  }
   