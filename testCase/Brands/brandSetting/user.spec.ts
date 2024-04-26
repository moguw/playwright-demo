import { test,expect } from '../../../utils/Fixture-setup';
import { User } from '../../../Page/Brands/brandSetting/user.page'


test.describe('test - delete user',() => {
    test('orgOwner', {tag: '@user'},
        async ({ orgOwner }) => {
            // page is authenticated as admin
            const orgOwnerRole = new User(orgOwner.page)
            await orgOwnerRole.goToBrandSettingPage()
            // await orgOwnerRole.deleteUser('Brand Owner')
    }); 
  });