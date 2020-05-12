<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(item, index) in skuImageList"
        :key="item.id"
      >
        <img
          :src="item.imgUrl"
          :class="{ active: currentIndex === index }"
          @click="changeCurrent(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { mapGetters } from "vuex";
export default {
  name: "ImageList",
  data() {
    return {
      currentIndex: 0, //初始值当前选中图片的下标
    };
  },
  computed: {
    ...mapGetters(['skuImageList']),
  },
  watch: {
    skuImageList: {
      handler(value) {
        if (value.length === 0) return;
        //在列表显示之后创建对象
        this.$nextTick(() => {
          new Swiper(this.$refs.swiper, {
            navigation: {
              //有前后的按钮
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            //一次显示多少页
            slidesPerView: 5,
            //翻页一次 是5页为一组
            slidesPerGroup: 5,
          });
        });
      },
       immediate: true,
    },
   
  },
  methods: {
    changeCurrent(index) {
      if (this.currentIndex !== index) {
        //更新图片下标
        this.currentIndex = index;
        //分发事件
        this.$emit("currentChange", index);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
