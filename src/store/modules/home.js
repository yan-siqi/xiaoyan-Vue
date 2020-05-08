import {reqBaseCategoryList} from "@/api";
//向外部暴露一个对象
export default{
  state:{
    //不可给state赋值,因为他只是指定初始状态的值
    baseCategoryList:[],
    x:{},
    y:''
  },
  mutations: {
    //保存新的分类列表
    RECEIVE_BASE_CATEGORY_LIST (state, baseCategoryList) {
      state.baseCategoryList = baseCategoryList
    }
  },
  actions: {
    //获取异步的分类列表的异步action
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
    }
  },
  getters: {
    
  }
}