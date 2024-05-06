import { expect, test } from '@playwright/test';
import { api_Requests } from '../../utils/API-setup'
import { brands_api_info } from '../../testData/brands.json'

const url = brands_api_info.url
const method = brands_api_info.method
const request_datas = [brands_api_info.request_datas_case['case_moveIn_sucess_to_group'],
                        brands_api_info.request_datas_case['case_moveOut_sucess_to_group']]
const expect_datas= [brands_api_info.except_datas_case['case_moveIn_sucess_to_group'],
                        brands_api_info.except_datas_case['case_moveOut_sucess_to_group']]

test.describe("test - brand case", () => {
    let api: api_Requests
    /**
   * test.beforeEach 执行测试用例前的准备工作
   */
    test.beforeEach(async ({ }) => {
       api = new api_Requests()
    })
    test.describe("test - move brands to group", () => {
      test("Org Owner",{tag: '@API'}, 
        async ({ }) => {
          for(var i=0; i<request_datas.length; i++){
            const response = await api.OrgOwnerRequestHttpAPI(method,url,request_datas[i])
            await expect(JSON.stringify(response)).toContain(expect_datas[i])
          }
      });
    });
})