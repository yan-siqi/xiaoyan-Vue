/* 管理搜索模块相关数据的vuex模块 */
import { reqProductList } from "@/api";
const state = {
  //是要收集data中的数据,使用对象
  productList: {}, //搜索得到商品相关的对象
};
const mutations = {
  /* 接收保存的新的列表数据 */
  RECEIVE_PRODUCT_LIST(state, productList) {
    state.productList = productList;
  },
};
const actions = {
  /* 获取商品的异步actions */
  //发送请求,有结果之后提交mutations,解构语法
  async getProductlist({ commit }, searchParams) {
    //获取所有的包含搜索数据的对象
    const result = await reqProductList(searchParams); //调用包含所有参数的对象.需要传递参数
    if (result.code === 200) {
      const productList = result.data;
      //指定mutation的名字,和传递的数据
      commit("RECEIVE_PRODUCT_LIST", productList);
    }
  },
};
const getters = {};
export default { state, mutations, actions, getters };//一定要默认暴露,不然是undefined
