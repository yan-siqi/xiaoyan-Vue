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