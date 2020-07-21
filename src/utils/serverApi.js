/**
 * 严选商城所有请求的url地址列表
 */
const prefix = "https://api.it120.cc/small4";//前缀
const urls = {
    picCodeUrl: prefix+"/verification/pic/get",//获取图形验证码url地址
    sendCodeUrl: prefix+"/verification/sms/get",//发送短信验证码接口
    checkCodeUrl: prefix+"/verification/sms/check",//发送短信验证码校验接口
    userRegister: prefix+"/user/m/register",//用户注册接口
    bannerList: prefix+"/banner/list",//banner图接口,
    cutList: prefix+"/shop/goods/kanjia/list",//获取砍价的商品列表
    goodsList: prefix+"/shop/goods/list",//获取商品的李诶包
    goodsDetail: prefix+"/shop/goods/detail",//商品详情
};

export default urls;