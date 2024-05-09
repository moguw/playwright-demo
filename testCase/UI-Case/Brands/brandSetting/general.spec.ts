import { test,expect } from '../../../../utils/Fixture-setup';
import { General } from '../../../../Page/Brands/brandSetting/general.page'

test.describe('test brand-general case',()=>{
    /**
     * test.beforeEach 执行测试用例前的准备工作
     */
    let orgOwnerRole: General
  
    // test.beforeEach(async ({ orgOwner }) => {
    //     orgOwnerRole = new General(orgOwner.page)
    // })
    // test.describe('test - change Brand Plan',() => {
    //     test('orgOwner', {tag: '@brand-general'},
    //         async ({ }) => {
    //             // page is authenticated as orgOwner
    //             await orgOwnerRole.goToBrandSettingPage()
    //             await orgOwnerRole.changeBrandPlan()
    //     }); 
    // });

    // test.describe('test - choose Brand Categroy',() => {
    //     test('orgOwner', {tag: '@brand-general'},
    //         async ({ }) => {
    //             // page is authenticated as orgOwner
    //             await orgOwnerRole.goToBrandSettingPage()
    //             await orgOwnerRole.BrandCategroy()
    //     }); 
    // });
})