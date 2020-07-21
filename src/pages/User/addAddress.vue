<template>
  <div>
    <van-address-edit :area-list="areaList" show-postal show-delete show-set-default @save="onSave" />
  </div>
</template>

<script>
import areaList from "@/utils/area.js";
import storage from "@/utils/storage";
export default {
  name: "",
  data() {
    return {
      areaList: areaList
    };
  },
  computed: {},
  watch: {},
  methods: {
      onSave(data){
          console.log(data);
          this.$axios({
              url:"https://api.it120.cc/small4/user/shipping-address/add",
              params:{
                  address: data.addressDetail,
                  code: data.areaCode,
                  cityId: data.city,
                  linkMan: data.name,
                  mobile: data.tel,
                  provinceId: data.province,
                  isDefault: data.isDefault,
              }
          }).then(res=>{
              console.log(res);
              if(res.code == 0){
                  this.$toast.success("地址添加成功");
                  this.$router.go(-1);
              }else{
                  this.$toast.fail("添加失败了");
                  return false;
              }
          })
      }
  }
};
</script>

<style scoped>
</style>
