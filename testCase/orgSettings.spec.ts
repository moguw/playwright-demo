/** Org settings permissions handle
 * General menu
 * Users tab
 * Invite user
 * ...
*/

// import { test,expect } from '@playwright/test'
import { describe } from 'node:test';
import { OrgSettings } from '../Page/orgSettings.page';
import { test,expect } from '../utils/Fixture-setup';
import { generateString } from '../utils/Random-setup';

const EmailAddress_auto = 'auto+'+generateString(5)+'@kawo.com'
const Search_auto = 'auto'

const Groups_selection = 'Auto Test(Dont delete)'
const Brands_selection = 'Auto Test Brand(Dont Delete)'


test.describe('test - general menu',() => {
    test('org owner', async ({ orgOwner }) => {
        const OrgSettings_orgOwner = new OrgSettings(orgOwner.page)
        await OrgSettings_orgOwner.goToGeneralPage()
        await OrgSettings_orgOwner.assertHasPermissionToGeneral()
    });

    test('group owner', async ({ groupOwner }) => {
        const OrgSettings_groupOwner = new OrgSettings(groupOwner.page)
        await OrgSettings_groupOwner.goToGeneralPage()
        await OrgSettings_groupOwner.assertHasPermissionToGeneral()
    });

    test('brand owner', async ({ brandOwner }) => {
        const OrgSettings_brandOwner = new OrgSettings(brandOwner.page)
        await OrgSettings_brandOwner.goToGeneralPage()
        await OrgSettings_brandOwner.assertHasPermissionToGeneral() 
    });

    test('operator', async ({ operator }) => {
        const OrgSettings_operator = new OrgSettings(operator.page)
        await OrgSettings_operator.goToGeneralPage()
        await OrgSettings_operator.assertNoPermissionToPage()
    });
});

test.describe('test - users tab',() => {
    test('org owner', async ({ orgOwner }) => {
        const orgSettings_orgOwner = new OrgSettings(orgOwner.page)
        await orgSettings_orgOwner.goToUsersPage()
        await orgSettings_orgOwner.assertHasPermissionToUsers()
    });

    test('group owner', async ({ groupOwner }) => {
        const orgSettings_groupOwner = new OrgSettings(groupOwner.page)
        await orgSettings_groupOwner.goToUsersPage()
        await orgSettings_groupOwner.assertHasPermissionToUsers()  
    });

    test('brand owner', async ({ brandOwner }) => {
        const orgSettings_brandOwner = new OrgSettings(brandOwner.page)
        await orgSettings_brandOwner.goToUsersPage()
        await orgSettings_brandOwner.assertHasPermissionToUsers()  
    });

    test('operator', async ({ operator }) => {
        const orgSettings_operator = new OrgSettings(operator.page)
        await orgSettings_operator.goToUsersPage()
        await orgSettings_operator.assertNoPermissionToPage()   
    });
});

test.describe('test - invite user',() => {
    test('org owner', async ({ orgOwner }) => {
        const orgSettings_orgOwner = new OrgSettings(orgOwner.page)
        const EmailAddress_value = EmailAddress_auto
        await orgSettings_orgOwner.goToUsersPage()
        await orgSettings_orgOwner.inviteUserToBeOrgOwner(EmailAddress_value)
        await orgSettings_orgOwner.assertInviteSuccess(EmailAddress_value)
    });

    test('group owner', async ({ groupOwner }) => {
        const orgSettings_groupOwner = new OrgSettings(groupOwner.page)
        const EmailAddress_value = EmailAddress_auto
        await orgSettings_groupOwner.goToUsersPage()
        await orgSettings_groupOwner.inviteUserToBeGroupOwner(EmailAddress_value,Groups_selection)
        await orgSettings_groupOwner.assertInviteSuccess(EmailAddress_value)
    });

    test('brand owner', async ({ brandOwner }) => {
        const orgSettings_brandOwner = new OrgSettings(brandOwner.page)
        const EmailAddress_value = EmailAddress_auto
        await orgSettings_brandOwner.goToUsersPage()
        await orgSettings_brandOwner.inviteUserToBeBrandOwner(EmailAddress_value,Groups_selection,Brands_selection)
        await orgSettings_brandOwner.assertInviteSuccess(EmailAddress_value)
    });
});

test.describe('test - edit user',() => {
    test('org owner', async ({ orgOwner}) => {
        const orgSettings_orgOwner = new OrgSettings(orgOwner.page)
        await orgSettings_orgOwner.goToUsersPage()
        await orgSettings_orgOwner.assertEditFromOrgToGroupSuccess(Search_auto,Groups_selection)
    });

    test('group owner', async ({ groupOwner }) => {
        const orgSettings_groupOwner = new OrgSettings(groupOwner.page)
        await orgSettings_groupOwner.goToUsersPage()
        await orgSettings_groupOwner.assertEditFromGroupToBrandSuccess(Search_auto,Groups_selection,Brands_selection)
    });

    test('brand owner', async ({ brandOwner }) => {
        const orgSettings_brandOwner = new OrgSettings(brandOwner.page)
        await orgSettings_brandOwner.goToUsersPage()
        await orgSettings_brandOwner.assertEditFromBrandToOperatorSuccess(Search_auto)
    });

})
