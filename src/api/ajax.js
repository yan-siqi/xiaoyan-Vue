/* 
要求:
对axios进行二次封装(axios本身就是对原生ajax(xHR)的封装)   面试必说
    1. 配置通用的基础路径和超时
    2. 显示请求进度条
    3. 成功返回的数据不再是response, 而直接是响应体数据response.data
    4. 统一处理请求错误, 具体请求也可以选择处理或不处理
*/
//引入axios
import axios from "axios";
//引入显示进度条的 js 和css
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";

/* 1.配置通用的基础路径 */
const instance = axios.create({
  //配置baseUrl和请求的超时时间
  baseURL: "/api",
  /*  baseURL:'http://182.92.128.115/api', */
  timeout: 15000,
});
//设置axios 请求拦截器
instance.interceptors.request.use((config) => {
  console.log("设置请求拦截器");
  Nprogress.start();
  /* 每次请求都携带一个userTempId的请求头,数据存在state中 */
  config.headers.userTempId = store.state.user.userTempId;

  /* 每次请求都携带一个token的请求头,数据存放在state中*/
  const token = store.state.user.userInfo.token;
  if (token) {
    config.headers["token"] = token;
  }
  return config;
});
//设置axios响应拦截器
instance.interceptors.response.use(
  (response) => {
    console.log("响应拦截器success回调执行"); //响应成功
    Nprogress.done();
    return response.data;
  },
  (error) => {
    console.log("响应拦截器success回调执行"); //响应失败
    /* 统一处理请求的错误信息 */
    Nprogress.done();
    alert(`请求出错:${error.message || "未知错误"}`);
    return Promise.reject(error);
  }
);

//向外部暴露封装好的instance
export default instance;
