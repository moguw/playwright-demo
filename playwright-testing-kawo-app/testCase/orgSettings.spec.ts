/** Org settings permissions handle
 * General menu 
 * Users tab
 * ...
*/

// import { test,expect } from '@playwright/test'
import { OrgSettings } from '../Page/orgSettings.page'
import { test,expect } from '../utils/Fixture-setup'

test('test - general menu - has permission',
    async ({ orgOwner,groupOwner,brandOwner }) => {
        const OrgSettings_orgOwner = new OrgSettings(orgOwner.page)
        await OrgSettings_orgOwner.goToGeneralPage()
        await OrgSettings_orgOwner.assertHasPermissionToGeneral()

        const OrgSettings_groupOwner = new OrgSettings(groupOwner.page)
        await OrgSettings_groupOwner.goToGeneralPage()
        await OrgSettings_groupOwner.assertHasPermissionToGeneral()
        
        const OrgSettings_brandOwner = new OrgSettings(brandOwner.page)
        await OrgSettings_brandOwner.goToGeneralPage()
        await OrgSettings_brandOwner.assertHasPermissionToGeneral()        
    }
);



test.describe('group_owner authentication',() => {
    test.use({ storageState: process.env.group_user_token_path });
    
    test('group_owner - has permission to general menu',{tag :'@permission'},
    async ({ page }) => {
        const OrgSetting = new OrgSettings(page)
        await OrgSetting.goToGeneralPage()
        await OrgSetting.assertHasPermissionToGeneral()
    });
});