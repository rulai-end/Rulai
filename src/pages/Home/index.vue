<template>
  <div class="box">
    <banner />
    <bargain />
    <special />
    <recommand />
  </div>
</template>

<script>
import "@/assets/style/reset.css";
import urls from "@/utils/serverApi";
import banner from "@/components/home/banner";
import bargain from "@/components/home/bargain";
import special from "@/components/home/article";
import recommand from "@/components/home/recommand";
export default {
  name: "",
  mounted() {
  },
  data() {
    return {
      
    };
  },
  components:{
    banner,
    bargain,
    recommand,
    special,
  },
  computed: {},
  watch: {},
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.box {
  background-color: #f8f8f8;
  padding-bottom: 1rem;
}
</style>
