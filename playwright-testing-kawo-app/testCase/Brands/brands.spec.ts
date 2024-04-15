import { test,expect } from '@playwright/test'
import { Brands } from '../../Page/Brands/brand.page'
import { brands } from "../../fixture/brands.json"
// import { users } from "../../fixture/user_info.json"
import { generateString, getRandomArrayElements} from "../../utils/Random-setup"
// import * as admin_token from '../../.auth/admin_user_token.json'
// import * as group_token from '../../.auth/group_user_token.json'

/**create Group
 * crate Group after admin user login 
 */

var BrandName = brands.name
var Core = brands.plan.core
var CorePlus = brands.plan.corePlus
var industry = brands.industry.Automotive
var industry_sub = brands.industry.Auto_Brand
var brand_apiRequest_urls = brands.get_brand_apiRequest_para.get_brand_apiRequest_url
var brand_apiRequest_data = brands.get_brand_apiRequest_para.get_brand_apiRequest_data
var brand_expect_result = brands.get_brand_apiRequest_para.get_brand_except_result
var GroupName = 'Auto Test(Dont delete)'
// var admin_header = {'X-Auth-Token':admin_token.origins[0].localStorage[4].value}
test.use({ storageState: process.env.admin_user_token_path });
test('admin_user test create core brands',{tag: '@regression'}, 
    async ({ page }) => {
        // page is authenticated as admin
        // var Plan =getRandomArrayElements(brands.plan,1)//随机取列表中的一个值
        const Brand = new Brands(page)
        await Brand.goToBrandsPage()
        await Brand.createBrands(BrandName,Core,industry,industry_sub)
        await Brand.checkBrandIsCreateSucess()
});

test('admin_user test create core+ brands', {tag: '@regression'},
    async ({ page }) => {
        // page is authenticated as admin
        const Brand = new Brands(page)
        await Brand.goToBrandsPage()
        await Brand.createBrands(BrandName,CorePlus,industry,industry_sub)
        await Brand.checkBrandIsCreateSucess()
  });

test('admin_user test move brands',{tag :['@smoke','@regression']}, 
    async ({ page }) => {
        // page is authenticated as admin
        const Brand = new Brands(page)
        await Brand.goToBrandsPage()
        await Brand.moveBrands('Auto Test Brand',GroupName)
        await Brand.checkMoveBrandtoGroupSucess(GroupName)
  });

test('admin_user test archive brands', {tag :['@smoke','@regression']},
    async ({ page,request }) => {
        // page is authenticated as admin
        const Brand = new Brands(page)
        await Brand.goToBrandsPage()
        await Brand.archiveBrands()
        await Brand.checkBrandIsArchiveSucess()
        // await Brand.checkApiResultSucess(request,brand_apiRequest_urls,admin_header,
        //     brand_apiRequest_data,brand_expect_result)
  });

// test('admin_user request brand_get api result', {tag :['@smoke','@regression']},
//     async ({ page,request }) => {
//         const Brand = new Brands(page)
//         await Brand.checkApiResultSucess(request,brand_apiRequest_urls,admin_header,
//             brand_apiRequest_data,brand_expect_result)
// });


