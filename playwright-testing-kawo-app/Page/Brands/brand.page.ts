/** brands function handle
 * brands create 
 * brands delete
 * brands rename
 * brands move to others group
 * ...
*/
import { Page,expect } from '@playwright/test';
import { API_Requests } from '../../utils/API-setup'
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
    }
    async moveBrands(BrandName,GroupName) {
        await this.page.getByRole('button',{ name: moveBrand_element }).first().click()
        await this.page.locator(SearchBrandName_element).fill(BrandName)
        await this.page.locator(BrandList_element).first().click()
        await this.page.getByRole('button',{ name: move_element }).last().click()
        await this.page.getByRole('button',{ name: GroupName }).first().click()
        await this.page.getByRole('button',{ name: move_element }).last().click()
        await this.page.getByRole('button',{ name: move_element }).last().click()
    }
    async archiveBrands(name) {     
        await this.page.locator(setting_element).last().click()
        await this.page.locator(archiveBrand_element).click()
        await this.page.locator(archiveBrandName_element).fill(name)
        await this.page.locator(archiveButton_element).last().click()
    }
    async checkBrandIsCreateSucess(){
      await expect(this.page).toHaveURL(/.*general/)
    }
    async checkMoveBrandtoGroupSucess(GroupName){
      await this.page.waitForTimeout(1000)
      await expect(this.page.locator(BrandList_element).nth(2)).toContainText(GroupName)

    }
    async checkBrandIsArchiveSucess(){
      await expect(this.page).toHaveURL(/.*archived/)
    }
    // except_result、URL、request_data存储在./fixture/.json文件中
    async checkApiResultSucess(request,urls,header,request_data,expect_result){
      const api = new API_Requests()
      const rsp = await api.API_Get(request,urls,header,request_data)
      await expect(rsp[0]["id"]).toContain(expect_result)
    }
    // async checkApiResultSucess(request,urls,header,request_data,expect_data){
    //   const response = await request.get(urls, {
    //     headers: header,
    //     data: request_data
    //   });
    //   var rsp = JSON.parse(await response.text())
    //   console.log("result:", rsp)
    //   await expect(rsp[0]["id"]).toBe(expect_data)
    // }
  }