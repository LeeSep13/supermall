<template>
  <div class="list" @click="jumpCart">
    <div v-for="(item,index) in listData" :key="index" class="item">
      <span class="icon">
        <img :src="require('@/assets/img/profile/'+item.iconPath+'.svg')" alt="">
      </span>
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props:{
    listData:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  methods:{
    jumpCart(){
      console.log(this.listData[0].info);
      if (this.listData[0].info === '我的购物车'){
        this.$router.push('/cart')
      }
    }
  }
}
</script>

<style scoped>
  .list{
    background-color: #fff;
    font-size: 15px;
    color: #333;
  }
  .list .item{
    height: 55px;
    line-height: 55px;
  }
  .icon{
    float: left;
  }
  .icon img{
    width: 25px;
    height: 25px;
    vertical-align: middle;
    margin-left: 10px;
  }
  .item .info {
    margin-left: 40px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    padding-left: 5px;
    font-size: 18px;
  }
  .item:last-of-type .info {
    border-bottom: none;
  }
</style>