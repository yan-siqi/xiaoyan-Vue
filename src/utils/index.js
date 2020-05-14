/* 包含工具函数的模块 */
import{v4 as uuid4} from 'uuid'
 export function getUserTempId(){
    //locallStorage 读取,临时ID\,如果有直接返回
    let userTempId=localStorage.getItem('USER_TEMP_ID_KEY');
    //如果没有,就通过UUID生成
    if(!userTempId){
      userTempId=uuid4();
      localStorage.setItem('USER_TEMP_ID_KEY',userTempId)
    }
    return userTempId
  }
export function saveUserInfo(userInfo){
  //在local中保存用户信息
  localStorage.setItem('USER_INFO_KEY',JSON.stringify(userInfo))
}
export function getUserInfo(){
  return JSON.parse(localStorage.getItem('USER_INFO_KEY'))||{}//如果有值就解析没有的话给他传一个空对象
}