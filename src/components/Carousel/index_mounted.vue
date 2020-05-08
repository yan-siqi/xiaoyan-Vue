<template>
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
    carouselList: Array,
  },
  mounted() {
    //floors通过此种方式创建了swiper
    if (this.carouselList.length > 0) {
      //判断数据列表已经显示了
      //创建swiper对象
      this.$initSwiper();
    }
  },
  watch: {
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
    },
  },
  methods: {
    initSwiper() {
      new Swiper(this.$refs.swiper, {
        // direction: 'horizontal', // 水平切换, 默认就是这个值

        loop: true, // 循环模式选项

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
