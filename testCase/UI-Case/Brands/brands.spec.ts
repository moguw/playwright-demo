import { test,expect } from '../../../utils/Fixture-setup';
import { Brands } from '../../../Page/Brands/brand.page'
import { brands_ui_info } from "../../../testData/brands.json"
/**create Group
 * crate Group after org owner login 
 */
var BrandName = brands_ui_info.name
var Core = brands_ui_info.plan.core
var CorePlus = brands_ui_info.plan.corePlus
var industry = brands_ui_info.industry.Automotive
var industry_sub = brands_ui_info.industry.Auto_Brand
var GroupName = 'Auto Test(Dont delete)'
test.describe('test brand case',()=>{
  /**
   * test.beforeEach 执行测试用例前的准备工作
   */
  let orgOwnerRole, groupOwnerRole: Brands

  test.beforeEach(async ({ orgOwner }) => {
      orgOwnerRole = new Brands(orgOwner.page)
  })
  test.describe('test - move brands to group',() => {
      test('orgOwner', {tag: '@brand'},
          async ({ }) => {
              // page is authenticated as orgOwner
              await orgOwnerRole.goToBrandsPage()
              await orgOwnerRole.moveBrands('Auto Test Brand',GroupName)
              await orgOwnerRole.checkMoveBrandtoGroupSucess(GroupName)
      }); 
    });
})

/**
 * 暂时的禁用以下case，请误删
 * 
 * 
 */

// test.describe('test - create core brands',() => {
//     test('orgOwner', {tag: '@brand'},
//         async ({ orgOwner }) => {
//             // page is authenticated as admin
//             const orgOwnerRole = new Brands(orgOwner.page)
//             await orgOwnerRole.goToBrandsPage()
//             await orgOwnerRole.createBrands(BrandName,Core,industry,industry_sub)
//             await orgOwnerRole.checkBrandIsCreateSucess()
//     }); 
//   });

// test.describe('test - create core+ brands',() => {
//     test('orgOwner', {tag: '@brand'},
//         async ({ orgOwner }) => {
//             // page is authenticated as admin
//             const orgOwnerRole = new Brands(orgOwner.page)
//             await orgOwnerRole.goToBrandsPage()
//             await orgOwnerRole.createBrands(BrandName,CorePlus,industry,industry_sub)
//             await orgOwnerRole.checkBrandIsCreateSucess()
//     }); 
//   });


// test.use({ storageState: process.env.admin_user_token_path });
// test('org owner test create core brands',{tag: '@regression'}, 
//     async ({ page }) => {
//         // page is authenticated as admin
//         // var Plan =getRandomArrayElements(brands.plan,1)//随机取列表中的一个值
//         const Brand = new Brands(page)
//         await Brand.goToBrandsPage()
//         await Brand.createBrands(BrandName,Core,industry,industry_sub)
//         // await Brand.checkBrandIsCreateSucess()
// });

// test('org owner test create core+ brands', {tag: '@regression'},
//     async ({ page }) => {
//         // page is authenticated as admin
//         const Brand = new Brands(page)
//         await Brand.goToBrandsPage()
//         await Brand.createBrands(BrandName,CorePlus,industry,industry_sub)
//         // await Brand.checkBrandIsCreateSucess()
//   });

// test('org owner test move brands',{tag :['@smoke','@regression']}, 
//     async ({ page }) => {
//         // page is authenticated as admin
//         const Brand = new Brands(page)
//         await Brand.goToBrandsPage()
//         await Brand.moveBrands('Auto Test Brand',GroupName)
//         // await Brand.checkMoveBrandtoGroupSucess(GroupName)
//   });

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