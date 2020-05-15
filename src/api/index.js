/* 
包含所有接口请求函数的模块
每个函数的返回值都是promise
*/
import ajax from "./ajax";
import mockAjax from "./mockAjax";

//请求获取三类列表
export function reqBaseCategoryList() {
  return ajax({
    method: "GET",
    url: "/product/getBaseCategoryList",
  });
}

/* mock接口对应的接口请求函数 */
export const reqBanners = () => mockAjax("/banners");
export const reqFloors = () => mockAjax("/floors");
/*  根据搜索请求函数对象获取商品列表顺序*/
export const reqProductList = (searchParams) =>
  ajax({
    //searchParams只是代表传递到额一个参数
    url: "/list",
    method: "POST",
    data: searchParams,
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
/* 获取指定的id商品信息 :/api/item/{ skuId } */
export const reqProduct = (skuId) => ajax(`/item/${skuId}`);
reqProduct(6);
/* 添加到购物车 : /api/cart/addToCart/{ skuId }/{ skuNum :增加或者减少的数量}*/
export const reqAddToCart = (skuId, skuNumChange) =>
  ajax.post(`/cart/addToCart/${skuId}/${skuNumChange}`);
/* 获取购物车列表 */
export const reqCartList = () => ajax("/cart/cartList");
/* 切换商品的选中状态  skuId代表的是商品的id,isChecked代表商品是被选中还是不选中,代表选中,代表取消选中*/
export const reqCheckCartItem = (skuId, isChecked) =>
  ajax(`/cart/checkCart/${skuId}/${isChecked}`);
/* 删除商品 */
export const reqDeleteCartItem = (skuId) =>
  ajax.delete(`/cart/deleteCart/${skuId}`);
/* 用户登录 */
export function reqLogin(mobile, password) {
  return ajax({
    method: "POST",
    url: "/user/passport/login",
    data: { mobile, password },
  });
}
/* 用户注册 */
export const reqRegister = (userInfo) =>
  ajax.post("/user/passport/register", userInfo)
  /* 用户推出登录 */
  export const reqLogout = () => ajax('/user/passport/logout')
  /* 获取我的订单列表 */
  export const reqMyOrders=(page,limit)=>ajax(`/order/auth/${page}/${limit}`)