<template>
   <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked===1" 
            @change="checkCartItem(item)">
          </li>   
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeItemNum(item, -1)">-</a>
            <!-- 
              在vue和原生DOM中, input输入框
                input事件: 在输入发生改变时实时触发
                change事件: 在失去焦点时才触发
             -->
            <input autocomplete="off" type="text" class="itxt" :value="item.skuNum" 
              @change="changeItemNum(item, $event.target.value*1 - item.skuNum)">
            <a href="javascript:void(0)" class="plus" @click="changeItemNum(item, 1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.cartPrice * item.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- 
        显示: 根据cartList中是否所有item都勾选了, 来决定是true/false  ==> isAllChecked值由cartList计算确定
        当用户主动改变的checkbox勾选状态: 发请求更新所有购物项的勾选状态为对应的值 ==> 需要监视isAllChecked的变化
        -->
        <input class="chooseAll" type="checkbox" v-model="isAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalCount}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "ShopCart",
  computed: {
    ...mapState({
      cartList: (state) => state.shopCart.cartList,
    }),
    /* 计算总价格,总的加入购物车的数量 */
    ...mapGetters(["totalCount", "totalPrice"]),
    /* 判断是否全选的计算属性 */
    isAllChecked: {
      get() {
        //判断是否所有的item的isChecked为1
        return this.cartList.every((item) => item.isChecked === 1);
      },
      async set(value) {
        //监视当前勾选状态的改变
        try {
          const result = await this.$store.dispatch("checkAllCartItems", value);
          // 异步请求操作成功了, 重新获取列表数据
          this.$store.dispatch("getCartList");
        } catch (error) {
          alert(error.message);
        }
      },
    },
  },
  mounted() {
    //在mounted中读取数据
    this.$store.dispatch("getCartList");
  },
  methods: {
    /* 改变购物车中的商品数量 */
    async changeItemNum(item, numChange) {
      try {
        //如果修改后的数量<1,直接结束
        if (item.skuNum + numChange < 1) return;
        //分发异步的action
        await this.$store.dispatch("addToCart3", {
          skuId: item.skuId,
          skuNum: numChange,
        });
        //异步请求操作成功了,重新获取数据显示
        this.$store.dispatch("getCartList");
      } catch (error) {
        alert(error.message);
      }
    },
    /* 改变购物车的勾选状态 */
    async checkCartItem(item) {
      //准备skuId,isChecked
      const skuId = item.skuId;
      const isChecked = item.isChecked === 1 ? 0 : 1;
      try {
        //分发异步的action
        await this.$store.dispatch("checkCartItem", { skuId, isChecked });
        //异步操作成功
        this.$store.dispatch("getCartList");
      } catch (error) {
        //异步操作请求失败
        alert(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 5%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 30%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 15%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 5%;
        }

        .cart-list-con2 {
          width: 30%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 15%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 15%;
        }

        .cart-list-con5 {
          width: 15%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 15%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 15%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
