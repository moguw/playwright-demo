import { Page,expect } from '@playwright/test';

const brandSetting_element = 'a[data-tooltip="Settings"]'
const Users_element = 'text=Users'
const Role_element = 'Role'
// const Roles_element = 'Brand Owner'
const SearchNameOrEmail_placeholder = 'Name or Email'
const filter_num_element = 'div.filterCount--O8eqd > div.kui-typ.kui-typ__body2.filterCountFiltered--SGZV9 > span'
const Roles_listRow_element = 'tbody.kui-table-body > tr.kui-table-row'
const Roles_list_element = 'td.user-management__roles-cell.kui-table-body__cell'
const title_element = 'text=User Management'
const invite_user_element = 'text=Invite User'
const Email_placeholder = "Please enter the invitee's email address"
const Invite_btn = 'Invite'
/**
 * invite user
 * edit user
 * delete user
 * ...
 */
export class User {
    page: Page;
    constructor(page: Page) {
      this.page = page;
    }
    async goToBrandSettingPage() {
        await this.page.goto('/automation-test/overview');
        await this.page.locator(brandSetting_element).last().click()
        await this.page.waitForSelector(Users_element)
        await this.page.locator(Users_element).first().click()
    }
    async inviteUser(EmailAddress) {
        await this.page.locator(invite_user_element).first().click()
        await this.page.getByPlaceholder(Email_placeholder).fill(EmailAddress)
        await this.page.getByRole('button', {name: Invite_btn}).last().click()
        
    }
    async deleteUser(Roles) { 
        await this.page.getByRole('button',{ name: Role_element }).first().click()
        await this.page.getByRole('listitem').getByRole("option",{name: Roles}).first().click() 
        await this.page.locator(title_element).first().click({force: true})
        await this.page.getByPlaceholder(SearchNameOrEmail_placeholder).fill('auto') 
        const filter_value = await this.page.locator(filter_num_element).first().innerText()
        var filter_num = parseInt(filter_value.replace(/[^\d]/g,""))
        if(filter_num === 0){
            console.log('no user have been deleted, please add one if you want run this case')
        }
        else{
            for(var i = 0; i < filter_num; i++){
                if(await this.page.locator(Roles_listRow_element).nth(i).locator(Roles_list_element).innerText() === Roles){
                    //delete 
                    console.log(i,'delete.....') 
                    break
                }
                else{
                    console.log(i,'skip.......')  
                }
            }
        }  
    }
  }