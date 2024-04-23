/** Org settings permissions handle
 * General menu 
 * Users tab
 * Invite user
 * ...
*/

import { Page,expect } from '@playwright/test';
import { parseArgs } from 'util';


const RemindNoPermission_element = 'h2.kui-typ.kui-typ__h2'
const RemindNoPermission_text = "You don't have permission to view this page"
const General_title = /.*General/

// Users page
const Users_tab = 'Users'
const InviteUsers_btn = 'Invite User'
const EmailAddress_element = 'div.kui-typ.kui-typ__body3'
const SearchNameOrEmail_placeholder = 'Name or Email'
const Role_dropdown_box = 'Role'

// Invite(Edit) User Pop-up
const Email_placeholder = "Please enter the invitee's email address"
const Invite_btn = 'Invite'
const Groups_dropdown_box = 'Brand Groups'
const Brands_dropdown_box = 'Brands'
const DeleteRole_btn_element = 'div.roleCell--y9CHN > button.kui-button-base.kui-button'
const Save_btn = 'Save'

export class OrgSettings {
    page: Page;
    constructor(page: Page) {
      this.page = page;
    }
    async goToGeneralPage() {
        await this.page.goto('/automation-test/settings/general')
    } 
    async assertHasPermissionToGeneral() {
        await expect(this.page).toHaveTitle(General_title)
    }
    async assertNoPermissionToPage() {
        await expect(this.page.locator(RemindNoPermission_element)).toHaveText(RemindNoPermission_text)
    }   

    async goToUsersPage() {
        await this.page.goto('/automation-test/settings/users')
    }
    async assertHasPermissionToUsers() {
        await expect(this.page.getByRole('button', {name: Users_tab})).toBeVisible()
    }

    async inviteUsersToBeOrgOwner(EmailAddress) {
        await this.page.getByRole('button', {name: InviteUsers_btn}).first().click()
        await this.page.getByPlaceholder(Email_placeholder).fill(EmailAddress)
        await this.page.getByRole('button', {name: Invite_btn}).last().click()
    }
    async inviteUsersToBeGroupOwner(EmailAddress,Groups_selection) {
        await this.page.getByRole('button', {name: InviteUsers_btn}).first().click()
        await this.page.getByPlaceholder(Email_placeholder).fill(EmailAddress)
        await this.page.locator('button.kui-select__btn', {hasText: Groups_dropdown_box}).last().click()
        await this.page.getByRole('listitem').getByRole('option',{name: Groups_selection}).first().click()
        await this.page.locator(DeleteRole_btn_element).click({force: true})
        await this.page.getByRole('button', {name: Invite_btn}).last().click()
    }
    async inviteUsersToBeBrandOwner(EmailAddress,Groups_selection,Brands_selection) {
        await this.page.getByRole('button', {name: InviteUsers_btn}).first().click()
        await this.page.getByPlaceholder(Email_placeholder).fill(EmailAddress)
        await this.page.locator('button.kui-select__btn', {hasText: Brands_dropdown_box}).last().click()
        await this.page.getByRole('listitem').getByRole('button',{name: Groups_selection}).first().click()
        await this.page.getByRole('listitem').getByRole('option',{name: Brands_selection}).first().click()
        await this.page.getByRole('button', {name: Invite_btn}).last().click()
    }
    async assertInviteSuccess(EmailAddress) {
        await this.page.getByPlaceholder(SearchNameOrEmail_placeholder).fill(EmailAddress)
        await expect(this.page.locator(EmailAddress_element)).toContainText(EmailAddress)
    }

    async editUserFromOrgToGroup(EmailAddress,Groups_selection) {
        await this.page.getByRole('button',{name: Role_dropdown_box}).first().click()
        await this.page.getByRole('listitem').getByRole('option',{name: 'Org Owner'}).first().click()
        await this.page.locator('div.kui-typ.kui-typ__body2.filterCountFiltered--SGZV9',{hasText: 'Filtered'}).first().click()
        // await this.page.locator('div.kui-typ.kui-typ__slogan.kawo-page-title',{hasText:'User Management'}).first().click()
        await this.page.getByPlaceholder(SearchNameOrEmail_placeholder).fill(EmailAddress)
        await this.page.locator('button[data-tooltip="Edit User"]').first().click()
        const emailAddress_info = await this.page.locator('div.kui-typ.kui-typ__body2').innerText()
        await this.page.locator('button.kui-button-base.kui-button.kui-select__btn').first().click()
        await this.page.getByRole('listitem').getByRole('option',{name: 'Group Owner'}).first().click()
        await this.page.locator('button.kui-select__btn', {hasText: Groups_dropdown_box}).last().click()
        await this.page.getByRole('listitem').getByRole('option',{name: Groups_selection}).first().click()
        await this.page.locator(DeleteRole_btn_element).click({force: true})
        await this.page.getByRole('button', {name: Save_btn}).last().click()
        return emailAddress_info
    }

    async assertEditSuccess(EmailAddress,Groups_selection) {
        const emailAddress_info = await this.editUserFromOrgToGroup(EmailAddress,Groups_selection)
        await this.page.getByPlaceholder(SearchNameOrEmail_placeholder).fill(emailAddress_info)
        await expect(this.page.locator('td.user-management__roles-cell.kui-table-body__cell')).toHaveText('Org Owner')
    }






}