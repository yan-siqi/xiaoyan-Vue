/* 管理购物车相关数据模块模块的 */
import {
  reqCartList,
  reqCheckCartItem,
  reqAddToCart,
  reqDeleteCartItem,
} from "@/api";
export default {
  state: {
    cartList: [], //购物商品列表信息
  },
  mutations: {
    RECEIVE_CART_LIST(state, { cartList }) {
      state.cartList = cartList;
    },
  },
  actions: {
    /* 获取购物车列表的异步action */
    async getCartList({ commit }) {
      //获取购物车商品列表的异步请求action
      const result = await reqCartList();
      if (result.code === 200) {
        //如果请求成功的话
        const cartList = result.data;
        commit("RECEIVE_CART_LIST", { cartList }); //提交mutation的是包含数据的对象
      }
    },
    /* 添加商品到购物车的异步action */
    async addToCart3({ commit }, { skuId, skuNum }) {
      const result = await reqAddToCart(skuId, skuNum);
      if (result.code !== 200) {
        throw new Error("添加购物车失败");
      }
    },
    /* 删除商品的异步action */
    async deleteCartItem(context, skuId) {
      const result = await reqDeleteCartItem(skuId);
      if (result.code != 200) {
        throw new Error("删除购物项失败,请重试..");
      }
    },
    /* 删除选中商品的异步action */
    async deleteCheckedCartItems({state,dispatch}){
    const promises=state.cartList.reduce((pre,item)=>{
      if(item.isChecked===1){
        //如果当前商品被选中之后,追加到要删除的列表之后
        pre.push(dispatch('deleteCartItem',item.skuId))
      }
      return pre
    },[])
    return Promise.all(promises)
    },
    /* 异步获取改变购物项的的勾选状态数据 */
    async checkCartItem({}, { skuId, isChecked }) {
      //发送异步请求
      const result = await reqCheckCartItem(skuId, isChecked);
      if (result.code !== 200) {
        throw new Error(result.message || "修改勾选状态成功");
      }
    },
    /* 对所有购物项实现全选或者全不选 */
    async checkAllCartItems({ state, commit, dispatch, getters }, checked) {
      const isChecked = checked ? 1 : 0;
      const promises = [];
      //遍历所有的购物项
      state.cartList.forEach((item) => {
        if (item.isChecked === isChecked) return;
        //针对某个购物项,分发给checkCartItem,让他更新某个购物项的勾选状态
        const promise = dispatch("checkCartItem", {
          skuId: item.skuId,
          isChecked,
        });
        promises.push(promise);
      });
      //通过Promise.all()来实现多个异步操作的promise的管理\
      return Promise.all(promises);
    },
  },
  getters: {
    /* 已经选中的商品的总数量 */
    totalCount(state) {
      let total = 0;
      state.cartList.forEach((item) => {
        const { isChecked, skuNum } = item; //使用对象的解构赋值,收集选中的数量和是否被选中的状态
        //判断
        if (isChecked === 1) {
          total += skuNum; //当前选中的总数量+再次添加的数量
        }
      });
      return total;
    },
    /* 计算已经选中商品的总价格 */
    totalPrice(state) {
      let total = 0;
      state.cartList.forEach((item) => {
        const { isChecked, cartPrice, skuNum } = item; //同样是判断商品是否被选中,商品的价格,选中商品的额数量
        //只有在当前购物选项中才会累加
        if (isChecked === 1) {
          total +=  cartPrice * skuNum; //当前的购物总价是+单价×数量
        }
      });
      return total;
    },
  },
};
