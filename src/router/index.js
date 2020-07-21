import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import shop from "./shop";

import storage from "@/utils/storage";

Vue.use(Router)

const routes =  new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    //商城路由文件
    ...shop
  ]
});

//定义一个全局路由守卫
routes.beforeEach((to,from,next)=>{

  //判断是否定义title，如果定义了直接操作，设置title值
  if(to.hasOwnProperty("meta")){
    document.title = to.meta.title;
  }

  //如果在登陆或者注册页面发现用户token值存在直接跳转到用户中心页面
  if(to.path == "/shop/login" || to.path == "/shop/register"){

    let token = localStorage.getItem("shop_token");
    if(token !=null){
      next("/shop/mine");
    }
  }

  //设置购物车的数量
  storage.getCartNums();

  next();
});


export default routes;
