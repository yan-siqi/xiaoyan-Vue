<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <Rank />
    <Like />
    <Floor />
    <Floor />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer/ListContainer";
import TodayRecommend from "./TodayRecommend/TodayRecommend";
import Rank from './Rank/Rank'
import Like from "./Like/Like";
import Floor from "./Floor/Floor";
import Brand from "./Brand/Brand";
export default {
  name: "Home",

  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
};
</script>

<style lang="less" scoped></style>
