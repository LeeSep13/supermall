<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";

import {mapGetters} from "vuex";

export default {
  name: "CartBottomBar",
  components:{
    CheckButton,
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength(){
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
      if(this.cartList.length === 0 ) return false
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods:{
    checkClick(){
      if(this.isSelectAll){  //全部选中
        this.cartList.forEach(item => item.checked = false)
      }else { //部分或全部不选中
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
  }

  .check-content{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
    align-items: center;
  }

  .price{
    margin-left: 20px;
    flex: 1;
    text-align: center;
  }

  .calculate{
    width: 90px;
    background-color: var(--color-high-text);
    color: #ffffff;
    text-align: center;
  }
</style>