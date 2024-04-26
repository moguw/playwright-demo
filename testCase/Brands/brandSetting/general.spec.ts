import { test,expect } from '../../../utils/Fixture-setup';
import { General } from '../../../Page/Brands/brandSetting/general.page'


test.describe('test - change Brand Plan',() => {
    test('orgOwner', {tag: '@brand'},
        async ({ orgOwner }) => {
            // page is authenticated as admin
            const orgOwnerRole = new General(orgOwner.page)
            await orgOwnerRole.goToBrandSettingPage()
            await orgOwnerRole.changeBrandPlan()
    }); 
  });

test.describe('test - choose Brand Categroy',() => {
    test('orgOwner', {tag: '@brand'},
        async ({ orgOwner }) => {
            // page is authenticated as admin
            const orgOwnerRole = new General(orgOwner.page)
            await orgOwnerRole.goToBrandSettingPage()
            await orgOwnerRole.BrandCategroy()
    }); 
  });