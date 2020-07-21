<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="title" active-color="#A00000" inactive-color="#000" route>
      <van-tabbar-item name="首页" to="/shop/index" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item name="分类"  to="/shop/category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item name="购物车"  to="/shop/cart" icon="cart-o" :badge="this.$store.state.cartNums">购物车</van-tabbar-item>
      <van-tabbar-item name="我的"  to="/shop/mine" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      title: "首页"
    };
  },
  computed: {},
  watch: {},
  methods: {}
};
</script>

<style scoped>
.van-nav-bar{
  background-color: #FBFBFB;
  border-bottom: #F0F0F0 1px solid;
}
.van-tabbar{
  background-color: #F8F8F8;
  border-top: #dddddd 1px solid;
}
</style>
