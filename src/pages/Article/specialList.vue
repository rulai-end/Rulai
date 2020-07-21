<template>
  <div>
    <!-- 头部信息 -->
    <van-nav-bar title="严选专栏" @click-left="goBack" fixed>
      <template #left>
        <van-icon name="arrow-left" color="#505050" size="20" />
      </template>
    </van-nav-bar>
    <!-- 文章列表信息 -->
    <div class="article">
      <div class="article-item" v-for="(item,index) in articleList" :key="index">
        <img :src="item.pic" />
        <p v-html="item.title"></p>
        <p v-html="item.descript"></p>
        <p>
          <van-button color="none" round size="small" :to="'/shop/special/'+item.id">查看详情</van-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/style/reset.css";
export default {
  name: "",
  mounted() {
    this.getArticle();
  },
  data() {
    return {
      articleList: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getArticle(){
      this.$axios({
        url: "https://api.it120.cc/small4/cms/news/list",
        params: {
          noToken: true,
          page: 1
        }
      }).then(res=>{
        console.log(res);
        this.articleList = res.data;
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.article{
  margin-top: .88rem;
  width: 100%;
  padding: 0px .1rem;
  box-sizing: border-box;
  .article-item{
    width: 100%;
    margin-bottom: .2rem;
    position: relative;
    img{
      width: 100%;
      height: 3.4rem;
    }
    p{
      position: absolute;
      line-height: .4rem;
      z-index: 10;
      width: 80%;
      left: 10%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #F0F0F0;
    }
    p:nth-of-type(1){
      top: .7rem;
      font-size: .38rem;
      
      text-align: center;
    }
    p:nth-of-type(2){
      top: 1.4rem;
      font-size: .3rem;
    }
    p:nth-of-type(3){
      display: flex;
      justify-content: center;
      top: 2.2rem;
    }
  }
}
</style>
