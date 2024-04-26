import { test,expect } from '../../utils/Fixture-setup'
import { Groups } from '../../Page/Brands/group.page'
/**create Group
 * crate Group after admin user login 
 */
test.describe('test group case',()=>{
  /**
   * test.beforeEach 执行测试用例前的准备工作
   */
  let orgOwnerRole, groupOwnerRole: Groups

  test.beforeEach(async ({ orgOwner,groupOwner }) => {
      orgOwnerRole = new Groups(orgOwner.page)
      groupOwnerRole = new Groups(groupOwner.page)
  })
  test.describe('test - create group',() => {
    test('orgOwner', {tag: '@group'},
        async ({ }) => {
            // page is authenticated as orgOwner
            await orgOwnerRole.goToOverviewPage()
            await orgOwnerRole.createGroup()
            await orgOwnerRole.checkGroupElementIsExsit(1)
    });
    test('groupOwner', {tag: '@group'},
        async ({ }) => {
            // page is authenticated as groupOwner
            await groupOwnerRole.goToOverviewPage()
            await groupOwnerRole.checkGroupElementIsExsit(0)
    });  
  });
  test.describe('test - delete group',() => {
    test('orgOwner', {tag: '@group'},
        async ({ }) => {
            // page is authenticated as orgOwner
            await orgOwnerRole.goToOverviewPage()
            await orgOwnerRole.deleteGroup()
    });  
  });
})