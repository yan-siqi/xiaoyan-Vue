/* 
包含所有接口请求函数的模块
每个函数的返回值都是promise
*/
import ajax from './ajax';
import mockAjax from './mockAjax'

//请求获取三类列表
export function reqBaseCategoryList(){
    return ajax({
        method:'GET',
        url:'/product/getBaseCategoryList'
    });
}
//当在请求登录的时候发送Post请求
export function reqLogin(mobile,password){
return ajax({
    method:'POST',
    url:'/user/passport/login',
    data:{mobile,password}
})
}
export const reqBanners = () => mockAjax('/banners')
export const reqFloors = () => mockAjax('/floors')