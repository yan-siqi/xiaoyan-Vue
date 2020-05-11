import Vue from "vue";
import VueRouter from "vue-router";
import routes from './routes'

//声明使用vue插件
Vue.use(VueRouter);
/* 
解决2: 修正Vue原型上的push和replace方法 (优秀)
*/
// 缓存原型上的push方法
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 重新指定原型上的push方法
VueRouter.prototype.push = function (location, onComplete, onAbort) {
  console.log('push()', location, onComplete, onAbort)
  // this是路由器对象 $router
  // 如果调用push, 传递了成功或者失败的回调函数
  if (onComplete || onAbort) {
    // 让原来的push方法进行处理
    originPush.call(this, location, onComplete, onAbort) // 不用返回, 因为执行的结果返回是undfined
  } else { // 如果调用push, 没传递了成功或者失败的回调函数, 可能会抛出失败的promise, 需要catch一下
    return originPush.call(this, location).catch(() => {
      console.log('catch error')
    })   // 必须返回产生的promise对象
  }
}

VueRouter.prototype.replace = function (location, onComplete, onAbort) {
  if (onComplete || onAbort) {
    originReplace.call(this, location, onComplete, onAbort) 
  } else {
    return originReplace.call(this, location).catch(() => {
      console.log('catch error2')
    })   
  }
}
//暴露一个路由器对象
export default new VueRouter({
  //处理#
  mode:'history',//不带#
  /* 配置所有路由--->使用数组 */
  routes,//配置所有路由
  scrollBehavior(to,from,savedPosition){
    //在跳转路由的时候,滚动条自动滚动到x,y轴的起始位置
    return {x:0,y:0}
  }
});
