import { Page,expect } from '@playwright/test';


const changeBrandPlan_element = 'text=Change Brand Plan'
const currentBrand_plan= 'div.options__text.options__text_large'
const CorePlus_element = 'button[data-plan="PREMIUM"]'
const Core_element = 'button[data-plan="STANDARD"]'
const brandSetting_element = 'a[data-tooltip="Settings"]'
const Industry_element = 'text=Industry'
const IndustrySubcategory_element = 'text=Industry Subcategory'
const confirmButton_element = 'button[data-value="confirm"]'
const Industry_value_element = 'div.options__text.options__text_large'
export class General {
    page: Page;
    constructor(page: Page) {
      this.page = page;
    }
    async goToBrandSettingPage() {
        await this.page.goto('overview/Brands');
        await this.page.locator(brandSetting_element).last().click()
        
    }
    async changeBrandPlan() {
        await expect(this.page.locator(currentBrand_plan).first()).toBeVisible()
        const currentBrand_value = await this.page.locator(currentBrand_plan).first().innerText()
        if(currentBrand_value === 'CORE'){
            await this.page.locator(changeBrandPlan_element).click()
            await this.page.locator(CorePlus_element).first().click()
            await this.page.locator(confirmButton_element).click()
        }
        else{
            await this.page.locator(changeBrandPlan_element).click()
            await this.page.locator(Core_element).first().click()
            await this.page.locator(confirmButton_element).click()
        }
    }
    async BrandCategroy(){
        await this.page.locator(Industry_element).nth(1).click()
        let Industry_Value_element = await this.page.locator('.btn-list > .btn').all()
        let IndustryRandomIndex = Math.floor(Math.random() * Industry_Value_element.length)
        await Industry_Value_element[IndustryRandomIndex].click()
        if(await this.page.locator(Industry_value_element).nth(1).innerText() === 'Other'){
            console.log('Industry is Other,you do not need to chose industrySub')
        }
        else{
            await this.page.waitForTimeout(1000)
            await this.page.locator(IndustrySubcategory_element).click() 
            let IndustrySub_Value_element = await this.page.locator('.btn-list > .btn').all()
            let IndustrySubRandomIndex = Math.floor(Math.random() * IndustrySub_Value_element.length)
            await IndustrySub_Value_element[IndustrySubRandomIndex].click()
        } 
    }
       
}
