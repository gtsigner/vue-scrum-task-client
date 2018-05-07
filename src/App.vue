<template>
  <div id="app">
    <notifications
      class="notice-box"
      position="top left"
      group="foo"/>
    <nav v-if="isLogin" class="navbar menu-navbar navbar-expand-md navbar-light">
      <!--下拉-->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link"><i class="ion ion-android-menu nav-toggle-teams"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人项目</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <router-link class="navbar-brand" to="/">
        OeyTeam
        <small>为敏捷开发而生</small>
      </router-link>
      <div class="logo">
        <img src="/static/logo.png" alt="">
      </div>
      <ul class="navbar-nav mr-auto"></ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="#">
            <i class="ion ion-help-circled"></i>
          </a>
        </li>
        <li class="nav-item"><span class="split-border border-left"></span></li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            我的
          </a>
        </li>
        <li class="nav-item"><span class="split-border border-left"></span></li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            日程
          </a>
        </li>
        <li class="nav-item"><span class="split-border border-left"></span></li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            通知
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            群聊
          </a>
        </li>
        <li class="nav-item">
          <a href="#">
            <img :src="user.avatar" class="user-head-img" alt="">
          </a>
        </li>
      </ul>
    </nav>
    <div>
      <router-view></router-view>
    </div>
    <div v-if="appLoading" class="full-loading">
      <i class="el-icon-loading"></i>
      <h4><span></span>Dashboard is loading ...</h4>
    </div>
  </div>
</template>

<script>
  //导入全局样式表

  import Loading from './components/Loading'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {}
    },
    computed: {
      appLoading() {
        return this.$store.state.appLoading;
      },
      isLogin() {
        return this.$store.state.loginStatus;
      },
      project() {

      },
      user() {
        return this.$store.state.user;
      }
    },
    components: {
      Loading
    },
    methods: {},
    async mounted() {
      //初始话信息
      await this.$store.dispatch('loadLoginUser');
      setTimeout(() => {
        this.$store.commit('CHANGE_APP_LOADING', false);
      }, 0);
      //这里去给用户授权
      this.$socket.emit('auth.login', {
        action: '',
        payload: {accessToken: this.$store.state.accessToken}
      });
    }
  }
</script>

<style lang="scss">
  .logo {
    align-self: center !important;
    position: absolute;
    left: 40%;
    right: 40%;
    width: 20%;
    text-align: center;
    img {
      height: 30px;
    }
  }

  .nav-toggle-teams {
    color: $color-gary;
    margin: 0 10px;
    font-size: 30px;
    line-height: 30px;
  }

  .notice-box {
    margin-top: 25px;
    margin-left: 25px;
  }

  .menu-navbar {
    position: relative;
    z-index: 100;
    height: 58px;
    background-color: hsla(0, 0%, 100%, .95);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .15);
    padding: 4px 10px;
    .user-head-img {
      border-radius: 50%;
      //border: 1px solid #dddddd;
      display: inline-block;
      height: 40px;
      margin-top: 5px;
      margin-left: 10px;
      width: 40px;
    }
    .nav-item {
      .split-border {
        vertical-align: middle;
        line-height: 30px;
        height: 30px;
        display: block;
        margin-top: 10px;
      }
      .nav-link {
        line-height: 50px;
        margin: 0;
        padding: 0 10px;
        font-size: 15px;
        .ion {
          font-size: 24px;
          line-height: 50px;
        }
      }
    }
  }

  .ion-md {
    font-weight: normal;
    font-size: 28px;
    width: 30px;
    text-align: center;
    vertical-align: middle;
    line-height: 30px;
    height: 30px;
    padding: 0;
    cursor: pointer;
  }

  .ion-lg {
    font-size: 25px;
  }

  .full-loading {
    position: fixed;
    text-align: center;
    height: 100%;
    width: 100%;
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    z-index: 1001;
    padding-top: 10%;
    .load-view {
      position: relative;
      margin: 0 auto;
    }
  }

  .el-icon-loading {
    font-size: 50px;
    margin: 10px;
    color: $color-primary;
  }
</style>
