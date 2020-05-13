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
import {getUserTempId} from '@/utils'
export default  {
  state: {
    userInfo: {},
    userTempId:getUserTempId()//用户临时Id,只执行一次
  },
  mutations: {},
  actions: {},
  getters: {},
}