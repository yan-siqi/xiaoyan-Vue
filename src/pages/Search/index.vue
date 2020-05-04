<template>
  <!-- <div>Search</div> -->
  <div>
    <h2>params参数传递:keyword={{$route.params.keyword}}</h2>
    <h2>query参数传递:keyword={{$route.query.keyword2}}</h2>
     <h2>params参数转换成props:keyword={{keyword3}}</h2>
      <h2>query参数转换成props:keyword={{keyword4}}</h2>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props:['keyword3','keyword4']
}
</script>

<style lang="less" scoped>

</style>
