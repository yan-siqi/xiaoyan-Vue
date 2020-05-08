/* 管理首页的vuex模块 */
import {reqBaseCategoryList,reqBanners,reqFloors} from "@/api"
//向外部暴露一个对象
export default{
  state:{
    //不可给state赋值,因为他只是指定初始状态的值
    baseCategoryList:[],//是所有分类的数组
    banners:[],//轮播的数组
    floors:[]//楼层的数组
  },
  mutations: {
    //接收保存新的分类列表
    RECEIVE_BASE_CATEGORY_LIST (state, baseCategoryList) {
      state.baseCategoryList = baseCategoryList
    },
    //接收保存新的轮播的数组
    RECEIVE_BANNERS(state,banners){
      state.banners=banners;
    },
    //接收保存新的楼层数组
    RECEIVE_FLOORS(state,floors){
      state.floors=floors;
    },
  },
 actions: {
    /* 获取异步的分类列表的异步action */
    async getBaseCategoryList({commit}){
      //发送异步ajax请求
      const result =await reqBaseCategoryList()
      //成功提交mutatioin 来保存数据
      /* 
       执行过程 如果是成功了,就将baseCategoryList/数据,
       提交给mutations,mutations接收到数据之后,
       将数据赋值给state.baseCategoryList (传递给内部管理的state而不是将数据传递给用来存放初始数据的值)
      */
      if(result.code===200){
        const baseCategoryList=result.data
        commit('RECEIVE_BASE_CATEGORY_LIST',baseCategoryList)
      }
    },
    /* 轮播图的异步action */
    async getBanners({commit}){
     //发送ajax请求,获取数据
     const result=await reqBanners()
     //成功之后,取出数据,提交给mutation
     if(result.code===200){
       const banners =result.data
       commit('RECEIVE_BANNERS',banners)
     }
    },
    /* 楼层的异步action */
    async getFloors({commit}){
      //发送ajax的异步请求,来获取数据
      const result =await reqFloors()
      if(result.code===200){
        const floors=result.data
        commit ('RECEIVE_FLOORS',floors)
      }
    }
  },
  getters: {
    
  }
}