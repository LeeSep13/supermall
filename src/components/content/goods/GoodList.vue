<template>
  <div class="goods">
    <good-list-item v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
import GoodListItem from "@/components/content/goods/GoodListItem";

export default {
  name: "GoodList",
  components:{
    GoodListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return[]
      }
    }
  }
}
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 3px;
  }

</style>