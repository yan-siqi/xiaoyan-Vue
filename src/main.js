import Vue from 'vue'
/* import App from './App.vue' */
import App from '@/App.vue'//没有任何提示,在没有配置之前
import router from './router'
Vue.config.productionTip = false//去掉不是生产环境的模式

new Vue({
  render: h => h(App),//将组件的元素,渲染到页面上
  router//配置路由器
}).$mount('#app')

