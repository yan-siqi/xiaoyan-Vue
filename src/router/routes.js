//引入组件 主页/搜索页面/注册页面/登录页面
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Detail from "@/pages/Detail";
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
  {
    name: "detail", //当前路由的e标识名称
    //指定带:的路径,必须指定name属性来标识当前路由
    /* 传递参数 (站位) -->该关键字 ? 标识keyWord可以有也可以没有*/
    path: "/detail/:id",
    component: Detail,
    /* 将query参数和param参数映射为属性 传入路由组件*/
  },
];
