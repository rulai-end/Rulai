<template>
  <div>
       <van-nav-bar title="确认付款" left-arrow @click-left="gotoOrder"/>

       <div class="orderInfo">
           <div class="l">
               <van-icon name="balance-o" size="25" color="#f8662f"/>
           </div>
           <div class="r">
               <p><label>商品总额:</label> <span>¥ {{orderInfo.amount}}</span></p>
               <p><label>订单号:</label> <span>{{orderInfo.orderNumber}}</span></p>
           </div>
       </div>
       <div class="orderInfo">
           <div class="l">
               <van-icon name="location-o" size="25" color="#0088dd"/>
           </div>
           <div class="r">
               <p>{{addressInfo.linkMan}}  {{addressInfo.mobile}}</p>
               <p>{{addressInfo.address}}</p>
           </div>
       </div>
       <van-submit-bar :price="orderInfo.amount*100" label="订单总金额：" @submit="payConfirm" button-text="确认支付"/>
  </div>
</template>

<script>
export default {
  name: '',
  mounted() {
      this.getDefaultAddress();
      this.orderInfo = this.$route.params;
  },
  data() {
    return {
        addressInfo:[],
        orderInfo:[],
    };
  },
  computed:{
  },
  watch:{
  },
  methods: {
      getDefaultAddress(){
          this.$axios({
              url:"https://api.it120.cc/small4/user/shipping-address/default"
          }).then(res=>{
              this.addressInfo = res.data;
          })
      },
      gotoOrder(){
          this.$router.push("/shop/order/confirm");
      },
      payConfirm(){
          this.$toast.success("支付成功");
          this.$router.push("/");
      }
  },
};
</script>

<style lang="scss" scoped>
    .orderInfo{
        width: 100%;
        display: flex;
        align-items: center;
        border-bottom: #dddddd 1px solid;
        .l{
            width:20%;
            text-align: center;
        }
        .r{
            flex:1;
            p{
                line-height: .7rem;
            }
            p:nth-child(1){
                font-size: .3rem;
                span{
                    color: #A00000;
                    font-size: .32rem;
                    padding-left: .3rem;
                }
            }
            p:nth-child(2){
                color: #808080;
                font-size: .25rem;
            }
        }
    }
</style>
