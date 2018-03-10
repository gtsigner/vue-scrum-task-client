<template>
  <div id="app">
    <nav class="navbar menu-navbar navbar-expand-md navbar-light">
      <router-link class="navbar-brand" to="/">OeyTeam</router-link>
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
            <img src="/static/images/head.jpg" class="user-head-img" alt="">
          </a>
        </li>
      </ul>
    </nav>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  //导入全局样式表

  export default {
    data() {
      return {
        isLogin: true,
      }
    },
    components: {}
  }
</script>

<style lang="scss">

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
</style>
