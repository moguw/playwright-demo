/**
 * 封装API请求
 * playwright 支持请求api
 * e.g. 
 * await request.fetch('https://example.com/api/', {
  method: 'post',
  data: {
    title: 'title',
    author: 'author',
  }
});
*/
import { request } from '@playwright/test';
export class api_Requests {
    async getRequest(urls,datas){
      const token = (await (await request.newContext()).storageState()).origins[0].localStorage[4].value
      const headers = {
        'X-Auth-Token': token
      }
      const response = await (await request.newContext()).get(urls, {
          headers: headers,
          data: datas
        });
        var rsp = JSON.parse(await response.text())
        console.log("result:", rsp)
        return rsp
    }
    async postRequest(urls,datas){
      const token = (await (await request.newContext()).storageState()).origins[0].localStorage[4].value
      const headers = {
        'X-Auth-Token': token
      }
      const response = await (await request.newContext()).post(urls, {
          headers: headers,
          data: datas
        });
        var rsp = JSON.parse(await response.text())
        console.log("result:", rsp)
        return rsp
    }
}
