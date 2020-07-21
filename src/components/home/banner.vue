<template>
  <!-- 轮播图区域 -->
  <div id="swiper">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item,index) in bannerList" :key="index">
        <van-image :src="item.picUrl" width="100%" />
      </van-swipe-item>
    </van-swipe>
    <nav>
      <figure>
        <van-icon name="like" size="35" color="#DD0000" />
        <figcaption>签到</figcaption>
      </figure>
      <figure>
        <van-icon name="gift" size="35" color="#DD0000" />
        <figcaption>礼券</figcaption>
      </figure>
      <router-link tag="figure" to="/shop/cut/list">
        <van-icon name="coupon" size="35" color="#DD0000" />
        <figcaption>砍价</figcaption>
      </router-link>
      <router-link tag="figure" to="/shop/special/list">
         <van-icon name="bookmark" size="35" color="#DD0000" />
        <figcaption>专栏</figcaption>
      </router-link>
    </nav>
  </div>
</template>

<script>
import "@/assets/style/reset.css";
import urls from "@/utils/serverApi";
export default {
  name: "",
  mounted() {
    this.getBanner();
  },
  data() {
    return {
      bannerList: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    //获取轮播图案例
    getBanner() {
      this.$axios({
        url: urls.bannerList
      }).then(res => {
        // console.log(res);
        if (res.code == 0) {
          this.bannerList = res.data;
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
#swiper {
  width: 100%;
  position: relative;
  margin-bottom: 0.3rem;
  nav {
    width: 100%;
    height: 2rem;
    position: absolute;
    bottom: 0px;
    background-color: #fff;
    border-top-left-radius: 20%;
    border-top-right-radius: 20%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    figcaption {
      margin-top: 0.15rem;
      font-size: 0.35rem;
    }
  }
}
</style>
