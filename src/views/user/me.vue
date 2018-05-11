<template>
  <div class="user-me">
    <div class="container thin-scroll content-wrapper">
      <div class="row">
        <div class="col-4">
          <div class="user-menu">
            <div class="user-header">
              <img :src="user.avatar" class="avatar" alt="">
              <div>
                <p class="username">{{user.username}}</p>
                <p class="email">{{user.email}}</p>
              </div>
            </div>
          </div>
          <div class="user-nav">
            <div class="list-group">
              <router-link class="route-item" active-class="active" :to="{name:'user-my-info'}">
                个人信息
              </router-link>
              <router-link class="route-item" active-class="active" :to="{name:'user-my-account'}">
                帐号密码
              </router-link>
              <router-link class="route-item" active-class="active" :to="{name:'user-my-security'}">安全设置</router-link>
              <router-link class="route-item" active-class="active" :to="{name:'user-my-apps'}">应用管理</router-link>
              <router-link class="route-item" active-class="active" :to="{name:'user-my-email'}">邮件提醒</router-link>
              <router-link class="route-item" active-class="active" :to="{name:'user-my-third'}">第三方帐号</router-link>
              <router-link class="route-item" active-class="active" :to="{name:'user-my-payment'}">账户状态</router-link>
            </div>
          </div>
        </div>
        <div class="col-8">
          <div class="content-view">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "me",
    computed: {
      user() {
        return this.$store.state.user;
      }
    }
  }
</script>

<style scoped lang="scss">
  .content-wrapper {
    margin-top: 20px;
    .user-menu, .content-view {
      background: #fff;
    }
    .content-view {
      min-height: 450px;
    }
  }

  .user-menu {
    .user-header {
      padding: 15px;
      display: flex;
      .avatar {
        height: 60px;
        width: 60px;
        border-radius: 50%;
      }
      .username {
        line-height: 30px;
        font-size: 25px;
      }
    }
  }

  .user-nav {
    margin-top: 20px;
    background: #fff;
    .route-item {
      display: block;
      padding: 10px 20px;
      font-size: 20px;
      line-height: 30px;
      cursor: pointer;
      color: grey;
      border: none;
      border-radius: 0 !important;
      border-top: 1px solid $grey-300;
      &:first-child {
        border-top: none;
      }
      &:hover, &.active {
        color: #383838;
        font-weight: 600;
      }
    }
  }
</style>
