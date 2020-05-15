//引入组件 主页/搜索页面/注册页面/登录页面
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import Center from "@/pages/Center";
import MyOrder from "@/pages/Center/MyOrder";
import GroupBy from "@/pages/Center/GroupBuy";
import store from "@/store";
import router from "@/router";
import PaySuccess from "@/pages/PaySuccess";
export default [
  /* 注意路由路径名小写.路由组件名大写 */
  {
    path: "/",
    component: Home,
  },
  {
    name: "search", //当前路由的e标识名称
    //指定带:的路径,必须指定name属性来标识当前路由
    /* 传递参数 (站位) -->该关键字 ? 标识keyWord可以有也可以没有*/
    path: "/search/:keyword?",
    component: Search,
    /* 将query参数和param参数映射为属性 传入路由组件*/
    props: (route) => ({
      keyword3: route.params.keyword,
      keyword4: route.query.keyword2,
    }),
  },
  {
    path: "/register",
    component: Register,
    /* 
          router的实例对象中包含meta的属性
          ,本质是一个对象 ,可以控制他来显示footer是不是要隐藏
          */
    meta: {
      isHideFooter: true,
    },
  },
  {
    path: "/login",
    component: Login,
    meta: {
      isHideFooter: true,
    },
  },
  /* 详情页面 */
  {
    name: "detail", //当前路由的e标识名称
    //指定带:的路径,必须指定name属性来标识当前路由
    /* 传递参数 (站位) -->该关键字 ? 标识keyWord可以有也可以没有*/
    path: "/detail/:skuId",
    component: Detail,
    /* 将query参数和param参数映射为属性 传入路由组件*/
  },
  /* 添加购物车成功的界面 */
  {
    path: "/addcartsuccess",
    component: AddCartSuccess,
    beforeEnter(to, from, next) {
      //获取当前路由信息对象
      const skuNum = to.query.skuNum;
      //读取保存的数据
      const skuInfo = JSON.parse(window.sessionStorage.getItem("SKU_INFO_KEY"));
      //只有两者都存在才放行

      if (skuInfo && skuNum) {
        next();
      } else {
        next("/");
      }
    },
  },
  /* 购物车界面 */
  {
    path: "/shopcart",
    component: ShopCart,
  },
  /* 交易界面 0515*/
  {
    path: "/trade",
    component: Trade,
    /* 只能从购物车界面,才能够跳转到交易界面 */
    beforeEnter(to, from, next) {
      //如果跳转的界面是是购物车
      if (from.path === "/shopCart") {
        next();
      } else {
        next("/shopCart");
      }
    },
  },
  /* 支付界面 */
  {
    path: "/pay",
    component: Pay,
    beforeEnter(to, from, next) {
      if (from.path === "/trade") {
        next();
      } else {
        next("/trade");
      }
    },
  },
  /* 支付成功界面 */
  {
    path: "/paysuccess",
    component: PaySuccess,
    //只有从支付界面才能跳到支付成功界面
    beforeEnter(to, from, next) {
      //路由前置守卫
      if (from.path === "/pay") {
        //如果当前是支付界面就放行
        //如果当前路径是pay,才有机会支付成功
        next();
      } else {
        //如果当前不是支付界面,就跳转到首页
        next("/pay");
      }
    },
  },
  /*  */
  {
    path: "/center",
    component: Center,
    children: [
      //用户中心的子路由
      {
        path: "myorder",
        component: MyOrder,
      },
      {
        path: "groupbuy",
        component: GroupBy,
      },
      {
        path: "",
        redirect: "myorder",
        //如果当前输入的路径是空串,就重新定位到我的订单界面
      },
    ],
  },
  /* 注册界面 */
  {
    path: "/register",
    component: Register,
    meta: {
      isHideFooter: true,
    },
  },
  /* 登录界面 */
  {
    path: "/login",
    component: Login,
    meta: {
      isHideFooter: true,
    },
  },
];
