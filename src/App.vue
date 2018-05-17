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
        <el-dropdown-menu class="drop-down-projects" slot="dropdown">
          <p class="title">我的项目</p>
          <el-dropdown-item v-for="p in projects" :key="p._id">
            <span>{{p.title}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <router-link class="navbar-brand" to="/">
        <small style="line-height: 30px;font-size:16px;">OeyTeam 为敏捷开发而生</small>
      </router-link>
      <div class="logo">
        <router-link to="/"><img src="/static/logo.png" alt=""></router-link>
      </div>
      <ul class="navbar-nav mr-auto"></ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a target="_blank" href="https://github.com/zhaojunlike" class="nav-link">
            Github
          </a>
        </li>
        <li class="nav-item">
          <a target="_blank" href="https://blog.oeynet.com" class="nav-link">
            博客
          </a>
        </li>
        <li class="nav-item">
          <router-link :to="{path:'/'}" class="nav-link">
            团队
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'user-my-info'}" class="nav-link">
            我的
          </router-link>
        </li>
        <li class="nav-item">
          <el-dropdown trigger="click">
            <div class="el-dropdown-link">
              <img :src="user.avatar" class="user-head-img" alt="">
            </div>
            <el-dropdown-menu class="drop-down-user" slot="dropdown">
              <p class="title">我的团队</p>
              <el-dropdown-item
                @click.native="team.show = true">
                <span>创建我的团队</span>
              </el-dropdown-item>
              <el-dropdown-item v-for="p in teams" :key="p._id">
                <router-link :to="{path:`/team/${p._id}`}">{{p.team.name}}</router-link>
              </el-dropdown-item>
              <el-dropdown-item
                @click.native="logout"
                class="footer-end" divided>
                <span>注销登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
    <!--创建团队碳层-->
    <el-dialog
      title="创建团队"
      :visible.sync="team.show"
      width="20%">
      <div>
        <div class="header text-center">
          <p>
            <img style="height: 100px;"
                 src="https://dn-st.teambition.net/teambition/images/illustration@3x.2d8d2cc3.png" alt="">
          </p>
          <small class="mt-2 color-gary">创建团队，解锁团队独有功能</small>
        </div>
        <el-form :inline="true" :model="team" class="mt-3">
          <el-input v-model="team.name" placeholder="团队名称"></el-input>
          <el-select style="width: 100%" class="mt-3" v-model="team.region" placeholder="选择团队规模">
            <el-option label="1-10人" value="1-10人"></el-option>
            <el-option label="10-50人" value="10-50人"></el-option>
            <el-option label="50-100人" value="50-100人"></el-option>
            <el-option label="100-1000人" value="100-1000人"></el-option>
          </el-select>
        </el-form>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="team.show = false">取 消</el-button>
        <el-button type="primary" @click="createTeam">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  //导入全局样式表

  import Loading from './components/Loading'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        //团队规模
        team: {
          name: '',
          region: '',
          show: false
        }
      }
    },
    computed: {
      projects() {
        return this.$store.state.projects;
      },
      appLoading() {
        return this.$store.state.appLoading;
      },
      isLogin() {
        return this.$store.state.loginStatus;
      },
      project() {

      },
      teams() {
        return this.$store.state.teams;
      },
      user() {
        return this.$store.state.user;
      }
    },
    components: {
      Loading
    },
    methods: {
      async createTeam() {

        let team = {
          name: this.team.name,
          region: this.team.region
        };
        let res = await this.$api.instance().post('team', team);
        if (res.code === this.$api.ResCodes.FAIL) {
          this.$message.error(res.message);
        } else {

        }
        this.team.show = false;
      },
      async logout() {
        this.$router.replace({name: 'Login'});
        this.$store.dispatch('logout');
      }
    },
    async mounted() {
      //初始话信息
      await this.$store.dispatch('loadLoginUser');
      this.$store.dispatch('loadAllProjects');
      this.$store.dispatch('loadAllTeams');
      this.$store.commit('CHANGE_APP_LOADING', false);
      //这里去给用户授权
      this.$socket.emit('auth.login', {
        action: '', payload: {accessToken: this.$store.state.accessToken}
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

  .drop-down-projects, .drop-down-user {
    min-height: 300px;
    width: 200px;
    .title {
      font-size: 14px;
      text-align: left;
      padding-left: 20px;
      line-height: 40px;
      border-bottom: 1px solid $grey-200;
      color: $grey-800;
      margin: 0;
    }
  }

  .drop-down-user {
    width: 250px;
    .footer-end {
      margin-top: 200px;
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
