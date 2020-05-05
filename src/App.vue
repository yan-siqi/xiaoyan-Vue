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
import Footer from './components/Footer'
export default {
name:'App',
components: {
  Header,
  Footer
}
}
</script>

<style>

</style>