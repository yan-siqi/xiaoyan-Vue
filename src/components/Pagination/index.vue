<template>
  <div class="pagination">
    <!-- 当前页码为1时,不能点击上一页 ,如果不是第一页的话,就是当前页面-1-->
    <button
      :disabled="myCurrentPage === 1"
      @click="setCurrentPage(myCurrentPage - 1)"
    >
      上一页
    </button>
    <!-- start要>1才会显示 -->
    <button v-if="startEnd.start > 1" @click="setCurrentPage(1)">1</button>
    <!-- 当前页码>2才会显示 -->
    <button disabled v-if="startEnd.start > 2">···</button>
    <!-- 
      连续页码 
      startEnd.end:显示的是共有多少页
      -->
    <!-- 
      v-for的优先级高于v-if: 先执行v-for的遍历, 每遍历一个再进行v-if的判断  面试题
    -->
    <button
      v-for="num in startEnd.end"
      :key="num"
      v-if="num >= startEnd.start"
      :class="{ active: num === myCurrentPage }"
      @click="setCurrentPage(num)"
    >
      {{ num }}
    </button>
    <!-- 只有在end小于totalPages-1时才会显示... -->
    <button disabled v-if="startEnd.end < totalPages - 1">···</button>
    <!-- 只有在end<totalPages-->
    <button v-if="startEnd.end < totalPages" @click="setCurrentPage(totalPages)">
      {{ totalPages }}
    </button>
    <!-- 当前页码为totalPages时不能操作,但是如果不是的话,就当前页码+1 -->
    <button :disabled="myCurrentPage === totalPages" @click="setCurrentPage(myCurrentPage+1)">下一页</button>

    <button style="margin-left: 30px" disabled>共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    //当前页码
    currentPage: {
      type: Number,
      default: 1,
    },
    //每页的数量
    pageSize: {
      type: Number,
      default: 10,
    },
    //total总的商品数量
    total: {
      type: Number,
      default: 0,
    },
    //连续的页码数量
    showPageNo: {
      type: Number,
      default: 5, //是奇数,保证当前的页数前后数量是一致的
    },
  },
  data() {
    return {
      //将外部传入的当前页码作为当前组件的当前页码的初始值
      myCurrentPage: this.currentPage,
    };
  },
  computed: {
    //总页数 totalPages 依赖的是total和pageSize
    //比如总数是38 一页是6张,总共需要7页
    //使用数学的方式 ;Math.ceil(total/pageSize)
    totalPages() {
      const { total, pageSize } = this;
      return Math.ceil(total / pageSize);
    },
    /* 计算连续页码的start和end */
    //start的最小值是1,end的最大值是totalpages
    startEnd() {
      let start,end
      //取出依赖数据
      const { myCurrentPage, showPageNo, totalPages } = this;
      //计算start
      /* 
        mycurrentpages:我当前的页码数 4
        showPageNo:展示的页数 5
        totalPages:全部的页数 8
        当前显示 2  3  [4] 5 6
        */
      start = myCurrentPage - Math.floor(showPageNo / 2); //4-2=2
      //但是还可能是小值
      /* 
        mycurrentpages:我当前的页码数 2
        showPageNo:展示的页数 5
        totalPages:全部的页数 8
        当前显示 1 [2]  3  4  5
        */
      //如果按照上边的值 就会减成负数
      if (start < 1) {
        start = 1;
      }
      end=start+showPageNo-1;
      /* 计算end */
      if (end > totalPages) {
        end = totalPages;
        //此时需要根据连续的页码来修正start
        start = end - showPageNo + 1; //4 5 [6] 7 8
        /* 
        mycurrentpages:我当前的页码数 3
        showPageNo:展示的页数 5
        totalPages:全部的页数 4
        根据上边算法start=4-5+1=0(错误) end =4 ==>01234
        */
        //此时如果start<1,将start修正为1
        if (start < 1) {
          start = 1;
        }
      }
      //将开始start和end返回
      return { start, end };
    },
  },
  watch: {
    /* 当父组件改变了对应的当前页码,此会回调函数自动调用 */
    currentPage(value) {
      /* 更新内部的当前页码 */
      this.myCurrentPage = value;
    },
  },
  methods: {
    /* 设置当前新的页码 */
    setCurrentPage(currentPage) {
      //注意是更新自己data中的当前页码,而不是接收currentPage属性的值
      this.myCurrentPage = currentPage;
      //分发事件,通知父组件当前的页码发生变化
      this.$emit("currentChage", currentPage);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
