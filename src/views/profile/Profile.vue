<template>
   <div id="profile">
     <nav-bar class="profile-nav"><div slot="center">Lee商城</div></nav-bar>
     <user-info/>
     <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>
     <list-view :list-data="orderList" class="order-list"/>
     <list-view :list-data="serviceList" class="service-list"/>
   </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import UserInfo from "@/views/profile/childComps/UserInfo";
import ListView from "@/views/profile/childComps/ListView";
export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo,
    ListView,
  },
  data(){
    return{
      orderList:[
        {iconPath:'message',info:'我的消息'},
        {iconPath:'pointer',info:'积分商城'},
        {iconPath:'vip',info:'会员卡'},
      ],
      serviceList:[
        {iconPath:'cart',info:'我的购物车'},
        {iconPath:'shopping',info:'下载购物APP'},
      ],
    }
  },

}
</script>

<style scoped>
#profile {
  background-color: #f2f2f2;
}
.profile-nav{
  background-color: var(--color-tint);
  color: #ffffff;
}
.account{
  display: flex;
}
.account-item{
  width: 100%;
  text-align: center;
  margin-right: 1px;
  padding: 18px;
  font-size: 15px;
  background-color: #fff;
}
.account-item .balance {
  font-size: 30px;
  font-weight: 700;
  color: #ff5f3e;
}
.account-info {
  margin-top: 6px;
}
.order-list, .service-list {
  margin-top: 12px;
}
</style>