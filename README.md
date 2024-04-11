# kawo-app-playwright-testing
## **Background**
Many of the major features on the KAWO were smoothed out, including the business logic and front-end interface presentation changes were not as frequent.

In addition, due to the complexity of the project, there are many regression testing paths that need to be done, and relying on manual testing alone is time-consuming and prone to human errors that require re-testing a test case.

Therefore, there is a great need for automated testing to help free up some of the manual testing resources.

## **What are the goals?**
1. Improve the efficiency of smoky test execution
1. Speed up the execution of regression tests
1. Avoid test failures caused by human errors
1. Improve test coverage
1. Execute tests during non-working hours
1. Free up some QA human resources
1. Improve the quality of project delivery

## **Getting Started**
This repo contains the following technology stack：

Recipe | Description
---|---
JavaScript | JavaScript is the world's most popular programming language.
TypeScript | TypeScript is JavaScript with syntax for types.
Playwright | Playwright is a front end testing tool, and support to run end-to-end (E2E) tests on a browser.

### **Introduction**
Use the PO model to manage test cases, as shown below：
```
# ../Page/Brands/brand.page.ts
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
}
```

```
## ../testcase/Brands/brands.spec.ts
test.use({ storageState: users.admin_user.admin_User_Token_File_Path });
test('admin_user test create core brands',{tag: '@regression'}, 
    async ({ page }) => {
        // page is authenticated as admin
        const Brand = new Brands(page)
        await Brand.goToBrandsPage()
        await Brand.createBrands(BrandName,Core,industry,industry_sub)
        await Brand.checkBrandIsCreateSucess()
});
```

Project tree:
```
.
├── README.md
├── playwright-testing-kawo-app
│   ├── envfile  （Storage of all env information）
│   ├── fixtures （Storage of all test data）
│   └── Page
│       ├── Brand.page.ts  ( element operater )
│       ├── ...
│   └── testcase
│       ├── Brand.spec.ts ( testcase )
│       ├── ...
│   └── utils
│       ├── API-setup.ts （ requrest.get/post/.. api ）
│       ├── ENV-setup.ts （ read different env information ）
│       └── Random-setup.ts （ generate random string...）
├── playwright.config.ts （ global set,such as url,report,browser.. ）
├── package.json
├── test-result  ( only failure result will screeshot )
├── playwright-report  ( Storage of all report information )
```

### **Prerequisites**
The only requirement for this project is to have Node.js version 14 installed on your machine. 

### **Installation**
```
1. nodejs
2. playwright
3. dotenv
```
### **Run Test**
```
# Open the debugging tool and run the test
npm run debug

# browsing mode running test in the delta/staging/beta environment
npm run delta_regresionCase/staging_regresionCase
```

