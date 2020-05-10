<template>
  <!-- <div class="swiper-container" id="swiper"> -->
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in carouselList" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: {
    //声明接收的属性
    carouselList: Array,
    autoplay:{
      type:Boolean,//类型是布尔类型
      default:true//默认是自动轮播
    }
  },
  watch: {
    //监视 carouselList变化的回调函数,banners从undefined变成[...]
    //是默认初始值不调用,等到数据变化之后才会调用
    //vue只要更新了数据界面会自动更新,但过程是异步的,
    //我们只是更新了数据然后同步执行回调函数,此时界面不会更新,列表数据也不会显示,
    //当异步执行回调函数的时候,页面才会更新,数据才会显示
    carouselList: {
      handler(value) {
        //注意banners是通过handler来创建swiper
        console.log("watch  carouselList", value.length);
        if (value.length) {
          //此时有值,就会更新数据,创建延迟swiper
          this.$nextTick(() => {
            //是在数据更新之后,界面显示之前调用(数据更新导致界面更新)
            this.initSwiper();
          });
        }
      },
      immediate: true, //在初始显示之前调用一次
    },
  },
  methods: {
    initSwiper() {
      new Swiper(this.$refs.swiper, {
        loop: true, //事件循环模式
        //autoplay:true,//让其自动轮播
        autoplay:this.autoplay,
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
