import { Page,expect } from '@playwright/test';
const brandSetting_element = 'a[data-tooltip="Settings"]'
const Admin_element = 'a[data-href="/:org/:brand/settings/admin"]'
const QRCode_element = 'input[data-value="qrcodes"]'
const QRCodeSwitchISOpen_element = '.options__switch__input.options__switch__input_switched'


export class Admin{
    page: Page;
    constructor(page: Page) {
      this.page = page;
    }
    async goToBrandSettingPage() {
        await this.page.goto('/automation-test/overview/Brands');
        await this.page.locator(brandSetting_element).last().click()
        await this.page.locator(Admin_element).first().click()
    } 
    async CreateQRCodes(){
        await this.page.locator(QRCode_element).click()
    }
}