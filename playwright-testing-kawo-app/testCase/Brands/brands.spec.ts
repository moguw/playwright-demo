import { test,expect } from '@playwright/test'
import { Brands } from '../../Page/Brands/brand.page'
import { brands } from "../../fixture/brands.json"
import { generateString, getRandomArrayElements} from "../../utils/Random-setup"

/**create Group
 * crate Group after admin user login 
 */

var BrandName = brands.name
var Core = brands.plan.core
var CorePlus = brands.plan.corePlus
var industry = brands.industry.Automotive
var industry_sub = brands.industry.Auto_Brand
var GroupName = 'Auto Test(Dont delete)'
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


