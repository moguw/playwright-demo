import { test,expect } from '@playwright/test'
import { General } from '../../../Page/Brands/brandSetting/general.page'


// test.use({ storageState: process.env.admin_user_token_path });
// test('admin_user test change brands plan',{tag: ['@smoke','@regression']}, 
//     async ({ page }) => {
//         // page is authenticated as admin
//         const Brand = new General(page)
//         await Brand.goToBrandSettingPage()
//         await Brand.changeBrandPlan()
// });
// test('admin_user test chose brands categrory',{tag: ['@smoke','@regression']}, 
//     async ({ page }) => {
//         // page is authenticated as admin
//         const Brand = new General(page)
//         await Brand.goToBrandSettingPage()
//         await Brand.BrandCategroy()
// });

