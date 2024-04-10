/**
 * 封装API请求
 */
export class API_Requests {
    async API_Get(request,urls,header,request_data){
        const response = await request.get(urls, {
          headers: header,
          data: request_data
        });
        var rsp = JSON.parse(await response.text())
        console.log("result:", rsp)
        return rsp
    }
    async API_Post(request,urls,header,request_data){
        const response = await request.post(urls, {
          headers: header,
          data: request_data
        });
        var rsp = JSON.parse(await response.text())
        console.log("result:", rsp)
        return rsp
    }
}
