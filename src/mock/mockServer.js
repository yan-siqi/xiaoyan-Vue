/* 使用moke.js来moke接口 */
import Mock from "mockjs"
import banners from "./banners.json";
import floors from "./floors.json";
/*模拟轮播图接口 */
Mock.mock('/moke/banners',{code:200,data:banners})
/* 模拟返回楼层的接口 */
Mock.mock('/moke/floors',{code:200,data:floors})
/* 注意:当前模块不需向外暴露,只需要被加载运行一次 ,就可以访问moke接口*/