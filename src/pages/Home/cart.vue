<template>
  <div>
    <van-nav-bar title="购物车" left-text="编辑" />
    <van-card :price="item.price" :desc="item.pName" :title="item.name" thumb v-for="(item,index) in cartList" :key="index">
      <template #thumb>
        <van-checkbox class="chk" name="1" v-model="item.checked" />
        <van-image :src="item.imageUrl" />
      </template>
      <template #num>
        <van-stepper v-model="item.nums" @change="changeNum"/>
      </template>
    </van-card>

    <van-submit-bar :price="getTotals" button-text="下单" style="margin-bottom:1rem;" @submit="confirmOrder">
      <van-checkbox v-model="checked" >全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import storage from "@/utils/storage";
export default {
  name: "",
  mounted() {
    this.getCartList();
  },
  data() {
    return {
      value: 1,
      checkboxGroup: [false, true],
      checked: true,
      cartList:[],
      totalPrice:0,
    };
  },
  computed: {
    getTotals(){
      let amounts = 0;
      this.cartList.forEach(item=>{
        if(item.checked == true){
          amounts += item.price * item.nums;
        }
      });
      return amounts*100;
    }
  },
  watch: {
    checked(val){
      this.cartList.map((item)=>{
        item.checked = val;
      })
    },

    cartList:{
      handler(val){
        
      },
      deep: true,
    }
  },
  methods: {
    getCartList(){
       //从本地存储中获取数据
        let data = storage.getStorage("shop_cart", true);

        if(data != ""){
          this.cartList = data;
        }
    },
    confirmOrder(){
      this.$router.push("/shop/order/confirm")
    },
    changeNum(value){
       storage.setStorage("shop_cart",this.cartList,true);
    }
  }
};
</script>

<style scoped>
.van-nav-bar__text {
  color: #a00000 !important;
}
.van-nav-bar {
  border-bottom: #dddddd 1px solid;
}
.van-card{
  padding-left: .8rem;
}
.chk {
  position: absolute;
  z-index: 10;
  top: 30%;
  left: -.6rem;
}
</style>
