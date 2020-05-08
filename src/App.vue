<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- 1种方式 -->
    <!-- <Footer v-show="true"></Footer> -->
    <!-- 2种方式 -->
    <!-- 当不是注册和登录的时候才会显示 -->
    <!-- <Footer v-show="$route.path!=='/register'&& $route.path!=='/login' "></Footer> -->
     <!-- 3种方式 !的时候才会显示啊 -->
<Footer v-show="!$route.meta.isHideFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
import TypeNav from './components/TypeNav';
import {reqBaseCategoryList,reqLogin} from './api'
export default {
name:'App',
async mounted () {
/*   const result = await reqBaseCategoryList();
  console.log('result',result);
  const result2 = await reqLogin('13700000000','111111');
  console.log('result2',result2); */
// 测试调用mock接口对应的接口请求函数
    const result = await reqFloors()
    console.log('mock result ', result)
  //测试异步action获取异步的获取数据vuex的state  使用dispatch去触发actions
  this.$store.dispatch('getBaseCategoryList')
 // console.log(this.$store.state)
  
},
components: {
  Header,
  Footer,
  TypeNav
}
}
</script>

<style>

</style>