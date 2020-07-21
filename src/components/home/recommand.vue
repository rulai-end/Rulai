<template>
  <div id="product">
    <p class="product-head">
      人气推荐
      <van-icon name="arrow" size="20" />
    </p>
    <div class="recommand-item">
      <div
        class="item"
        v-for="(item,index) in recommandList"
        :key="index"
        @click="gotoDetail(item.id)"
      >
        <p>
          <img :src="item.pic" />
        </p>
        <div>
          <p v-html="item.name"></p>
          <p>{{item.characteristic}}</p>
          <p>¥{{item.originalPrice}}</p>
          
        </div>
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
    this.getGoods();
  },
  data() {
    return {
      recommandList: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    //获取商品信息
    getGoods() {
      this.$axios({
        url: urls.goodsList
      }).then(res => {
        if (res.code == 0) {
          let arr = [];
          for (var i = 0; i < 6; i++) {
            let index = parseInt(Math.random() * res.data.length);
            if (arr.includes(index)) {
              i--;
              continue;
            }
            this.recommandList.push(res.data[index]);
          }
          console.log(this.recommandList);
        }
      });
    },
    gotoDetail(id) {
      this.$router.push("/shop/recommand/" + id);
    }
  }
};
</script>

<style lang="scss" scoped>
#product {
  background-color: #fff;
  margin-bottom: 0.2rem;
  .product-head {
    line-height: 0.8rem;
    font-size: 0.35rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  //推荐列表
  .recommand-item {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .item {
      width: 46%;
      padding: 2%;
      float: left;
      img {
        width: 3rem;
        height: 3rem;
      }
      div {
        p:nth-child(1) {
          line-height: 0.6rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p:nth-child(2) {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 0.2rem;
          color: #b0b0b0;
        }
        p:nth-child(3) {
          margin-top: 0.1rem;
          color: #dd0000;
          font-weight: bold;
          font-size: 0.3rem;
        }
      }
    }
  }
}
</style>
