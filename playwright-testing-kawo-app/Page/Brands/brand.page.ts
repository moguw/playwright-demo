/** brands function handle
 * brands create 
 * brands delete
 * brands rename
 * brands move to others group
 * ...
*/
import { Page,expect} from '@playwright/test';
import { api_Requests } from '../../utils/API-setup'
import { brands } from "../../fixture/brands.json"
const CreateBrandButton_element = 'text=Create Brand'
const BrandName_element = 'input[placeholder="Input Brand Name"]'
const SearchBrandName_element = 'input[placeholder="Search brand name"]'
const Plan_element = 'text=Select Plan'
const Industry_element = 'text=Select Industry'
const Create_button_element = 'button[form="createBrand"]'
const BrandList_element = '.kui-table-body__cell'
const move_element = 'Move'
const moveBrand_element = 'Move Brands'
const setting_element = 'a[data-tooltip="Settings"]'
const archiveBrand_element = 'text=archive this brand'
const archiveBrandName_element = 'input[data-view-id="archiveBrandInput"]'
const archiveButton_element = 'text=Archive'
const get_brand_name_element = '.kui-txt > small'
const brand_name_element = 'input[placeholder="Brand name..."]'
const save_button_element = 'text=SAVE'

export class Brands {
    page: Page;
    constructor(page: Page) {
      this.page = page;
    }
    async goToBrandsPage() {
        await this.page.goto('/automation-test/overview/Brands'); 
    }
    async createBrands(name,plan,industry,industry_sub) {
        await this.page.locator(CreateBrandButton_element).first().click()  
        await this.page.locator(BrandName_element).fill(name)
        await this.page.locator(Plan_element).click()
        await this.page.waitForTimeout(1000)
        await this.page.getByRole('option',{ name: plan }).first().click() 
        await this.page.locator(Industry_element).click() 
        await this.page.getByRole('listitem').getByRole("button",{name: industry}).first().click()
        await this.page.getByRole('listitem').getByRole("button",{name: industry_sub}).first().click()
        await this.page.locator(Create_button_element).first().click()
        await this.page.getByRole('button',{ name: 'Create' }).last().click()
        await expect(this.page).toHaveURL(/.*general/)
    }
    async moveBrands(BrandName,GroupName) {
        await this.page.getByRole('button',{ name: moveBrand_element }).first().click()
        await this.page.locator(SearchBrandName_element).fill(BrandName)
        await this.page.locator(BrandList_element).first().click()
        await this.page.getByRole('button',{ name: move_element }).last().click()
        await this.page.getByRole('button',{ name: GroupName }).first().click()
        await this.page.getByRole('button',{ name: move_element }).last().click()
        await this.page.getByRole('button',{ name: move_element }).last().click()
        await this.page.waitForTimeout(1000)
        await expect(this.page.locator(BrandList_element).nth(2)).toContainText(GroupName)
    }
    async archiveBrands() {     
        await this.page.locator(setting_element).last().click()
        const brand_name_value = await this.page.locator(get_brand_name_element).innerText()
        if(brand_name_value === 'AUTO TEST BRAND(DONT DELETE)'){
          console.log('this is a auto test brand,please do not delete this brand,thanks')
          await this.page.goto('/automation-test/overview/brands/group/archived')
          await expect(this.page).toHaveURL(/.*archived/)
        }
        else{
          await this.page.locator(brand_name_element).fill('')
          await this.page.locator(brand_name_element).fill(brand_name_value)
          await this.page.locator(save_button_element).first().click()
          await this.page.locator(archiveBrand_element).click()
          await this.page.locator(archiveBrandName_element).fill(brand_name_value)
          await this.page.locator(archiveButton_element).last().click()
          await expect(this.page).toHaveURL(/.*archived/)
        }
    }
    // async checkBrandIsCreateSucess(){
    //   await expect(this.page).toHaveURL(/.*general/)
    // }
    // async checkMoveBrandtoGroupSucess(GroupName){
    //   await this.page.waitForTimeout(1000)
    //   await expect(this.page.locator(BrandList_element).nth(2)).toContainText(GroupName)

    // }
    // async checkBrandIsArchiveSucess(){
    //   await expect(this.page).toHaveURL(/.*archived/)
    // }
   
}
    // async checkApiResultSucess(){
    //   const api = new api_Requests()
    //   const rsp = await api.getRequest(urls,brand_apiRequest_data)
    //   await expect(rsp[0]['id']).toContain(brand_expect_result)
    // }
    // except_result、URL、request_data存储在./fixture/.json文件中
    // async checkApiResultSucess(request,urls,header,request_data,expect_data){
    //   const response = await request.get(urls, {
    //     headers: header,
    //     data: request_data
    //   });
    //   var rsp = JSON.parse(await response.text())
    //   console.log("result:", rsp)
    //   await expect(rsp[0]["id"]).toBe(expect_data)
    // }
  
