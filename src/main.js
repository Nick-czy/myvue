// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import * as filters from './filters'
import CryptoJS from "crypto-js"
import common from './common/common'
//import echarts from 'echarts'
import {  Tabbar, TabItem } from 'mint-ui'
import 'mint-ui/lib/style.css'
import WeVue from 'we-vue'
import 'we-vue/lib/style.css'

import '@/theme-et/index.css'
import '@/assets/scss/element-variables.scss'

Vue.config.productionTip = false;

//注册使用
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

//Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
Vue.prototype.$crypto = CryptoJS

Vue.use(common);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.use(WeVue);



// 添加请求request拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {

    // if (localStorage.getItem('Token')) {
    //   config.headers.Token = localStorage.getItem('Token');
    //   // config.cancelToken = source.token; // 全局添加cancelToken
    // }
    // //请求之前重新拼装url
    // config.url = root + config.url;
    // return config;
  },
  error => {
    return Promise.reject(error);
  });

//添加 response 拦截器
// axios.interceptors.response.use(
//   response => {
//     //判断token失效
//     if (response.data.code != 1 && response.data.code != 0) {
//       // if (response.data.code == -10001) {
//       //   // source.cancel(); // 取消其他正在进行的请求

        
//       // } else {
          
//       // }
//     }
//     router.replace({
//       path: '/phoneIndex',
//     })
//     return response;
//   },
//   error => {
//     if (axios.isCancel(error)) { // 取消请求的情况下，终端Promise调用链
//       return new Promise(() => { });
//     } else {
//       return Promise.reject(error);
//     }
//   });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
