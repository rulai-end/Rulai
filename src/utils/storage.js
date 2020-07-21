/**
 * 封装本地存储常用的方法对象
 */
import store from "@/store/index";

const storage = {
    //存储数据，检测是否许需要转json字符串格式
    // json判断是否存储复杂的数据类型
    setStorage: function (key, data, json = false) {

        if (json) {
            localStorage.setItem(key, JSON.stringify(data));
        } else {
            localStorage.setItem(key, data);
        }
    },
    //获取数据
    getStorage: function (key, json = false) {
        let data = localStorage.getItem(key);

        if (data == null) {
            return "";
        }
        return json == true ? JSON.parse(data) : data;
    },
    //删除存储的元素
    removeStorage: function (key) {
        //删除操作
        localStorage.removeItem(key);
    },

    getCartNums: function () {
        let carts = this.getStorage("shop_cart", true);
        if (carts == "") {
            store.commit("setCartNums", 0);
        } else {
            let nums = 0;
            carts.forEach((item, index) => {
                nums += item.nums;
            })
            store.commit("setCartNums", nums);
        }
    }
};


export default storage;