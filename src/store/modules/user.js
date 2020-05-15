/* 
用来管理用户数据的vuex模块
*/
/* 得到当前用户的临时Id 有两种方式:从localStorage中直接获取(如果有数据的话),但是如果没就从UUID库中生成*/

/* function getUserTempId(){
  //locallStorage 读取,临时ID\,如果有直接返回
  let userTempId=localStorage.getItem('USER_TEMP_ID_KEY');
  //如果没有,生成
  if(!userTempId){
    userTempId=uuid4();
    localStorage.setItem('USER_TEMP_ID_LEY',userTempId)
  }
} */
import { getUserTempId, saveUserInfo, getUserInfo, removeUserInfo } from "@/utils";
/* 用户登录注册和登出 */
import { reqLogin, reqRegister, reqLogout } from "@/api";
export default {
  state: {
    userInfo: getUserInfo(),//从local中读取保存的用户信息作为初始值
    userTempId: getUserTempId(), //用户临时Id,只执行一次
  },
  mutations: {
    RECEIVE_USER_INFO(state, { userInfo }) {
      state.userInfo = userInfo;
    },
    RESET_USER_INFO(state){
    state.userInfo={}
    }
  },
  actions: {
    /* 注册的异步actions */
    async register(context, userInfo) {
      const result = await reqRegister(userInfo);
      if (result.code !== 200) {
        throw new Error(
          result.data || result.message || "抱歉注册失败,请重新注册"
        );
      }
    },
    /* 登录的异步action */
    async login({ commit }, { mobile, password }) {
      const result = await reqLogin(mobile, password);
      if (result.code === 200) {
        //登录成功,获取用户信息对象
        const userInfo = result.data;
        //将用户信息提交给mutation保存到state中
        commit("RESIVE_USER_INFO", { userInfo });
        //如果想要保准用户数据在下次重新打开浏览器是存在
        //存到locallyStorage中
        saveUserInfo(userInfo);
      } else {
        //如果登录失败了
        throw new Error(
          result.data || result.message || "抱歉用户登录失败哦,请重新登陆"
        );
      }
    },
    /* 退出登录的异步actions */
    async logout({commit}){
      const result=await reqLogOut();
      if(result.code===200){
        //如果退出登录成功,清除vuex中的用户信息
        commit('RESET_USER_INFO');
        //清除localstorage中的用户信息
        removeUserInfo()
      }else{
        alert(result.message||'抱歉,退出登录失败,请重试')
      }
    }
  },
  getters: {},
};
