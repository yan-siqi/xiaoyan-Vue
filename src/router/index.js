import Vue from "vue";
import VueRouter from "vue-router";
import routes from './routes'

//声明使用vue插件
Vue.use(VueRouter);
//暴露一个路由器对象
export default new VueRouter({
  //处理#
  mode:'history',//不带#
  /* 配置所有路由--->使用数组 */
  routes
});
