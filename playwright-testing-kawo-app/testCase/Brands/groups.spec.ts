// import { test,expect } from '@playwright/test'
import { Groups } from '../../Page/Brands/group.page'
/**create Group
 * crate Group after admin user login 
 */

import { test,expect } from '../../fixture/fixture'

test('test create Group', {tag: '@regression'},
    async ({ adminPage,userPage }) => {
      // page is authenticated as admin
      const Group = new Groups(adminPage.page)
      await Group.goToOverviewPage()
      await Group.createGroup()
      await Group.checkGroupElementIsExsit(1)
    
      // page is authenticated as admin
      const userGroup = new Groups(userPage.page)
      await userGroup.goToOverviewPage();
      await userGroup.checkGroupElementIsExsit(0)
      }
    
);






