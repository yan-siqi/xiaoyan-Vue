import Vue from "vue";
import VueRouter from "vue-router";
//引入组件 主页/搜索页面/注册页面/登录页面
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Login from "@/pages/Login";

//声明使用vue插件
Vue.use(VueRouter);
//暴露一个路由器对象
export default new VueRouter({
  /* 配置所有路由--->使用数组 */
  routes: [
      /* 注意路由路径名小写.路由组件名大写 */
    {
      path: "/",
      component: Home,
    },
    {
        path: "/search",
        component: Search,   
    },
    {
        path: "/register",
        component: Register,   
    },
    {
        path: "/login",
        component: Login,   
    },
  ],
});
