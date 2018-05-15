<template>
  <div v-if="finishLoading">
    <div class="row project-nav-warp">
      <div class="col-2">
        <div class="justify-content-end nav-bread">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{project.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="col-8">
        <ul class="nav justify-content-center">
          <li class="nav-item" v-for="menu in menus" :key="menu._id">
            <router-link
              active-class="active"
              class="nav-link"
              v-html="menu.title"
              :to="{name:menu.routeName,params:menu.params}">
            </router-link>
          </li>
          <li class="nav-item"
              v-for="(appItem,index) in applications"
              :key="index">
            <router-link
              active-class="active"
              class="nav-item nav-link"
              v-html="appItem.title"
              :to="{name:appItem.routeName,params:appItem.params}">
            </router-link>
          </li>
        </ul>
      </div>
      <div class="col-2">
        <ul class="nav justify-content-end float-right">
          <li class="nav-item" v-if="project.members">
            <a :class="{'active':showMemberPanel}" @click="showMemberPanel=!showMemberPanel" class="nav-btn" href="#">
              <span class="ion ion-android-person"></span>
              <span class="nav-btn-title">成员 {{project.members.length}}</span>
            </a>
          </li>
          <li class="nav-item">
            <a :class="{'active':showMenuPanel}" @click="showMenuPanel=!showMenuPanel" class="nav-btn" href="#">
              <span class="ion ion-android-menu"></span>
              <span class="nav-btn-title">菜单</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="project-app-view">
      <loading v-if="isLoading"></loading>
      <transition name="fade">
        <keep-alive>
          <router-view v-if="!isLoading"></router-view>
        </keep-alive>
      </transition>
    </div>
    <!--菜单组件-->
    <project-manage-panel
      @action="panelAction"
      v-if="showMenuPanel"
      @close="showMenuPanel=false">
    </project-manage-panel>
    <Panel
      @open-dialog="showMemberDialog = true"
      @update:show="showMemberPanel=$event" :show="showMemberPanel"></Panel>
    <!--Modal组件-->
    <component :is="modal" v-for="(modal,index) in modals" :key="index" @close="closeModal"></component>

    <el-dialog class="new-member-dialog" title="邀请新成员" :visible.sync="showMemberDialog">
      <div class="search-form">
        <div class="form-group">
          <el-input v-model="memberSearch.keywords" type="text" placeholder="请输入用户名或者邮箱查找"></el-input>
        </div>
        <div class="form-results">
          <loading v-if="memberSearch.isLoading"></loading>
          <div class="member-item"
               v-for="(m,i) in memberSearch.members" :key="i">
            <img class="avatar" :src="m.avatar" alt="">
            <div class="content">
              <p class="nickname">{{m.username}}</p>
              <p class="email">{{m.email}}</p>
            </div>
            <div class="right-menu">
              <el-button type="primary" @click="addMember(m)">邀请</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Api from '@/utils/api'
  import Auth from '@/utils/auth'

  import Loading from '@/components/Loading'
  import ProjectManagePanel from '@/components/ProjectManagePanel'
  import Panel from '@/components/Panels/Panel'
  import ProjectSettingModal from '@/components/Modals/ProjectSettingModal'

  export default {
    name: 'Project',
    components: {
      Loading, ProjectManagePanel, ProjectSettingModal, Panel
    },
    computed: {
      project() {
        return this.$store.state.project;
      },
      folder() {
        return this.$store.state.folder;
      }
    },
    watch: {
      ['memberSearch.keywords'](n) {
        this.searchMember(n);
      }
    },
    data() {
      return {
        navs: [],
        finishLoading: false,
        isLoading: true,
        taskList: {title: '任务'},
        taskGroups: [],
        projectId: null,
        menus: [],
        applications: [
          // {title: '需求', routeName: 'ProjectDemand'},
          // {title: '缺陷', routeName: 'ProjectDefect'},
          // {title: '迭代', routeName: 'ProjectIteration'},
          {title: '代码库', routeName: 'project-source-root'},
          {title: '可视化', routeName: 'ProjectAnalytics'},
          {title: '群聊', routeName: 'ProjectGroupChat'},
          {title: '分享', routeName: 'ProjectPosts'},
        ],
        showMenuPanel: false,
        showMemberPanel: false,
        showMemberDialog: false,
        modals: [],
        memberSearch: {
          keywords: '',
          members: [],
          isLoading: false
        }
      }
    },
    methods: {
      /*内部Action*/
      closeModal(modal) {
        console.log('Close', modal);
        this.modals.pop();
      },
      panelAction(modal) {
        //只显示一个Modal
        this.modals = [];
        this.modals.push(modal);
      },
      //初始化项目的applications
      initProjectApplications() {

      },
      async searchMember(keywords) {
        this.memberSearch.isLoading = true;
        let res = await this.$api.instance().get(`user/search?keywords=${keywords}`);
        this.memberSearch.members = [...res];
        this.memberSearch.isLoading = false;
      },
      async addMember(user) {
        let res = this.$api.instance().post(`project/${this.project._id}/addUser`, {
          projectId: this.project._id,
          userId: user._id
        });
        this.$message({
          message: '恭喜你，邀请成功',
          type: 'success'
        });
      },
      async chooseRoom() {
        this.$socket.emit('chat.room', {
          action: 'change.room',
          payload: {
            projectId: this.project._id
          }
        });
      },
      //加载bind applications
      async loadApplications() {
        //文件
        this.applications.push({
          title: '文件', routeName: 'ProjectCollection'
        });
        //分享

        //群聊

        //
      }
    },
    activated() {
      //是否是根目录

    },
    async mounted() {
      this.chooseRoom();
    },
    async created() {
      this.isLoading = true;
      this.projectId = this.$route.params._projectId;
      //同步Project
      let res = await this.$store.dispatch('getProjectAsync', this.projectId);
      this.taskGroups = [...res.taskGroups];
      this.taskList = res.taskList;
      if (res.taskList.isSmartyGroup === true) {
        this.taskGroups.forEach((g) => {
          this.menus.push({
            _id: g._id,
            title: g.title,
            routeName: g.view.routeName,
            params: {
              '_projectId': res.taskList._projectId,
              '_taskListId': res.taskList._id,
              '_taskGroupId': g._id,
            }
          });
        });
      } else {
        this.menus.push({
          _id: res.taskList._id,
          title: res.taskList.title,
          routeName: 'ProjectNormal',
          params: {
            '_projectId': res.taskList._projectId,
            '_taskListId': res.taskList._id
          }
        });
      }
      this.loadApplications();

      this.isLoading = false;
      this.finishLoading = true;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .nav-bread {
    .el-breadcrumb {
      line-height: 52px;
      font-size: 16px;
    }
  }

  .new-member-dialog {
    .form-results {
      min-height: 300px;
    }
    .member-item {
      display: flex;
      padding: 5px 10px;
      cursor: pointer;
      &:hover {
        background: $grey-200;
      }
      .avatar {
        height: 50px;
        width: 50px;
        border-radius: 50%;
      }
      .content {
        margin-left: 10px;
        flex: auto;
        p {
          line-height: 25px;
          display: block;
          margin-bottom: 0;
        }
        .email {
          font-size: 13px;
        }
      }
      &:hover .right-menu {
        display: block;
      }
      .right-menu {
        align-self: center;
        margin-right: 10px;
        line-height: 30px;
        display: none;
        i {
          font-size: 20px;
        }
      }
    }
  }

  .project-nav-warp {
    padding: 0;
    border-bottom: 1px solid #e5e5e5;
    overflow: hidden;
    margin: 0;
    .nav-item {
      line-height: 35px;
      .nav-link {
        font-size: 15px;
        line-height: 35px;
        color: #000;
        padding: .5rem 1rem;
        &.active {
          color: $color-primary;
          border-bottom: 3px solid $color-primary;
        }
      }
      .nav-btn {
        font-size: 15px;
        line-height: 38px;
        color: #000;
        padding: .5rem 1rem;
        vertical-align: middle;
        display: block;
        .ion {
          font-size: 16px;
        }
        &.active {
          color: $color-primary;
        }
      }
    }
  }

  .project-app-view {
    background: #f5f5f5;
  }

  /*过度*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
