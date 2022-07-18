<template>
    <div class="user-info">
      <div class="user">
        <slot name="user-icon">
          <img class="head-portrait" src="~assets/img/profile/avatar.svg" alt="">
        </slot>
        <div class="login-info">
          <slot name="user-nickname">
            <span class="login">登录/注册</span>
          </slot>
          <div class="phone">
            <span>
              <img src="~assets/img/profile/phone.svg" alt="">
            </span>
            <slot name="user-phone">暂无绑定手机号</slot>
          </div>
        </div>
      </div>
      <img class="arrow-left" src="~assets/img/common/arrow-left.svg" alt="">
    </div>
</template>

<script>
export default {
  name: "UserInfo"
}
</script>

<style scoped>
  .user-info{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: var(--color-tint);
    padding: 15px;
  }
  .user{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .head-portrait{
    width: 80px;
  }
  .login-info{
    display: flex;
    flex-direction: column;
    align-content: space-around;
    padding-left: 10px;
    color: #fff;
  }
  .login-info .login{
    padding-left: 5px;
  }
  .phone{
    font-size: 15px;
    padding-top: 5px;
  }
  .phone span{
    vertical-align: middle;
  }
  .phone span>img{
    width: 25px;
  }
  .arrow-left{
    width: 20px;
  }
</style>