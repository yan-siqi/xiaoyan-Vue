<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="hideCategorys" @mouseenter=" showCategorys">
              <!-- 鼠标移入显示,鼠标移除是隐藏 -->
        <h2 class="all">
          全部商品分类
        </h2>
        <transition name="move">
          <div class="sort" v-show="isShowFirst">
            <div class="all-sort-list2" @click="toSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ item_on: index === currentIndex }"
                @mouseenter="showSubCategorys(index)"
              >
                <h3>
                  <a href="javascript:" :data-categoryName="c1.categoryName " :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a href="javascript:" :data-categoryName="c2.categoryName " :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a href="javascript:" :data-categoryName="c3.categoryName " :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
//使用vuex提供的映射辅助函数
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -2, //如果是- 2的话代表的就是在整个div的外边不在typeNav中
      //如果是-1的话,就代表在div中(一级div)
      //如果是>0的话就在二级div中
      isShowFirst: false, //是否显示一级列表
    };
  },
  computed: {
    /*      categoryList(){
            //return this.$store.state//总状态
            //如果想找home模块的baseCategoryList 可以采用以下方式
            //return this.$store.state.home.baseCategoryList
            //也可以使用vuex内部提供的映射函数mapState 可以传递一个数组或者是对象

         
        } */
    /* 使用数组的方法...mapState(['baseCategoryList'])  <==> this.$store.state.baseCategoryList 是不能取到数据的*/
    //使用对象的形式(一般用来解决多模块问题)并且处理计算属性名和state中的对象属性名不一致的情况
    ...mapState({
      //计算属性的值有vuex内部调用的额函数 state是总的state
      //实际上是 通过对象的方式使属性值变成一个函数,传递的参数就是总状态的state值,以此来直接使用.home....
      categoryList: (state) => state.home.baseCategoryList,
    }),
  },
  //如果想要判断当前页是不是首页,就要看访问的路径是不是'/' <=>home
  //注意要在mounted中去判断
  beforeMount() {
    //执行同步操作来更新数据 在初始显示之前调用
    this.isShowFirst = this.$route.path === "/";
  },
  //异步的获取数据
  //在初始显示之后,调用异步更新数据
  /*   mounted() {
    this.$store.dispatch("getBaseCategoryList");
  }, */
  methods: {
    /* 显示分类列表 */

    showCategorys() {
      this.currentIndex = -1;
      this.isShowFirst = true;
    },
    /* 隐藏分类列表 */
    hideCategorys() {
      this.currentIndex = -2;
      if (this.$route.path !== "/") {
        //如果访问的页面不是首页的话,就隐藏一级列表
        this.isShowFirst = false;
      }
    },
    /* 处理节流 */
    showSubCategorys: throttle(function(index) {
      if (this.currentIndex === -2) return; //判断是不是8已经完全分离出去了
      this.currentIndex = index; // 更新显示子分类的下标
    }, 300),

    
    /* 点击分类项,跳转到搜索界面 */
    toSearch(event) {
      const {
        categoryname,
        category1id,
        category2id,
        category3id,
      } = event.target.dataset
          console.log(1)
      //判断点击的分类项是a标签
      if (categoryname) {
        //首先要声明分类项,准备query参数
        const query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        //跳转到搜索界面,跳转路由对象
        const location = {
          name: "search",
          query,
        };
        //得到当前的params参数
        const { keyword } = this.$route.params;
        //搜索的时候也携带params参数
        if (keyword) {
          location.params = { keyword };
        }
        //然后跳转到相应的路由(search)
        if(this.$route.path.indexOf('/search')===0){
        this.$router.replace(location);
      }
      this.$router.push(location);
        //隐藏一级列表
        this.hideCategorys();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      /* 显示的过渡样式 */
      &.move-enter-active {
        transition: all 0.5s;
      }
      /* 隐藏时的样式 */
      &.move-enter {
        opacity: 0;
        height: 0;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 555px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background: #ccc;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
