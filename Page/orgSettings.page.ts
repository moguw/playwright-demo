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

import { Page,expect } from '@playwright/test';

const RemindNoPermission_element = 'h2.kui-typ.kui-typ__h2'
const RemindNoPermission_text = "You don't have permission to view this page"
const General_title = /.*General/

// Users page
const Users_tab = 'Users'
const Competitors_tab = 'Competitors'
const Billing_tab = 'Billing'
const InviteUsers_btn = 'Invite User'
const SearchNameOrEmail_placeholder = 'Name or Email'
const Role_dropdown_box = 'Role'
const Role_orgOwner = 'Org Owner'
const Role_groupOwner = 'Group Owner'
const Role_brandOwner = 'Brand Owner'
const Role_operator = 'Operator'
const EmailAddress_info__ele = 'div.kui-typ.kui-typ__body3'
const Roles_info_ele = 'td.user-management__roles-cell.kui-table-body__cell'
const EditUser_btn_element = 'button[data-tooltip="Edit User"]'
const DeleteUser_btn_ele = 'button[data-tooltip="Remove User"]'
const ConfirmRemove_btn_ele = 'button.kui-button-base.kui-button'
const ConfirmRemove_btn = 'Remove'
const FilteredResult_ele = 'div.kui-typ.kui-typ__body2.filterCountFiltered--SGZV9'
const FilteredResult = 'Filtered: 0'
const Userlist_row_ele = 'tbody.kui-table-body > tr.kui-table-row'

// Invite(Edit) User Pop-up
const Email_placeholder = "Please enter the invitee's email address"
const Invite_btn = 'Invite'
const Groups_dropdown_box = 'Brand Groups'
const Brands_dropdown_box = 'Brands'
const DeleteRole_btn_element = 'div.roleCell--y9CHN > button.kui-button-base.kui-button'
const Save_btn = 'Save'
const EmailInfo_ele = 'div.userInfoCard--S9iIf > div.userInfoSection--U7wme > div.kui-typ.kui-typ__body2'

export class OrgSettings {
    page: Page;
    constructor(page: Page) {
      this.page = page;
    }

    // general menu
    async goToGeneralPage() {
        await this.page.goto('/automation-test/settings/general')
    } 
    async assertHasPermissionToGeneral() {
        await expect(this.page).toHaveTitle(General_title)
    }
    async assertNoPermissionToPage() {
        await expect(this.page.locator(RemindNoPermission_element)).toHaveText(RemindNoPermission_text)
    }   
    
    // users tab
    async goToUsersPage() {
        await this.page.goto('/automation-test/settings/users')
    }
    async assertHasPermissionToUsers() {
        await expect(this.page.getByRole('button', {name: Users_tab})).toBeVisible()
    }

    // invite user 
    async inviteUserToBeOrgOwner(EmailAddress) {
        await this.page.getByRole('button', {name: InviteUsers_btn}).first().click()
        await this.page.getByPlaceholder(Email_placeholder).fill(EmailAddress)
        await this.page.getByRole('button', {name: Invite_btn}).last().click()
    }
    async inviteUserToBeGroupOwner(EmailAddress,Groups_selection) {
        await this.page.getByRole('button', {name: InviteUsers_btn}).first().click()
        await this.page.getByPlaceholder(Email_placeholder).fill(EmailAddress)
        await this.page.locator('button.kui-select__btn', {hasText: Groups_dropdown_box}).last().click()
        await this.page.getByRole('listitem').getByRole('option',{name: Groups_selection}).first().click()
        await this.page.locator(DeleteRole_btn_element).click({force: true})
        await this.page.getByRole('button', {name: Invite_btn}).last().click()
    }
    async inviteUserToBeBrandOwner(EmailAddress,Groups_selection,Brands_selection) {
        await this.page.getByRole('button', {name: InviteUsers_btn}).first().click()
        await this.page.getByPlaceholder(Email_placeholder).fill(EmailAddress)
        await this.page.locator('button.kui-select__btn', {hasText: Brands_dropdown_box}).last().click()
        await this.page.getByRole('listitem').getByRole('button',{name: Groups_selection}).first().click()
        await this.page.getByRole('listitem').getByRole('option',{name: Brands_selection}).first().click()
        await this.page.getByRole('button', {name: Invite_btn}).last().click()
    }
    async assertInviteSuccess(EmailAddress) {
        await this.page.getByPlaceholder(SearchNameOrEmail_placeholder).fill(EmailAddress)
        await expect(this.page.locator(EmailAddress_info__ele)).toContainText(EmailAddress)
    }

    // edit user
    async editUserFromOrgToGroup(EmailAddress,Groups_selection) {
        await this.page.getByPlaceholder(SearchNameOrEmail_placeholder).fill(EmailAddress)
        await this.page.getByRole('button',{name: Role_dropdown_box}).first().click()
        await this.page.getByRole('listitem').getByRole('option',{name: Role_orgOwner}).first().click()
        const filtered_result = await this.page.locator(FilteredResult_ele).first().innerText()
        const filtered_num_str = filtered_result.replace(/[^\d]/g,"")
        const filtered_num_int = parseInt(filtered_num_str)
        for(var i=0; i<filtered_num_int;i++) {
            if(await this.page.locator(Userlist_row_ele).nth(i).locator(Roles_info_ele).innerText() === Role_orgOwner){
                await this.page.locator(EditUser_btn_element).nth(i).dblclick({force: true})
                const emailAddress_info = await this.page.locator(EmailInfo_ele).last().innerText()
                await this.page.locator('button.kui-select__btn',{hasText: Role_orgOwner}).last().click()
                await this.page.getByRole('listitem').getByRole('option',{name: Role_groupOwner}).first().click()
                await this.page.locator('button.kui-select__btn',{hasText: Groups_dropdown_box}).last().click()
                await this.page.getByRole('listitem').getByRole('option',{name: Groups_selection}).first().click()
                await this.page.getByRole('button', {name: Save_btn}).last().dblclick({force: true})
                await this.page.getByRole('button',{name: Save_btn}).last().click()
                return emailAddress_info
                break
            }
            else {
                console.log(i,'skip...')
            }
        }
    }

    async assertEditFromOrgToGroupSuccess(EmailAddress,Groups_selection) {
        const emailAddress_info = await this.editUserFromOrgToGroup(EmailAddress,Groups_selection)
        if (emailAddress_info){
            await this.page.getByRole('button',{name: Role_orgOwner}).first().click()
            await this.page.getByRole('listitem').getByRole('option',{name: Role_orgOwner}).first().click()
            await this.page.getByRole('listitem').getByRole('option',{name: Role_groupOwner}).first().click()
            await this.page.getByPlaceholder(SearchNameOrEmail_placeholder).fill(emailAddress_info)
            await expect(this.page.locator(Roles_info_ele)).toHaveText(Role_groupOwner)  
        }
        else{
            console.error("Email address info is undefined.")
        }
    }
 
    async editUserFromGroupToBrand(EmailAddress,Groups_selection,Brands_selection) {
        await this.page.getByPlaceholder(SearchNameOrEmail_placeholder).fill(EmailAddress)
        await this.page.getByRole('button',{name: Role_dropdown_box}).first().click()
        await this.page.getByRole('listitem').getByRole('option',{name: Role_groupOwner}).first().click()
        const filtered_result = await this.page.locator(FilteredResult_ele).first().innerText()
        const filtered_num_str = filtered_result.replace(/[^\d]/g,"")
        const filtered_num_int = parseInt(filtered_num_str)
        for(var i=0; i<filtered_num_int;i++) {
            if(await this.page.locator(Userlist_row_ele).nth(i).locator(Roles_info_ele).innerText() === Role_groupOwner){
                await this.page.locator(EditUser_btn_element).nth(i).dblclick({force: true})
                const emailAddress_info = await this.page.locator(EmailInfo_ele).last().innerText()
                await this.page.locator('button.kui-select__btn',{hasText: Role_groupOwner}).last().click()
                await this.page.getByRole('listitem').getByRole('option',{name: Role_brandOwner}).first().click()
                await this.page.locator('button.kui-select__btn', {hasText: Brands_dropdown_box}).last().click()
                await this.page.getByRole('listitem').getByRole('button',{name: Groups_selection}).first().click()
                await this.page.getByRole('listitem').getByRole('option',{name: Brands_selection}).first().click()
                await this.page.getByRole('button', {name: Save_btn}).last().click()
                await this.page.getByRole('button',{name: Save_btn}).last().click()
                return emailAddress_info
                break
            }
            else {
                console.log(i,'skip...')
            }
        }
    }

    async assertEditFromGroupToBrandSuccess(EmailAddress,Groups_selection,Brands_selection) {
        const emailAddress_info = await this.editUserFromGroupToBrand(EmailAddress,Groups_selection,Brands_selection)
        if (emailAddress_info){
            await this.page.getByRole('button',{name: Role_groupOwner}).first().click()
            await this.page.getByRole('listitem').getByRole('option',{name: Role_groupOwner}).first().click()
            await this.page.getByRole('listitem').getByRole('option',{name: Role_brandOwner}).first().click()
            await this.page.getByPlaceholder(SearchNameOrEmail_placeholder).fill(emailAddress_info)
            await expect(this.page.locator(Roles_info_ele)).toHaveText(Role_brandOwner)
        }
        else{
            console.error("Email address info is undefined.")
        }      
    }

    async editUserFromBrandToOperator(EmailAddress) {
        await this.page.getByPlaceholder(SearchNameOrEmail_placeholder).fill(EmailAddress)
        await this.page.getByRole('button',{name: Role_dropdown_box}).first().click()
        await this.page.getByRole('listitem').getByRole('option',{name: Role_brandOwner}).first().click()

        const filtered_result = await this.page.locator(FilteredResult_ele).first().innerText()
        const filtered_num_str = filtered_result.replace(/[^\d]/g,"")
        const filtered_num_int = parseInt(filtered_num_str)
        for(var i=0; i<filtered_num_int;i++) {
            if(await this.page.locator(Userlist_row_ele).nth(i).locator(Roles_info_ele).innerText() === Role_brandOwner){
                await this.page.locator(EditUser_btn_element).nth(i).dblclick({force: true})
                const emailAddress_info = await this.page.locator(EmailInfo_ele).last().innerText()
                await this.page.locator('button.kui-select__btn',{hasText: Role_brandOwner}).last().click()
                await this.page.getByRole('listitem').getByRole('option',{name: Role_operator}).first().click()
                await this.page.getByRole('button', {name: Save_btn}).last().click()
                await this.page.getByRole('button',{name: Save_btn}).last().click()
                return emailAddress_info
                break
            }
            else {
                console.log(i,'skip...')
            }
        }    
    }

    async assertEditFromBrandToOperatorSuccess(EmailAddress) {
        const emailAddress_info = await this.editUserFromBrandToOperator(EmailAddress)

        if (emailAddress_info){
            await this.page.getByRole('button',{name: Role_brandOwner}).first().click()
            await this.page.getByRole('listitem').getByRole('option',{name: Role_brandOwner}).first().click()
            await this.page.getByRole('listitem').getByRole('option',{name: Role_operator}).first().click()
            await this.page.getByPlaceholder(SearchNameOrEmail_placeholder).fill(emailAddress_info)
            await expect(this.page.locator(Roles_info_ele)).toHaveText(Role_operator)
        }
        else{
            console.error("Email address info is undefined.")
        }  
    }

    // delete user
    async deleteUser(EmailAddress,Role) {
        await this.page.getByPlaceholder(SearchNameOrEmail_placeholder).fill(EmailAddress)
        await this.page.getByRole('button',{name: Role_dropdown_box}).first().click()
        await this.page.getByRole('listitem').getByRole('option',{name: Role}).first().click()
        const filtered_result = await this.page.locator(FilteredResult_ele).first().innerText()
        const filtered_num_str = filtered_result.replace(/[^\d]/g,"")
        const filtered_num_int = parseInt(filtered_num_str)
        for(var i=0; i<filtered_num_int;i++) {
            if(await this.page.locator(Userlist_row_ele).nth(i).locator(Roles_info_ele).innerText() === Role){
                const emailAddress_info = await this.page.locator(EmailAddress_info__ele).nth(i).innerText()
                await this.page.locator(DeleteUser_btn_ele).nth(i).dblclick({force: true})
                await this.page.locator(ConfirmRemove_btn_ele, {hasText: ConfirmRemove_btn}).first().click()
                return emailAddress_info
                break 
            }
            else {
                console.log(i,'skip...')
            }
        }
    }

    async assertDeleteUserSuccess(EmailAddress,Role) {
        const emailAddress_info = await this.deleteUser(EmailAddress,Role)
        if (emailAddress_info){
            await this.page.getByRole('button',{name: Role}).first().click()
            await this.page.locator('button.kui-button-base.kui-lst-item__btn',{hasText: Role}).first().click()
            await this.page.getByPlaceholder(SearchNameOrEmail_placeholder).fill(emailAddress_info)
            await expect(this.page.locator(FilteredResult_ele)).toContainText(FilteredResult)
        }
        else{
            console.error("Email address info is undefined.")
        }
    }

    // Competitors tab
    async goToCompetitorsPage() {
        await this.page.goto('/automation-test/settings/competitors')
    }
    async assertHasPermissionToCompetitors() {
        await expect(this.page.getByRole('button', {name: Competitors_tab})).toBeVisible()
    }

    // Billing tab
    async goToBillingPage() {
        await this.page.goto('/automation-test/settings/billing')
    }
    async assertHasPermissionToBilling() {
        await expect(this.page.getByRole('button', {name: Billing_tab})).toBeVisible()
    }

}