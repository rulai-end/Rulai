<template>
  <div id="article">
    <p class="article-head">
      精选专题
      <van-icon name="arrow" />
    </p>
    <van-swipe :loop="false" :width="320" :show-indicators="false">
      <van-swipe-item v-for="(item,index) in articleList" :key="index">
        <img :src="item.pic" class="art" />
        <p class="article-title" v-html="item.title"></p>
        <p class="desc">{{item.descript}}</p>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import "@/assets/style/reset.css";
export default {
  name: "",
  mounted() {
    this.getNews();
  },
  data() {
    return {
      articleList: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    getNews() {
      this.$axios({
        url: "https://api.it120.cc/small4/cms/news/list",
        params: {
          noToken: true,
          page: 1
        }
      }).then(res => {
        console.log(res);
        this.articleList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#article {
  background-color: #fff;
  margin-bottom: 0.2rem;
  .article-head {
    line-height: 0.8rem;
    font-size: 0.35rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .van-swipe {
    img {
      width: 98%;
      height: 3.5rem;
      border-radius: 0.1rem;
    }
    .van-swipe-item {
      p:nth-child(2) {
        line-height: 0.8rem;
        font-size: 0.3rem;
        font-weight: bold;
        width: 90%;
        overflow: hidden;
        // text-overflow: ellipsis;
        white-space: nowrap;
      }
      p:nth-child(3) {
        color: #808080;
        line-height: 0.8rem;
        width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
