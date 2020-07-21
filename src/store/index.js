import Vue from "vue";

import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({

    // state数据的定义
    state:{
        cartNums: "",//购物车商品的数量
    },
    //操作state数据
    mutations:{
        //设置购物车商品的数量
        setCartNums(state,payloads){
            state.cartNums = payloads;
        }
    },

    getters:{

    },

    actions:{

    },
    modules:{

    }
});

export default store;