/**
 * 定义axios拦截器
 */
 import Server from "axios";

 //创建一个空的axios对象
 Server.create({

 });

 //定义请求拦截器
 Server.interceptors.request.use((config)=>{
     //如果接口指定说不需要携带token值，那么
    if ("params" in config && config.params.noToken == true) {
        return config;
    }
    let token = localStorage.getItem("shop_token");
    if (token) {
        //传递公共参数token
        if ("params" in config) {
            config.params.token = token;
        } else {
            config.params = {
                token: token
            }
        }
    }
    return config;
 },function(error){
     return Promise.reject(error);
 })


 //定义响应拦截器
Server.interceptors.response.use((response)=>{
     //格式化数据响应格式
     if(response.status == 200){
         return response.data;
     }
 },function(error){

     return Promise.reject(error);
});

export default Server;
