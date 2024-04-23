import { test,expect } from '../../utils/Fixture-setup'
import { Groups } from '../../Page/Brands/group.page'
/**create Group
 * crate Group after admin user login 
 */

test.describe('test - create group',() => {
  test('orgOwner', {tag: '@group'},
      async ({ orgOwner }) => {
          // page is authenticated as admin
          const orgOwnerRole = new Groups(orgOwner.page)
          await orgOwnerRole.goToOverviewPage()
          await orgOwnerRole.createGroup()
          await orgOwnerRole.checkGroupElementIsExsit(1)
  });
  test('groupOwner', {tag: '@group'},
      async ({ groupOwner }) => {
          // page is authenticated as admin
          const orgOwnerRole = new Groups(groupOwner.page)
          await orgOwnerRole.goToOverviewPage()
          await orgOwnerRole.checkGroupElementIsExsit(0)
  });  
});


test.describe('test - delete group',() => {
  test('orgOwner', {tag: '@group'},
      async ({ orgOwner }) => {
          // page is authenticated as admin
          const orgOwnerRole = new Groups(orgOwner.page)
          await orgOwnerRole.goToOverviewPage()
          await orgOwnerRole.deleteGroup()
  });  
});
