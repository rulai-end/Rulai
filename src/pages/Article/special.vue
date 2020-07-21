<template>
  <div>
    <!-- 头部信息 -->
    <van-nav-bar title="专栏详情" fixed @click-left="goBack()">
      <template #left>
        <van-icon name="arrow-left" color="#505050" size="20" />
      </template>
    </van-nav-bar>

    <div class="detail">
      <p class="header" v-html="articleDetail.title"></p>
      <img :src="articleDetail.pic" />
      <div v-html="articleDetail.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.id = this.$route.params.id;
    this.getArticleInfo();
  },
  data() {
    return {
      id: 0,
      articleDetail: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    getArticleInfo() {
      this.$axios({
        url: "https://api.it120.cc/small4/cms/news/detail",
        params: {
          id: this.id
        }
      }).then(res => {
        console.log(res);
        this.articleDetail = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.detail {
  margin-top: 1rem;
  padding: 0.2rem;
  box-sizing: border-box;
  .header {
    font-size: 0.45rem;
    width: 100%;
    text-align: center;
    line-height: 1.1rem;
    height: 1.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  img {
    width: 100%;
    margin-bottom: 0.3rem;
  }
  div {
    width: 100%;
    width: 100%;
    line-height: 0.6rem;
    text-indent: 0.5rem;
    margin-bottom: 0.3rem;
  }
}
</style>
