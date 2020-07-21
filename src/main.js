// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/**
 * 引入vuex的内容
 */
import store from "@/store/index";
/**
 * 引入 vant组件
 */
import Vant from "vant";
import 'vant/lib/index.css';
Vue.use(Vant);

/**
 * 引入 axios
 */
import axios from "@/utils/request";
Vue.prototype.$axios = axios;//设置到原型中去

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
