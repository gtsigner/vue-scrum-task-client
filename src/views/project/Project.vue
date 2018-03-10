<template>
  <div>
    <div class="row project-nav-warp">
      <div class="col-2"></div>
      <div class="col-8">
        <ul class="nav justify-content-center">
          <li class="nav-item" v-for="menu in menus" :key="menu._id">
            <router-link active-class="active" class="nav-link" v-html="menu.title"
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
        <ul class="nav justify-content-end">
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
      <router-view></router-view>
    </div>
    <!--菜单组件-->
    <project-manage-panel
      @action="panelAction"
      v-if="showMenuPanel"
      @close="showMenuPanel=false">
    </project-manage-panel>
    <!--Modal组件-->
    <component :is="modal" v-for="modal in modals" @close="closeModal"></component>
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
    created() {
      this.projectId = this.$route.params.project_id;

      //同步Project
      this.$store.dispatch('getProjectAsync', this.projectId);

      this.initTaskList();
      this.initTaskGroups();
    },
    data() {
      return {
        isLoading: true,
        taskGroups: [],
        projectId: null,
        menus: [],
        applications: [
          // {title: '需求', routeName: 'ProjectDemand'},
          // {title: '缺陷', routeName: 'ProjectDefect'},
          // {title: '迭代', routeName: 'ProjectIteration'},
          {title: '分享', routeName: 'ProjectPosts'},
          {title: '文件', routeName: 'ProjectGroupChat'},
          {title: '日程', routeName: 'ProjectGroupChat'},
          {title: '统计', routeName: 'ProjectGroupChat'},
          {title: '群聊', routeName: 'ProjectGroupChat'},
          {title: '成员', routeName: 'ProjectGroupChat'},
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

      },
      //初始化Task列表
      initTaskList() {
        Api.taskList({
          _project_id: this.projectId
        }).then((res) => {
          this.taskList = [];
          res.forEach((item) => {
            let menu = {
              _id: item._id,
              title: item.title,
              routeName: 'ProjectNormal',
              params: {
                'project_id': item._project_id,
                'task_list_id': item._id
              }
            };
            this.menus.push(menu);
            //this.menus.push();
            this.taskList.push(item);
            //在TaskList初始化完成后的阶段
            this.isLoading = false;
          });
        });
      },
      //获取Task阶段
      initTaskGroups() {
        Api.taskGroups({project_id: this.projectId}).then((res) => {
          this.taskGroups = [];
          res.forEach((group) => {
            this.taskGroups.push(group);
          })
        });
      },
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

</style>
