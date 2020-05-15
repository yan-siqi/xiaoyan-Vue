import Vue from 'vue'
import 'swiper/css/swiper.min.css'

import App from '@/App.vue'//没有任何提示,在没有配置之前
import router from './router';
//在全局引入组件
import TypeNav from './components/TypeNav'
import Carousel from '@/components/Carousel'
import store from './store'
import Pagination from '@/components/Pagination'
import './mock/mockServer'
import './validate';
//引入所有 的接口请求函数,并封装
import * as API from '@/api'
// 让所有组件对象可以直接看到API对象
Vue.prototype.$API = API
//typenav注册全局组件
Vue.component('TypeNav',TypeNav);
Vue.component('Carousel',Carousel)
Vue.component('Pagination', Pagination)//复用性很高,注册全局组件
Vue.config.productionTip = false//去掉不是生产环境的模式

new Vue({
  beforeCreate () {
    //在事件初始出案件的时候定义事件总线对象
    Vue.prototype.$bus=this
  },
  render: h => h(App),//将组件的元素,渲染到页面上
  router,//配置路由器
  store
}).$mount('#app')

