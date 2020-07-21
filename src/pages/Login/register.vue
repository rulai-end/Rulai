<template>
  <div>
    <van-nav-bar title="用户注册" left-arrow />
    <div class="login">
    <van-form>
      <p class="login-head">新用户注册</p>
      <van-field v-model="phone" placeholder="手机号码" right-icon="graphic" class="inp" :rules="[{required:true,message:'不能为空'}]" />
      <!-- 密码 -->
      <van-field
        v-model="pwd"
        placeholder="密码"
        :type="hidePwd ? 'password' : 'text'"
        :right-icon="hidePwd ? 'closed-eye' : 'eye-o'"
        @click-right-icon="hidePwd= !hidePwd"
        class="inp"
        :rules="[{required:true,message:'不能为空'}]"
      />
      <!-- 确认密码 -->
      <van-field
        v-model="confirm_pwd"
        placeholder="确认密码"
        :type="hidePwd1 ? 'password' : 'text'"
        :right-icon="hidePwd1 ? 'closed-eye' : 'eye-o'"
        @click-right-icon="hidePwd1= !hidePwd1"
        class="inp"
      />
      <!-- 用户名 -->
      <van-field v-model="nick" placeholder="用户名" right-icon="user-o" class="inp" :rules="[{required:true,message:'不能为空'}]"/>

      <!-- 图形验证码 -->
      <van-field v-model="picCode" placeholder="图形验证码" class="inp" :rules="[{required:true,message:'不能为空'}]">
        <template #button>
          <van-image :src="imgUrl" @click="changePicCode"/>
        </template>
      </van-field>

      <!-- 选择地址 -->
      <van-field v-model="area" class="inp" placeholder="选择城市" right-icon="location-o" @click="areaShow=true"/>
      <van-popup v-model="areaShow"  position="bottom">
          <van-area
                :area-list="areaList"
                @confirm="selectArea"
                @cancel="areaShow = false"
            />
      </van-popup>
      <!-- 短信验证码 -->
      <van-field v-model="code" class="inp" placeholder="短信验证码" :rules="[{required:true,message:'不能为空'}]">
          <template #button>
              <van-button type="danger" @click="sendCode" :disabled="isDisabled" plain size="small">{{msg}}</van-button>
          </template>
      </van-field>

      <van-button class="btn" block round type="info" @click="reg">立即注册</van-button>
      <p class="reg">
        <router-link to="/shop/login">已有账号？立即登陆</router-link>
      </p>
    </van-form>
    </div>
  </div>
</template>

<script>
import "@/assets/style/reset.css";
import "@/assets/style/login.css";
import AreaList from "@/utils/area";

import urls from "@/utils/serverApi";
import register from "@/validate/checkRegister";
export default {
  name: "",
  mounted() {
      //随机验证码
      this.changePicCode();
  },
  data() {
    return {
      phone: "",//手机号
      hidePwd: true, //显示密码
      hidePwd1: true, //显示密码
      pwd: "", //密码
      confirm_pwd: "", //确认密码
      nick: "",//昵称
      picCode: "",
      picKey:"",
      imgUrl:"", //图形验证码的地址
      //地址选择
      areaShow: false,
      areaList: AreaList,
      area:"",
      //发送短信验证码
      isDisabled:false,
      msg:"发送验证码",
      code:""
    };
  },
  computed: {},
  watch: {},
  methods: {
      // 切换图形验证码
      changePicCode(){
          let time = (new Date()).getTime();
          let randNum = parseInt(Math.random());
          this.picKey = time+randNum;
          console.log(urls.picCodeUrl);
          this.imgUrl = `${urls.picCodeUrl}?key=${this.picKey}`;
      },
    //选择城市地区
    selectArea(val){
        this.areaShow = false;
        this.area = val.map((item,index)=>{
            return item.name;
        }).join(" ");
    },
    //发送短信验证码
    sendCode(){
        if(this.phone.length<=0){
            this.$toast.fail("手机号不能为空");
            return false;
        }
         //this.countSeconds();
        //调用接口
        this.$axios({
            url:urls.sendCodeUrl,
            params: {
                mobile: this.phone,
                picCode: this.picCode,
                key: this.picKey,
            }
        }).then(res=>{
            if(res.code >0){
                this.$toast.fail(res.msg);
                return false;
            }
            this.countSeconds();
        });
    },
    //发送短信倒计时效果
    countSeconds(){
        this.isDisabled=true;
        //倒计时效果
        let timeout = 30;
        let timer = setInterval(()=>{
            
            if(timeout<1){
                this.msg = "发送验证码"
                this.isDisabled = false;
                clearInterval(timer);
                return false
            }
            this.msg = `${timeout} 秒以后再试`;
            timeout--;
        },1000);
    },

    //立即注册
    reg(){
        //检测表单信息
        register.checkSubmit(this);

        //校验用户输入的短信验证码是否正确
        this.$axios({
            url:urls.checkCodeUrl,
            params:{
                mobile:this.phone,
                code: this.code,
            }
        }).then(res=>{
            if(res.code >0){
                this.$toast.fail(res.msg);
                return false;
            }
        })
        //提交用户注册信息
        this.$axios({
            url:urls.userRegister,
            method:"post",
            params:{
                mobile: this.phone,
                pwd: this.pwd,
                code: this.code,
                nick: this.nick,
                pronvince: this.area.split(" ")[0],
                city: this.area.split(" ")[1],
            }
        }).then(res=>{
            if(res.code >0){
                this.$toast.fail(res.msg);
                return false;
            }
            this.$router.push("/shop/login");
        })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
