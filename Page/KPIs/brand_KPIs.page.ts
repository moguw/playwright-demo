/** Brand KPIs permissions handle
 * KPIs page
 * Create KPI
 * ...
*/

import { Page,expect } from '@playwright/test';

// Brand KPIs page
const BrandKPIs_TopBar_ele = 'div.kpi-page__title-content'
const BrandKPIs_TopBar = 'Brand KPIs'
const CreateKPI_btn = 'Create KPI'
const KPIStatus_Active = 'Active KPIs'
const SearchKPIName_placeholder = 'Search KPI Name'
const TableList_ele = 'tr.kui-table-row > td.kui-table-body__cell'

// Create KPI pop-up
const KPIName_placeholder = 'Type in a KPI name'
const KPINetwork_dropdown_box_ele = 'button.kui-select__btn.publish-network-select'
const Network_Weibo = 'Weibo'
const Network_WeChat = 'WeChat'
const KPIMetric_dropdown_box_ele = 'button.kui-select__btn.network-metrics-select'
const KPIDateComparisonRange_ele = 'button.kui-button.kui-date-range__trigger'
const KPIDateRange_dropdown_box_ele = 'kui-button-base.kui-lst-item__btn'
const Done_btn = 'Done'
const KPITarget_ele = 'div.kui-input'
const Create_btn = 'Create'


export class BrandKPIs {
    page: Page;
    constructor(page: Page) {
      this.page = page;
    }

    // KPIs page
    async goToBrandKPIsPages() {
      await this.page.goto('automation-test/364/reporting/kpis')
    }
    async assertHasPermissionToBrandKPIs() {
      await expect(this.page.locator(BrandKPIs_TopBar_ele)).toContainText(BrandKPIs_TopBar)
    }

    // Create KPI
    async createKPI(KPIName,Network,Metric,DateRange,ComparisonRange,TargetNum) {
      await this.page.getByRole('button', {name: CreateKPI_btn}).first().click()
      await this.page.getByPlaceholder(KPIName_placeholder).fill(KPIName)
      await this.page.locator(KPINetwork_dropdown_box_ele).first().click()
      await this.page.getByRole('listitem').getByRole('option',{name: Network}).first().click()
      await this.page.locator(KPIMetric_dropdown_box_ele).first().click()
      await this.page.getByRole('listitem').getByRole('option',{name: Metric}).first().click()
      await this.page.locator(KPIDateComparisonRange_ele).first().click()
      await this.page.getByRole('listitem').getByRole('option',{name: DateRange}).first().click()
      await this.page.getByRole('button', {name: Done_btn}).first().click()
      await this.page.locator(KPIDateComparisonRange_ele).last().click()
      await this.page.getByRole('listitem').getByRole('option',{name: ComparisonRange}).first().click()
      await this.page.getByRole('button', {name: Done_btn}).first().click()
      await this.page.locator(KPITarget_ele).nth(9).fill(TargetNum)
      await this.page.getByRole('button', {name: Create_btn}).last().click()
    }
    async assertCreateSuccess(Status,KPIName) {
      await this.page.getByRole('button', {name: KPIStatus_Active}).first().click()
      await this.page.getByRole('listitem').getByRole('option',{name: Status}).first().click()
      await this.page.getByPlaceholder(SearchKPIName_placeholder).fill(KPIName)
      await this.page.keyboard.press('enter')
      await expect(this.page.locator(TableList_ele)).toHaveText(KPIName)
    }

  }