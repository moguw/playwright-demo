import { test,expect } from '@playwright/test'
import { Brands } from '../../Page/Brands/brand.page'
import { brands } from "../../testData/brands.json"
import { generateString, getRandomArrayElements} from "../../utils/Random-setup"
import { api_Requests } from '../../utils/API-setup'
/**create Group
 * crate Group after admin user login 
 */
var BrandName = brands.name
var Core = brands.plan.core
var CorePlus = brands.plan.corePlus
var industry = brands.industry.Automotive
var industry_sub = brands.industry.Auto_Brand
var GroupName = 'Auto Test(Dont delete)'
var brand_urls = brands.get_brand_apiRequest_para.get_brand_apiRequest_url
var brand_apiRequest_data = brands.get_brand_apiRequest_para.get_brand_apiRequest_data
var brand_expect_result = brands.get_brand_apiRequest_para.get_brand_except_result
test.use({ storageState: process.env.admin_user_token_path });
test('admin_user test create core brands',{tag: '@regression'}, 
    async ({ page }) => {
        // page is authenticated as admin
        // var Plan =getRandomArrayElements(brands.plan,1)//随机取列表中的一个值
        const Brand = new Brands(page)
        await Brand.goToBrandsPage()
        await Brand.createBrands(BrandName,Core,industry,industry_sub)
        // await Brand.checkBrandIsCreateSucess()
});

test('admin_user test create core+ brands', {tag: '@regression'},
    async ({ page }) => {
        // page is authenticated as admin
        const Brand = new Brands(page)
        await Brand.goToBrandsPage()
        await Brand.createBrands(BrandName,CorePlus,industry,industry_sub)
        // await Brand.checkBrandIsCreateSucess()
  });

test('admin_user test move brands',{tag :['@smoke','@regression']}, 
    async ({ page }) => {
        // page is authenticated as admin
        const Brand = new Brands(page)
        await Brand.goToBrandsPage()
        await Brand.moveBrands('Auto Test Brand',GroupName)
        // await Brand.checkMoveBrandtoGroupSucess(GroupName)
  });

// test('admin_user test archive brands', {tag :['@smoke','@regression']},
//     async ({ page }) => {
//         // page is authenticated as admin
//         const Brand = new Brands(page)
//         const api = new api_Requests()
//         await Brand.goToBrandsPage()
//         await Brand.archiveBrands()
//         // await Brand.checkBrandIsArchiveSucess()
//         const rsp = await api.getRequest(brand_urls,brand_apiRequest_data)
//         await expect(rsp[0]['id']).toContain(brand_expect_result) 
//   });
// const token = (await page.context().storageState()).origins[0].localStorage[4].value
// test('admin_user request brand_get api result', {tag :['@smoke','@regression']},
//     async ({ page,request }) => {
//         const Brand = new Brands(page)
//         await Brand.checkApiResultSucess(request,urls,brand_apiRequest_data)
// });