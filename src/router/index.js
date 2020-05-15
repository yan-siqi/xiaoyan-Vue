import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store"

//声明使用vue插件
Vue.use(VueRouter);
/* 
解决2: 修正Vue原型上的push和replace方法 (优秀)
*/
// 缓存原型上的push方法
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;
// 重新指定原型上的push方法
VueRouter.prototype.push = function(location, onComplete, onAbort) {
  console.log("push()", location, onComplete, onAbort);
  // this是路由器对象 $router
  // 如果调用push, 传递了成功或者失败的回调函数
  if (onComplete || onAbort) {
    // 让原来的push方法进行处理
    originPush.call(this, location, onComplete, onAbort); // 不用返回, 因为执行的结果返回是undfined
  } else {
    // 如果调用push, 没传递了成功或者失败的回调函数, 可能会抛出失败的promise, 需要catch一下
    return originPush.call(this, location).catch((error) => {
      console.log("catch error");
      return new Promise(() => {});
    }); // 必须返回产生的promise对象
  }
};

VueRouter.prototype.replace = function(location, onComplete, onAbort) {
  if (onComplete || onAbort) {
    originReplace.call(this, location, onComplete, onAbort);
  } else {
    return originReplace.call(this, location).catch(() => {
      console.log("catch error2");
      return new Promise(() => {});
    });
  }
};
/* 暴露一个路由器对象 */
const router = new VueRouter({
  mode: 'history', // 不带#的模式
  routes, // 配置所有路由
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }  // 在跳转路由时, 滚动条自动滚动到x轴和y轴的起始位置
  }
})
/* 注册全局前置守卫 */
//定义全部需要进行登录检查的路由路径的数组
const checkPaths=['/trade','/pay','/center']
/* 只有登录了,才可以查看交易/支付/个人中心的界面 */
router.beforeEach((to, from, next) => {//在即将跳转之前
  const targetPath=to.path//可能是支付成功/用户中心/我的订单
  //如果当前目标路由是需要检查的
  const isCheckPath=checkPaths.some(path=>targetPath.indexOf(path)===0)
  if(isCheckPath){
    //如果当前路由需要检查,并且登陆成功的话,就放行
    if(store.state.user.userInfo.name){
      next()
    }else{
      next('/login?redirect='+targetPath)//如果没有登陆成功,自动跳转到登录页面
    }
  }else{
    //如果当前路由是不需要进行检查的,就直接放行
    next()
  }
  
})
export default router