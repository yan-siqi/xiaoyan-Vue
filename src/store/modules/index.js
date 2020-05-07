/* 
包含vuex所有的子模块
 */

import home from './home'
import user from './user'

export default {
  home,
  user
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