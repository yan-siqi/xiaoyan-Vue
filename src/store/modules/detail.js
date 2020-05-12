/* 管理商品详情的vuex模块 */
import {reqProduct} from "@/api"
const state={
    detailInfo:{}
}
const mutations={
    RECEIVE_DETAIL_INFO(state,detailInfo){
        state.detailInfo=detailInfo
    }
}
const actions= {
    /* 获取商品详情的异步action请求 */
    async getDetailInfo({commit},skuId){
        const result=await reqProduct(skuId);
        if(result.code===200){
            const detailInfo=result.data
            commit('RECEIVE_DETAIL_INFO',detailInfo)
        }
    }
}
const getters={
    /* 包含三级分类列表的数据对象 */
    categoryView(state){
        const categoryView=state.detailInfo.categoryView
        return categoryView||{}//保证返回的至少是一个空对象
    },
    /* 商品信息 */
    skuInfo(state){
        const skuInfo=state.detailInfo.skuInfo
        return skuInfo||{}
    },
    /* 图片列表信息 */
    skuImageList(state){
    const skuInfo=state.detailInfo.skuInfo
    return skuInfo?skuInfo.skuImageList:[]
    },

}
export default{
    state,
    mutations,
    actions,
    getters
}