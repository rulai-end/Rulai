/**
 * 商品相关的路由文件操作
 */
 import Login from "@/pages/Login/login";
 import Register from "@/pages/Login/register";

 //首页
 import Home from "@/pages/Home/home";
 //首页
 import index from "@/pages/Home/index";
 //分类页面
 import category from "@/pages/Home/category";
 //购物车页面
 import cart from "@/pages/Home/cart";
 //个人中心页面
 import mine from "@/pages/Home/mine";

 // 推荐商品详情
 import recommandDetail from "@/pages/Goods/recommand";
 //确认订单
 import confirmOrder from "@/pages/Goods/orderConfirm";
 // 确认支付
 import payConfirm from "@/pages/Goods/payConfirm";
 //添加地址
 import addAddress from "@/pages/User/addAddress";

 //砍价列表
 import CutList from "@/pages/Goods/CutList";
 import recommandList from "@/pages/Goods/recommandList";
 import specialList from "@/pages/Article/specialList";
 import special from "@/pages/Article/special";

 //定义路由严选商城专用
 const routes = [
     //登陆的路由信息
     {
        path: "/shop/login",
        name: "shop_login",
        component: Login,
        meta:{
            title: "严选商城-用户登陆"
        }
     },
     //注册的路由信息
     {
        path: "/shop/register",
        name: "shop_register",
        component: Register,
        meta:{
            title: "严选商城-用户注册"
        }
     },
     /**首页信息 */
     {
         path: "/",
         component: Home,
         redirect: "/shop/index",
         children:[
             {
                 path:"/shop/index",
                 name:"shop_index",
                component:index,
                meta:{
                    title: "严选商城-首页"
                },
             },
             {
                path:"/shop/category",
                name:"shop_category",
               component:category,
               meta:{
                   title: "严选商城-分类"
               },
            },
            {
                path:"/shop/cart",
                name:"shop_cart",
               component:cart,
               meta:{
                   title: "严选商城-购物车"
               },
            },
            {
                path:"/shop/mine",
                name:"shop_mine",
               component:mine,
               meta:{
                   title: "严选商城-用户中心"
               },
            },
         ]
     },
     //砍价商品列表
     {
        path:"/shop/cut/list",
        name: "shop_cut",
        component: CutList,
        meta:{
            title:"严选商城-砍价列表"
        }
     },
     //专栏列表
     {
         path:"/shop/special/list",
         name: "special_list",
         component: specialList,
         meta:{
            title:"严选商城-专栏列表"
        }
     },
     //专栏详情
     {
        path: "/shop/special/:id",
        name: "special",
        component: special,
        meta:{
            title: "严选商城-专栏文章"
        }
     },
     //推荐商品列表
     {
        path:"/shop/recommand/list",
        name: "recommand_list",
        component: recommandList,
        meta:{
           title:"严选商城-推荐列表"
       }
    },
     //商品详情页，推荐页面
     {
         path: "/shop/recommand/:id",
         name: "shop_recommand",
         component: recommandDetail,
         meta:{
             title: "严选商城-推荐商品"
         }
     },
     //订单确认页面
     {
         path:"/shop/order/confirm",
         name: "order_confirm",
         component: confirmOrder,
         meta:{
             title:"严选商城-订单确认",
         }
     },{
        path:"/shop/pay/confirm",
        name: "pay_confirm",
        component: payConfirm,
        meta:{
            title:"严选商城-支付确认",
        }
    },{
        path: "/shop/add/address",
        name: "add_address",
        component: addAddress,
        meta:{
            title:"严选商品-添加地址"
        }
     }
 ];

 export default routes;