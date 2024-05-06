/**
 * 封装API请求
 * playwright 支持请求api
 * e.g. 
 await request.fetch('https://example.com/api/', {
  method: 'post',
  data: {
    title: 'title',
    author: 'author',
  }
});
*/
import { request } from '@playwright/test';
const RoleData = {
  'OrgOwner': process.env.org_owner_token_path,
  'BrandOwner': process.env.brand_owner_token_path,
  'GroupOwner': process.env.group_owner_token_path,
  'operator': process.env.operator_token_path
}
export class api_Requests {
    /**
     * 从登录后的页面中获取org owner的authToken
     * @param roles 
     * @param methods 
     * @param urls 
     * @param datas 
     * @returns 
     */
    async GetResponseData(roles,methods,urls,datas){
      const localStorage =  (await (await request.newContext({ storageState: roles })).storageState()).origins[0].localStorage
      function headers(){
          for(var i=0; i< localStorage.length; i++){
              if(localStorage[i].name === "authToken"){
                const headers = {'X-Auth-Token': localStorage[i].value}
                return headers 
              }
          }
        }
      const requests =  await request.newContext({ storageState: roles })
      const GetData = await requests.fetch(urls, {
        method: methods,
        headers: headers(),
        data: datas
      });
      var rsp = JSON.parse(await GetData.text())
      console.log("api request result:", rsp)
      return rsp
    }
   
    // org owner请求api接口
    async OrgOwnerRequestHttpAPI(methods,urls,datas:object ={}){
      return await this.GetResponseData(RoleData.OrgOwner,methods,urls,datas)
    }
    // brand owner请求api接口
    async BrandOwnerRequestHttpAPI(methods,urls,datas:object ={}){
      return await this.GetResponseData(RoleData.BrandOwner,methods,urls,datas)
    }
    // group owner请求api接口
    async GroupOwnerRequestHttpAPI(methods,urls,datas:object ={}){
      return await this.GetResponseData(RoleData.GroupOwner,methods,urls,datas)
    }
    // operator owner请求api接口
    async operatorRequestHttpAPI(methods,urls,datas:object ={}){
      return await this.GetResponseData(RoleData.operator,methods,urls,datas)
    }
}
//---------------------------------------------------------

/**
 * request请求
 */
  //   async operatorRequestHttpAPI(methods,urls,datas:object ={}){
  //     const localStorage =  (await (await request.newContext({ storageState: RoleData.operator })).storageState()).origins[0].localStorage
  //     const response =  (await request.newContext({ storageState: RoleData.operator }))
  //     function headers(){
  //       for(var i=0; i< localStorage.length; i++){
  //         if(localStorage[i].name === "authToken"){
  //           const headers = {'X-Auth-Token': localStorage[i].value}
  //           return headers 
  //         }
  //       }
  //     }
  //     const GetData = await response.fetch(urls, {
  //       method: methods,
  //       headers: headers(),
  //       data: datas
  //     });
  //     var rsp = JSON.parse(await GetData.text())
  //     console.log("result:", rsp)
  //     return rsp
  // }

