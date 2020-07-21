<template>
  <div>
    <van-nav-bar title="用户登陆" left-arrow />
    <div class="login">
      <van-form>
       <p class="login-head">账号登陆</p>
       <van-field placeholder="手机号码" v-model="phone" right-icon="graphic"  class="inp"
       :rules="[{required: true,message: '不能为空'}]"
       />

       <van-field
        v-model="pwd"
        placeholder="密码"
        :type="hidePwd ? 'password' : 'text'"
        :right-icon="hidePwd ? 'closed-eye' : 'eye-o'"
        @click-right-icon="hidePwd= !hidePwd"
        class="inp"
        :rules="[{required:true,message:'不能为空'}]"
      />

       <van-button class="btn" block round type="info" @click="doLogin">立即登陆</van-button>
       <p class="forget-pwd">忘记密码</p>
       <p class="reg"><router-link to="/shop/register">还没有注册？立即注册</router-link></p>
      </van-form>
    </div>

  </div>
</template>

<script>
import "@/assets/style/reset.css";
import '@/assets/style/login.css';
import storage from  '@/utils/storage';
export default {
  name: '',
  data() {
    return {
      hidePwd: true,//显示密码
      pwd: "",
      phone:""
    };
  },
  computed:{
  },
  watch:{
  },
  methods: {
    doLogin(){
      //执行登陆的操作
      this.$axios({
        url:"https://api.it120.cc/small4/user/m/login?deviceId=007&deviceName=monkey",
        params:{
          mobile:this.phone,
          pwd: this.pwd
        }
      }).then(res=>{
        if(res.code>0){
          this.$toast.fail(res.msg);
          return false;
        }
        console.log(res);
        storage.setStorage("shop_token",res.data.token);
        this.$router.go(-1);
      });
    }
  },
};
</script>

<style lang="scss"scoped>
  
</style>
