<template>
  <div class="box">
    <div class="top-arrow" @click="gotoBack">
      <van-icon name="arrow-left" size="30" />
    </div>
    <!-- 轮播图区域 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item,index) in goods_imgs" :key="index">
        <van-image :src="item.pic" class="img" />
      </van-swipe-item>
    </van-swipe>

    <!-- 商品详情信息 -->
    <div class="goods_info">
      <p>{{goods_info.name}}</p>
      <p>{{goods_info.characteristic}}</p>
      <p>
        <span>低价:¥{{goods_info.minPrice}}&nbsp;&nbsp;&nbsp;原价:¥{{goods_info.originalPrice}}</span>
        <span>库存 {{goods_info.stores}}</span>
      </p>
    </div>

    <!-- 商品简介 -->
    <div class="goods_intro">
      <van-tabs v-model="type">
        <van-tab title="商品介绍" name="3">
          <div class="intro">
            <div v-html="goods_content"></div>
          </div>
        </van-tab>
        <van-tab title="商品评价" name="4">商品评价</van-tab>
      </van-tabs>
    </div>

    <!-- 底部加入购物车操作 -->
    <van-goods-action style="border-top: #dddddd 1px solid;">
      <van-goods-action-icon icon="chat-o" />
      <van-goods-action-icon icon="cart-o" :badge="this.$store.state.cartNums" @click="gotoCart" />
      <van-goods-action-icon icon="star-o" />
      <!-- <van-goods-action-button type="warning" text="立即购买" /> -->
      <van-goods-action-button type="danger" @click="skuShow=true" text="加入购物车" />
    </van-goods-action>

    <!-- 商品的sku的信息 -->
    <van-sku
      v-model="skuShow"
      :goods-id="goods_id"
      :sku="sku"
      :goods="goods"
      @add-cart="addCart"
      :custom-stepper-config="customStepperConfig"
      @sku-selected="selectSku"
    />
  </div>
</template>
<script>
import "@/assets/style/reset.css";
import urls from "@/utils/serverApi";
import storage from "@/utils/storage";
export default {
  name: "",
  mounted() {
    this.goods_id = this.$route.params.id;

    this.getGoodsInfo();

    this.getJsApi();
  },
  data() {
    return {
      goods_id: 0,
      goods_imgs: [],
      goods_info: [],
      type: "",
      goods_content: "",
      skuShow: false,

      //sku相关商品信息
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
        ],
        price: "10.00", // 默认价格（单位元）
        stock_num: 100
      },
      goods: {
        // 默认商品 sku 缩略图
        picture:
          "https://cdn.it120.cc/apifactory/2018/11/06/b35506df736e9c093ffc7b453650057b.jpg"
      },
      goods_num: 1,
      customStepperConfig: {
        // 步进器变化的回调
        handleStepperChange: currentValue => {
          this.goods_num = currentValue;
        }
      },
      propertiesName: "",
      propertyChildIds: "",

      //微信分享
      wxShare: null
    };
  },
  computed: {},
  watch: {},
  methods: {
    //选择sku的时候触发的事件
    selectSku(data) {
      // console.log(data);

      this.propertyChildIds = `${data.selectedSkuComb.id}:${data.skuValue.id}`;
      this.propertiesName = data.skuValue.name;

      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/price",
        params: {
          goodsId: this.goods_id,
          propertyChildIds: this.propertyChildIds
        }
      }).then(res => {
        // console.log(res);
        this.sku.price = res.data.originalPrice;
        this.sku.stock_num = res.data.stores;
      });
    },
    //设置商品的sku属性
    setSku(properties) {
      console.log(properties);
      let trees = [];
      let list = [];
      //sku属性循环
      properties.forEach((item, index) => {
        //设置sku中tree属性
        let obj = new Object();
        obj.k = item.name;
        obj.k_s = `s_${item.id}`;
        obj.v = [];

        //遍历属性规格
        item.childsCurGoods.forEach((it, ind) => {
          obj.v.push({
            id: it.id,
            name: it.name
          });

          // //list对应的sku规格的配置
          // let tmp = new Object();
          // tmp.id = item.id;
          // tmp[obj.k_s] = it.id.toString();
          // tmp.price = this.goods_info.originalPrice * 100;
          // tmp.stock_num = this.goods_info.stores;
          // list.push(tmp);
        });
        //设置tree属性
        trees.push(obj);
      });
      console.log(trees);

      //处理list数据的内容
      if (trees.length > 1) {
        //组装list的数据
        trees.reduce((item1, item2) => {
          //进行两两匹配
          item1.v.forEach(data1 => {
            if (item2) {
              item2.v.forEach(data2 => {
                console.log(data2);
                let tmp = new Object();
                tmp.id = item1.k_s.split("_")[1];
                tmp[item1.k_s] = data1.id;
                tmp[item2.k_s] = data2.id;
                tmp.price = this.goods_info.originalPrice * 100;
                tmp.stock_num = this.goods_info.stores;
                list.push(tmp);
              });
            }
          });
        });
      }else{
        trees.forEach((item)=>{
              item.v.forEach(data=>{
                let tmp = new Object();
                tmp.id = item.k_s.split("_")[1];
                tmp[item.k_s] = data.id;
                tmp.price = this.goods_info.originalPrice * 100;
                tmp.stock_num = this.goods_info.stores;
                list.push(tmp);
              })
        })
      }

      console.log(list);

      this.sku.tree = trees;
      this.sku.list = list;
    },

    //获取商品的信息
    getGoodsInfo() {
      //获取信息
      this.$axios({
        url: urls.goodsDetail,
        params: { id: this.goods_id }
      }).then(res => {
        // console.log(res);
        if (res.code == 0) {
          this.goods_imgs = res.data.pics; //商品的轮播图
          this.goods_info = res.data.basicInfo; //商品基本信息
          this.goods_content = res.data.content; //商品简介

          //商品的sku信息
          this.setSku(res.data.properties); //设置商品的sku信息
          this.sku.price = this.goods_info.originalPrice;
        }
      });
    },

    //跳转到购物车页面的操作
    gotoCart() {
      this.$router.push("/shop/cart");
    },
    // 加入购物车的操作
    addCart() {
      //获取用户登陆的token值
      let token = storage.getStorage("shop_token");
      //token值存在的时候
      if (token != "") {
        //定义一个空对象
        let object = new Object();
        object.id = this.goods_id;
        object.name = this.goods_info.name;
        object.price = this.sku.price;
        object.imageUrl = this.goods_info.pic;
        object.nums = this.goods_num;
        object.properties = this.propertyChildIds;
        object.pName = this.propertiesName;
        object.checked = true;

        //从本地存储中获取数据
        let data = storage.getStorage("shop_cart", true);
        let count = 0;
        //本地数据为空的时候
        if (data == "") {
          let arr = [];
          arr.push(object);
          storage.setStorage("shop_cart", arr, true);
        } else {
          data.forEach((item, index) => {
            if (
              item.id == this.goods_id &&
              item.properties == this.propertyChildIds
            ) {
              count++;
            }
          });
          // 判断是否重复添加
          if (count > 0) {
            data.map((item, index) => {
              if (
                item.id == this.goods_id &&
                item.properties == this.propertyChildIds
              ) {
                item.nums += this.goods_num;
              }
            });
          } else {
            data.push(object);
          }

          storage.setStorage("shop_cart", data, true);
        }
        this.$toast.success("添加成功");
        this.skuShow = false;
        storage.getCartNums();
      } else {
        this.$toast.fail("请先登录");
        this.$router.push("/shop/login");
      }
      // console.log(token);
    },
    gotoBack() {
      this.$router.go(-1);
    },
    //获取微信jsApi信息
    getJsApi() {
      console.log(location);
      this.$axios({
        url: "https://api.happyknowshare.cn/api/wechat/share/index",
        params: {
          url: location.href.split("#")[0]
        }
      }).then(res => {
        console.log(res);
        wx.config({
          debug: false,
          appId: res.data.appId,

          timestamp: res.data.timestamp,

          signature: res.data.signature,

          nonceStr: res.data.nonceStr,

          jsApiList: [
            // 所有要调用的 API 都要加到这个列表中

            "updateTimelineShareData", // 分享到朋友圈接口

            "updateAppMessageShareData"
          ]
        });

        wx.ready(() => {
          //需在用户可能点击分享按钮前就先调用
          wx.updateAppMessageShareData({
            title: this.goods_info.name, // 分享标题
            desc: this.goods_info.characteristic, // 分享描述
            link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: this.goods_imgs[0].pic, // 分享图标
            success: function() {
              // 设置成功
              this.$toast.success("分享成功");
            }
          });
          //分享到朋友圈
          wx.updateTimelineShareData({
            title: this.goods_info.name, // 分享标题
            desc: this.goods_info.characteristic, // 分享描述
            link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: this.goods_imgs[0].pic, // 分享图标
            success: res => {
              this.$toast.success("分享成功");
            }
          });
        });
      });
    },

    sharetoWx() {}
  }
};
</script>

<style lang="scss">
.box {
  background-color: #f0f0f0;
  position: relative;
  .top-arrow {
    position: fixed;
    left: 0.1rem;
    top: 0.1rem;
    padding: 0.2rem;
    background-color: #fafafa;
    z-index: 10;
    border-radius: 50%;
  }
  .img {
    width: 100%;
    height: 8rem;
  }
  .goods_info {
    background-color: #fff;
    width: 100%;
    padding: 3%;
    box-sizing: border-box;
    margin-bottom: 0.3rem;
    p:nth-child(1) {
      line-height: 0.88rem;
      font-size: 0.35rem;
    }
    p:nth-child(2) {
      font-size: 0.25rem;
      color: #b0b0b0;
    }
    p:nth-child(3) {
      display: flex;
      justify-content: space-between;
      line-height: 0.8rem;
    }
  }
  .goods_intro {
    background-color: #fff;
    width: 100%;
    padding: 3%;
    box-sizing: border-box;
    .intro {
      margin-top: 0.5rem;
      width: 100%;
      overflow: hidden;
      ul {
        width: 100% !important;
        p {
          width: 100% !important;
        }
      }
      img {
        width: 100% !important;
      }
    }
  }
}
</style>
