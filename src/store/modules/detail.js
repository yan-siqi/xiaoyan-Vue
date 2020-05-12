/* 管理商品详情的vuex模块 */
import { reqProduct, reqAddToCart } from "@/api";
const state = {
  detailInfo: {},
};
const mutations = {
  RECEIVE_DETAIL_INFO(state, detailInfo) {
    state.detailInfo = detailInfo;
  },
};
const actions = {
  /* 获取商品详情的异步action请求 */
  async getDetailInfo({ commit }, skuId) {
    const result = await reqProduct(skuId);
    if (result.code === 200) {
      const detailInfo = result.data;
      commit("RECEIVE_DETAIL_INFO", detailInfo);
    }
  },
  /* 添加商品到购物车的异步action */
  /*  async addToCart({commit},{skuId,skuNum,callback}){
        const result=await reqAddToCart(skuId,skuNum)
        if(result.code===200){//成功
            console.log('添加购物车成功');
            callback()//成功不传递信息
        }else{//添加购物车失败
            console.log('添加到购物车失败');
            callback('添加到购物车失败--1')
            

        }
    } */
  /*  async addToCart2({ commit }, { skuId, skuNum }) {
    const result = await reqAddToCart(skuId, skuNum);
    if (result.code === 200) {
      //成功
      console.log("添加购物车成功");
      return "";
    } else {
      //添加购物车失败
      console.log("添加到购物车失败");
      //返回值不是空串
      return "抱歉您添加失败了--2";
    }
  }, */
  async addToCart3({ commit }, { skuId, skuNum }) {
    const result = await reqAddToCart(skuId, skuNum);
    if (result.code == 200) {
      return "";
    } else {
      return "不好意思您添加失败了--3";
    }
  },
};
const getters = {
  /* 包含三级分类列表的数据对象 */
  categoryView(state) {
    const categoryView = state.detailInfo.categoryView;
    return categoryView || {}; //保证返回的至少是一个空对象
  },
  /* 商品信息 */
  skuInfo(state) {
    const skuInfo = state.detailInfo.skuInfo;
    return skuInfo || {};
  },
  /* 图片列表信息 */
  skuImageList(state) {
    const skuInfo = state.detailInfo.skuInfo;
    return skuInfo ? skuInfo.skuImageList : [];
  },
  /* 返回商品的spu销售属性列表 */
  spuSaleAttrList(state) {
    const spuSaleAttrList = state.detailInfo.spuSaleAttrList;
    return spuSaleAttrList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
