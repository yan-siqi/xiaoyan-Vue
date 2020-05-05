<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="search"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      /* 默认值 */
      keyword: "atguigu",
    };
  },
  methods: {
    search() {
      /* 字符串的形式 */
      //编程式路由导航跳转 使用params传递参数 使用v-model收集数据 -->同样是使用模板字符串
      //this.$router.push(`/search/${this.keyword}`)
      //传递query参数
      /* console.log(this.keyword); */
      /* 注意方法的大小写方式 --->this.keyword.toUpperCase() */
      /*  this.$router.push(
        `/search/${this.keyword}?keyword2=${this.keyword.toUpperCase()}`
      ); */
      /* 使用对象的方式 */
      const keyword = this.keyword;
      /* if (keyword === "") {
        this.$router.push('/search');
      }
      else{
        this.$router.push(`/search/${keyword}?keyword2=${this.keyword2.toUpperCase()}`);
      } */
      /* 对象写法1 */
      /*       if (keyword === "") {
        this.$router.push({
          name: "search",
        });
      } else {
        this.$router.push({
          name: "search",
          params: {
            //如果是空串就传递undefined,不是就传递当前值
             //keyword:this.keyword 
            keyword: keyword,
          },
          query: {
            keyword2: keyword.toUpperCase(),
          },
        });
      } */
      /* 对象写法2 */
 /*      this.$router.push({
        name: "search",
        params: {
          //如果是空串就传递undefined,不是就传递当前值
          //keyword:this.keyword
          keyword: keyword===''?undefined:keyword,
        },
        query: {
          keyword2: keyword.toUpperCase(),
        },
      }); */
       /* 
        问题: 编程式路由跳转到当前路由(参数不变), 会抛出NavigationDuplicated的警告错误
        router.push(location, onComplete?, onAbort?): 如果直接指定了回调函数, push方法没有返回值
        router.push(location).then(onComplete).catch(onAbort)
            如果没有直接指定回调函数, push方法返回值为promise
            如果指定的是当前路由路径且参数数据不变化, push内部就会抛出一个失败的promise
        */
       /* this.$router.push({
        name: "search",
        params: {
          //如果是空串就传递undefined,不是就传递当前值
          //keyword:this.keyword
          keyword: keyword===''?undefined:keyword,
        },
        query: {
          keyword2: keyword.toUpperCase(),
        },
      },()=>{}); //指定成功的额回调函数,hi返回一个成功的promise*/
/*       this.$router.push({
        name: "search",
        params: {
          //如果是空串就传递undefined,不是就传递当前值
          //keyword:this.keyword
          keyword: keyword===''?undefined:keyword,
        },
        query: {
          keyword2: keyword.toUpperCase(),
        },
      },undefined,()=>{});//如果是有返回值的话,成功的promise返回值就是undefined */
    this.$router.push({
        name: "search",
        params: {
          //如果是空串就传递undefined,不是就传递当前值
          //keyword:this.keyword
          keyword: keyword===''?undefined:keyword,
        },
        query: {
          keyword2: keyword.toUpperCase(),
        },
      }).catch(()=>{});//如果抛出错误的话,使用catch接收
    },
  },


};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
