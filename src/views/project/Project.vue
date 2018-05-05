<template>
  <div>
    <div class="row project-nav-warp">
      <div class="col-2">
        <ul class="nav justify-content-end float-left">
          <li class="nav-item">
            <a href="" class="nav-btn">首页<span>&gt;</span></a>
          </li>
          <li class="nav-item">

          </li>
        </ul>
      </div>
      <div class="col-8">
        <ul class="nav justify-content-center">
          <li class="nav-item" v-for="menu in menus" :key="menu._id">
            <router-link
              active-class="active"
              class="nav-link"
              v-html="menu.title"
              :to="{name:menu.routeName,params:menu.params}" replace>
            </router-link>
          </li>
          <li class="nav-item"
              v-for="(appItem,index) in applications"
              :key="index">
            <router-link
              active-class="active"
              class="nav-item nav-link"
              v-html="appItem.title"
              :to="{name:appItem.routeName}"
              replace>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="col-2">
        <ul class="nav justify-content-end float-right">
          <li class="nav-item">
            <a class="nav-btn" href="#">
              <span class="ion ion-android-person"></span>
              <span class="nav-btn-title">成员</span>
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
    <!--Modal组件-->
    <component :is="modal" v-for="(modal,index) in modals" :key="index" @close="closeModal"></component>
  </div>
</template>

<script>
  import Api from '@/utils/api'
  import Auth from '@/utils/auth'

  import Loading from '@/components/Loading'
  import ProjectManagePanel from '@/components/ProjectManagePanel'
  import ProjectSettingModal from '@/components/Modals/ProjectSettingModal'

  export default {
    name: 'Project',
    components: {
      Loading, ProjectManagePanel, ProjectSettingModal
    },
    computed: {
      project: {
        get() {
          return this.$store.state.project;
        },
        set(project) {
          this.$store.dispatch('setProject', project);
        }
      }
    },
    data() {
      return {
        isLoading: true,
        taskList: {title: '任务'},
        taskGroups: [],
        projectId: null,
        menus: [],
        applications: [
          // {title: '需求', routeName: 'ProjectDemand'},
          // {title: '缺陷', routeName: 'ProjectDefect'},
          // {title: '迭代', routeName: 'ProjectIteration'},
          {title: '源码', routeName: 'ProjectSource'},
          {title: '分享', routeName: 'ProjectPosts'},
          {title: '文件', routeName: 'ProjectCollection'},
          {title: '统计', routeName: 'ProjectAnalytics'},
          {title: '群聊', routeName: 'ProjectGroupChat'}
        ],
        showMenuPanel: false,
        modals: [],
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

      }
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
      this.isLoading = false;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

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
