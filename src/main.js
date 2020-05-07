import Vue from 'vue'
/* import App from './App.vue' */
import App from '@/App.vue'//没有任何提示,在没有配置之前
import router from './router';
//在全局引入组件
import TypeNav from './components/TypeNav'
import store from './store'
//typenav注册全局组件
Vue.component('TypeNav',TypeNav);
Vue.config.productionTip = false//去掉不是生产环境的模式

new Vue({
  render: h => h(App),//将组件的元素,渲染到页面上
  router,//配置路由器
  store
}).$mount('#app')

