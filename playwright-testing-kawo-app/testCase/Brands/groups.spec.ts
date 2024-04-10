import { test,expect } from '@playwright/test'
import { Groups } from '../../Page/Brands/group.page'
import { users } from "../../fixture/user_info.json"
const createBrandButton_element = 'button[data-tooltip="Create Group"]'
/**create Group
 * crate Group after admin user login 
 */


test.use({ storageState: users.admin_user.admin_User_Token_File_Path });
test('admin_user test create Group', {tag: '@regression'},
    async ({ page }) => {
      // page is authenticated as admin
      const Group = new Groups(page)
      await Group.goToOverviewPage()
      await Group.createGroup()
      await Group.checkGroupElementIsExsit(1)
});


/**create Group
 * crate Group after read only user login 
 */
test.describe('group_user authenticate',() => {
  test.use({ storageState: users.group_user.group_User_Token_File_Path });

  test('group_user test create Group',{tag :['@smoke','@regression']}, 
      async ({ page }) => {
        // page is authenticated as a user
        const Group = new Groups(page);
        await Group.goToOverviewPage();
        await Group.checkGroupElementIsExsit(0)
  });
});






