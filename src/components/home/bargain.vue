<template>
  <!-- 全民砍价 -->
  <div id="product">
    <router-link tag="p" class="product-head" to="/shop/cut/list">
      全民砍价
      <van-icon name="arrow" size="20" />
    </router-link>
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
</template>

<script>
import "@/assets/style/reset.css";
import urls from "@/utils/serverApi";
export default {
  name: "",
  mounted() {
      this.getCut();
  },
  data() {
    return {
      cutList: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    //全民砍价商品
    getCut() {
      this.$axios({
        url: urls.cutList
      }).then(res => {
        let keys = Object.keys(res.data.goodsMap).splice(-3);
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
#product{
    background-color: #FFF;
    margin-bottom: .2rem;
    .product-head{
      line-height: .8rem;
      font-size: .35rem;
      
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .product-item{
      width: 100%;
      border-top: #dddddd 1px solid;
      display: flex;
      padding: .2rem;
      box-sizing: border-box;
      .item-left{
          width: 30%;
        img{
          width: 100%;
        //   height: 2.4rem;
          border-radius: .1rem;
        }
      }
      .item-right{
        width: 70%;
        margin-left: .2rem;
        p:nth-child(1){
          font-size: .35rem;
          margin-bottom: .2rem;
        }
        p:nth-child(2){
          color: #808080;
          font-size: .2rem;
        }
        ol{
          width: 100%;
          display: flex;
          margin-top: .8rem;
          justify-content: space-between;
          li{
            float: left;
            width: 40%;
            text-indent: .15rem;
            p:nth-child(1),p:nth-child(2){
              font-size: .3rem;
            }
          }
          li:nth-child(1){
            p:nth-child(1){
              color: #DD0000;
              font-size: bold;
            }
          }
          li:nth-child(2),li:nth-child(3){
            color: #B0B0B0;
            font-size: .3rem;
          }
        }
      }
    }
}
</style>
