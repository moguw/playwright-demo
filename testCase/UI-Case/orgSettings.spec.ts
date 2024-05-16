/** Org settings permissions handle
 * General menu
 * Users tab
 * Invite user
 * Edit user
 * Delete user
 * Competitors tab
 * Billing tab
 * ...
*/

import { describe } from 'node:test';
import { OrgSettings } from '../../Page/orgSettings.page';
import { test,expect } from '../../utils/Fixture-setup';
import { generateString } from '../../utils/Random-setup';

const EmailAddress_auto = 'auto+'+generateString(5)+'@kawo.com'
const Search_auto = 'auto'

const Groups_selection = 'Auto Test(Dont delete)'
const Brands_selection = 'Auto Test Brand(Dont Delete)'

const Role_orgOwner = 'Org Owner'
const Role_groupOwner = 'Group Owner'
const Role_brandOwner = 'Brand Owner'
const Role_operator = 'Operator'



test.describe('test - orgsettings cases',() => {
    let OrgSettings_orgOwner,OrgSettings_groupOwner,OrgSettings_brandOwner,OrgSettings_operator : OrgSettings
  
    test.beforeEach(async ({ orgOwner,groupOwner,brandOwner,operator }) => {
        OrgSettings_orgOwner = new OrgSettings(orgOwner.page)
        OrgSettings_groupOwner = new OrgSettings(groupOwner.page)
        OrgSettings_brandOwner = new OrgSettings(brandOwner.page)
        OrgSettings_operator = new OrgSettings(operator.page)
    })
    
    test.describe('test - general menu',() => {
        test('org owner', async ({}) => {
            await OrgSettings_orgOwner.goToGeneralPage()
            await OrgSettings_orgOwner.assertHasPermissionToGeneral()
        });
        test('group owner', async ({}) => {
            await OrgSettings_groupOwner.goToGeneralPage()
            await OrgSettings_groupOwner.assertHasPermissionToGeneral()
        });
    
        test('brand owner', async ({}) => {
            await OrgSettings_brandOwner.goToGeneralPage()
            await OrgSettings_brandOwner.assertHasPermissionToGeneral() 
        });
    
        test('operator', async ({}) => {
            await OrgSettings_operator.goToGeneralPage()
            await OrgSettings_operator.assertNoPermissionToPage()
        });
    });

    test.describe('test - users tab',() => {
        test('org owner', async ({}) => {
            await OrgSettings_orgOwner.goToUsersPage()
            await OrgSettings_orgOwner.assertHasPermissionToUsers()
        });
    
        test('group owner', async ({}) => {
            await OrgSettings_groupOwner.goToUsersPage()
            await OrgSettings_groupOwner.assertHasPermissionToUsers()  
        });
    
        test('brand owner', async ({}) => {
            await OrgSettings_brandOwner.goToUsersPage()
            await OrgSettings_brandOwner.assertHasPermissionToUsers()  
        });
    
        // test('operator', async ({}) => {
        //     await OrgSettings_operator.goToUsersPage()
        //     await OrgSettings_operator.assertNoPermissionToPage()   
        // });
    });
    
    test.describe('test - invite user',() => {
        test('org owner', async ({}) => {
            const EmailAddress_value = EmailAddress_auto
            await OrgSettings_orgOwner.goToUsersPage()
            await OrgSettings_orgOwner.inviteUserToBeOrgOwner(EmailAddress_value)
            await OrgSettings_orgOwner.assertInviteSuccess(EmailAddress_value)
        });
    
        test('group owner', async ({}) => {
            const EmailAddress_value = EmailAddress_auto
            await OrgSettings_groupOwner.goToUsersPage()
            await OrgSettings_groupOwner.inviteUserToBeGroupOwner(EmailAddress_value,Groups_selection)
            await OrgSettings_groupOwner.assertInviteSuccess(EmailAddress_value)
        });
    
        test('brand owner', async ({}) => {
            const EmailAddress_value = EmailAddress_auto
            await OrgSettings_brandOwner.goToUsersPage()
            await OrgSettings_brandOwner.inviteUserToBeBrandOwner(EmailAddress_value,Groups_selection,Brands_selection)
            await OrgSettings_brandOwner.assertInviteSuccess(EmailAddress_value)
        });
    });
    
    test.describe('test - edit user',() => {
        test('org owner', async ({}) => {
            await OrgSettings_orgOwner.goToUsersPage()
            await OrgSettings_orgOwner.editUserFromOrgToGroup(Search_auto,Groups_selection)
            await OrgSettings_orgOwner.assertEditFromOrgToGroupSuccess()
        });
    
        test('group owner', async ({}) => {
            await OrgSettings_groupOwner.goToUsersPage()
            await OrgSettings_groupOwner.editUserFromGroupToBrand(Search_auto,Groups_selection,Brands_selection)
            await OrgSettings_groupOwner.assertEditFromGroupToBrandSuccess()
        });
    
        test('brand owner', async ({}) => {
            await OrgSettings_brandOwner.goToUsersPage()
            await OrgSettings_brandOwner.editUserFromBrandToOperator(Search_auto)
            await OrgSettings_brandOwner.assertEditFromBrandToOperatorSuccess()
        });
    });
    
    test.describe('test - delete user',() => {
        test('org owner', async ({}) => {
            await OrgSettings_orgOwner.goToUsersPage()
            await OrgSettings_orgOwner.assertDeleteUserSuccess(Search_auto,Role_orgOwner)
        });
    
        test('group owner', async ({}) => {
            await OrgSettings_groupOwner.goToUsersPage()
            await OrgSettings_groupOwner.assertDeleteUserSuccess(Search_auto,Role_groupOwner)
        });
    
        test('brand owner', async ({}) => {
            await OrgSettings_brandOwner.goToUsersPage()
            await OrgSettings_brandOwner.assertDeleteUserSuccess(Search_auto,Role_brandOwner)
        });
    });
    
    test.describe('test - competitors tab',() => {
        test('org owner', async ({}) => {
            await OrgSettings_orgOwner.goToCompetitorsPage()
            await OrgSettings_orgOwner.assertHasPermissionToCompetitors()
        });
    
        test('group owner', async ({}) => {
            await OrgSettings_groupOwner.goToCompetitorsPage()
            await OrgSettings_groupOwner.assertNoPermissionToPage()
        });
    
        test('brand owner', async ({}) => {
            await OrgSettings_brandOwner.goToCompetitorsPage()
            await OrgSettings_brandOwner.assertNoPermissionToPage()
        });
    
        test('operator', async ({}) => {
            await OrgSettings_operator.goToCompetitorsPage()
            await OrgSettings_operator.assertNoPermissionToPage()
        });
    });
    
    test.describe('test - billing tab',() => {
        test('org owner', async ({}) => {
            await OrgSettings_orgOwner.goToBillingPage()
            await OrgSettings_orgOwner.assertHasPermissionToBilling()
        });
    
        test('group owner', async ({}) => {
            await OrgSettings_groupOwner.goToBillingPage()
            await OrgSettings_groupOwner.assertNoPermissionToPage()
        });
    
        test('brand owner', async ({}) => {
            await OrgSettings_brandOwner.goToBillingPage()
            await OrgSettings_brandOwner.assertNoPermissionToPage()
        });
    
        test('operator', async ({}) => {
            await OrgSettings_operator.goToBillingPage()
            await OrgSettings_operator.assertNoPermissionToPage()
        });
    });
})
