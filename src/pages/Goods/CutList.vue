<template>
  <div>
    <!-- 头部信息 -->
    <van-nav-bar title="砍价列表" @click-left="goBack" fixed>
      <template #left>
        <van-icon name="arrow-left" color="#505050" size="20"/>
      </template>
    </van-nav-bar>

    <!-- 砍价列表 -->
    <div id="product">
      <div class="product-item" v-for="(item,index) in cutList" :key="index">
        <div class="item-left">
          <img :src="item.pic" />
        </div>
        <div class="item-right">
          <p v-html="item.name"></p>
          <p>{{item.characteristic}}</p>
          <ol>
            <li>
              <p>¥{{item.minPrice}}</p>
              <p>低价</p>
            </li>
            <li>
              <p>¥{{item.originalPrice}}</p>
              <p>原价</p>
            </li>
            <li>
              <p>{{item.stores}}</p>
              <p>限量</p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bargain from "@/components/home/bargain";
import urls from "@/utils/serverApi";
// 砍价列表组件页面
export default {
  name: "",
  mounted() {
    this.getCutList();
  },
  data() {
    return {
      cutList: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getCutList() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/kanjia/list"
      }).then(res => {
        let keys = Object.keys(res.data.goodsMap);
        if (res.code == 0) {
          for (let key of keys) {
            this.cutList.push(res.data.goodsMap[key]);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#product {
  background-color: #fff;
  margin-bottom: 0.2rem;
  margin-top: .88rem;
  .product-head {
    line-height: 0.8rem;
    font-size: 0.35rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .product-item {
    width: 100%;
    border-top: #dddddd 1px solid;
    display: flex;
    padding: 0.2rem;
    box-sizing: border-box;
    .item-left {
      width: 30%;
      img {
        width: 100%;
        //   height: 2.4rem;
        border-radius: 0.1rem;
      }
    }
    .item-right {
      width: 70%;
      margin-left: 0.2rem;
      p:nth-child(1) {
        font-size: 0.35rem;
        margin-bottom: 0.2rem;
      }
      p:nth-child(2) {
        color: #808080;
        font-size: 0.2rem;
      }
      ol {
        width: 100%;
        display: flex;
        margin-top: 0.8rem;
        justify-content: space-between;
        li {
          float: left;
          width: 40%;
          text-indent: 0.15rem;
          p:nth-child(1),
          p:nth-child(2) {
            font-size: 0.3rem;
          }
        }
        li:nth-child(1) {
          p:nth-child(1) {
            color: #dd0000;
            font-size: bold;
          }
        }
        li:nth-child(2),
        li:nth-child(3) {
          color: #b0b0b0;
          font-size: 0.3rem;
        }
      }
    }
  }
}
</style>
