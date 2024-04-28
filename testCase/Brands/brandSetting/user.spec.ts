import { test,expect } from '../../../utils/Fixture-setup';
import { User } from '../../../Page/Brands/brandSetting/user.page'

test.describe('test brand-user case',()=>{
    /**
     * test.beforeEach 执行测试用例前的准备工作
     */
    let orgOwnerRole: User
  
    test.beforeEach(async ({ orgOwner }) => {
        orgOwnerRole = new User(orgOwner.page)
    })
    test.describe('test - delete user',() => {
        test('orgOwner', {tag: '@brand-user'},
            async ({ }) => {
                // page is authenticated as orgOwner
                await orgOwnerRole.goToBrandSettingPage()
                await orgOwnerRole.deleteUser('Brand Owner')
        }); 
    });
})
