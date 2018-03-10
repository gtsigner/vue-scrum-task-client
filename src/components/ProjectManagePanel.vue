<template>
  <div class="project-panel">
    <div class="panel-header">
      <div class="project-panel-header">
        <div class="title">项目菜单</div>
        <a class="ion ion-close close-handler" @click="close"></a>
      </div>
    </div>
    <div class="project-panel-body thin-scroll">
      <div class="activity-panel-all">
        <div class="project-menus">
          <ul class="list-group list-unstyled">
            <li class="list-group-item menu-item">
              <a class="menu-link" @click="action('project-setting-modal')">
                <span class="ion ion-android-settings"></span>项目设置
              </a>
            </li>
            <li class="list-group-item menu-item">
              <a class="menu-link">
                <span class="ion ion-wineglass"></span>项目信息
              </a>
            </li>
            <li class="list-group-item menu-item">
              <a class="menu-link">
                <span class="ion ion-android-walk"></span>标签
              </a>
            </li>
            <li class="list-group-item menu-item">
              <a class="menu-link">
                <span class="ion ion-ios-settings-strong"></span>应用与插件
              </a>
            </li>
            <li class="list-group-item menu-item">
              <a class="menu-link">
                <span class="ion ion-more"></span>查看更多
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "project-manage-panel",
    components: {},
    props: {
      show: false
    },
    data() {
      return {
        modals: {
          settingModal: false,
          detailShow: false,
        }
      };
    },
    methods: {
      action(modalName) {
        this.$emit('action', modalName);
      },
      close() {
        this.$emit('close');
      }
    }
  }
</script>

<style scoped lang="scss">

  /*过度*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .project-panel {
    display: block;
    position: fixed;
    right: 0;
    top: 113px;
    background-color: #f7f7f7;
    box-shadow: -3px 0 3px rgba(0, 0, 0, .1);
    width: 300px;
    height: 100%;
    opacity: 1;
    -webkit-transform: translateZ(0px);
    transform: translateZ(0px);
    transition: .3s all;
    overflow: hidden;
  }

  .project-panel {
    cursor: auto;
    .panel-header {
      position: relative;
      overflow: hidden;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-bottom: 1px solid #e5e5e5;
      .title {
        padding: 0 15px;
        color: #383838;
        font-size: 15px;
        font-weight: 700;
        z-index: 1;
      }
      .close-handler {
        position: absolute;
        top: 0;
        height: 50px;
        vertical-align: middle;
        line-height: 50px;
        text-align: center;
        width: 50px;
        right: 0;
        z-index: 2;
        cursor: pointer;
      }
    }
    .project-panel-body {
      height: 100%;
      overflow: auto;
      .project-menus {
        border-bottom: 1px solid #e5e5e5;
        .menu-item {
          padding: 0;
          background: transparent;
          border: none;
          border-radius: 0;
          font-weight: 600;
          color: #383838;
          font-size: 14px;
          cursor: pointer;
          .menu-link {
            line-height: 30px;
            padding: 5px;
            display: block;
            width: 100%;
            .ion {
              margin-left: 15px;
              margin-right: 5px;
              display: inline-block;
              vertical-align: middle;
              text-align: center;
            }
          }
          &:hover {
            background: #eee;
          }
        }
      }
    }
  }
</style>
