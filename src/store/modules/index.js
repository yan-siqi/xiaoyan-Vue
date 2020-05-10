/* 
包含vuex所有的子模块
 */
//此时取的是默认暴露模块,不然是undefined
import home from './home'
import user from './user'
import search from './search'//定义新的模块需要注册到对象中去

export default {
  home,
  user,
  search
}

/* 
vuex的store管理的总state是什么结构:
  {
    home: {
      baseCategoryList: [],
      x: {},
      y: ''
    },

    user: {
      userInfo: {},
      x: ''
    }
  }
*/