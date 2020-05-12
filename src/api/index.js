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
/* mock接口对应的接口请求函数 */
export const reqBanners = () => mockAjax('/banners')
export const reqFloors = () => mockAjax('/floors')
/*  根据搜索请求函数对象获取商品列表顺序*/
export const reqProductList=(searchParams)=>ajax({
    //searchParams只是代表传递到额一个参数
    url:'/list',
    method:'POST',
    data:searchParams
        //传递到的数据太多,声明一个对象来接收
});
/* export const reqProductList=(searchParams)=>ajax.post('/list',searchParams); */
/* reqProductList({
    "category3Id": "61",
    "categoryName": "手机",
    "keyword": "小米",
    "order": "1:desc",
    "pageNo": 1,
    "pageSize": 10,
    "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
    "trademark": "4:小米"
  }) */
  /* 获取指定的id商品信息 */
  export const reqProduct = (skuId) => ajax(`/item/${skuId}`) 
  reqProduct(6)