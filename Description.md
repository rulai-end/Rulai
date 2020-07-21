## 项目说明
### 项目安装插件 
- vueX
- axios
- vant-ui
- sass-load,node-sass 
配置信息/build/webpack.base.config.js
```js
    {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
    },

```


### 配置信息

- 配置axios代理
- 配置axios拦截器，请求服务器地址封装
- 配置vueX服务
- 路由分组，
- 设置路由导航守卫
- 封装本地存储localStorage

