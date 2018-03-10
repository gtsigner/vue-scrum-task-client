<template>
  <div class="project-setting-modal" v-if="show">
    <div class="modal fade"
         :class="{'show':show===true}" v-if="show=true" tabindex="-1" role="dialog"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header text-center">
            <h5 class="modal-title">项目设置</h5>
            <button type="button"
                    @click="close"
                    class="close"
                    data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="tab-container">
              <div class="tab-list">
                <a class="tab-item"
                   @click="changeTab(tb)"
                   :class="{'active':tb.slot===currentTab}" v-for="(tb,index) in tabs" :key="index">
                  <span class="ion" :class="tb.icon"></span>
                  <span class="text" v-html="tb.title"></span>
                </a>
              </div>
              <div class="tab-content-container thin-scroll">
                <div class="tab-content-item active">
                  <component :is="currentTab"></component>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SettingProjectTab from './SetTabItems/SettingProjectTab'

  export default {
    name: "project-setting-modal",
    components: {
      SettingProjectTab
    },
    props: {},
    data() {
      return {
        currentTab: 'setting-project-tab',
        tabs: [
          {title: '项目信息', icon: 'ion-model-s', slot: 'setting-project-tab'},
          {title: '项目偏好', icon: 'ion-eye', slot: 'habit-project-tab'},
          {title: '任务类型', icon: 'ion-easel', slot: 'task-type-project-tab'},
          {title: '   更 多', icon: 'ion-more', slot: 'more-project-tab'},
        ],
        show: true
      }
    },
    methods: {
      close() {
        //this.show = false;
        this.$emit('close')
      },
      changeTab(tab) {
        this.currentTab = tab.slot
      }
    },
    created() {

    }
  }
</script>

<style scoped lang="scss">
  .tab-container {
    display: flex;
    .tab-list {
      flex: 1;
      top: 0;
      left: 0;
      bottom: 0;
      border-right: 1px solid #e5e5e5;
      .tab-item {
        position: relative;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        height: 56px;
        padding: 0 20px;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        overflow: hidden;
        line-height: 56px;
        font-size: 14px;
        border-bottom: 1px solid #e5e5e5;
        cursor: pointer;
        &.active:before {
          content: " ";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 4px;
          transition: all 218ms;
          background: $color-primary;
        }
        &.active, &:hover {
          color: $color-primary;
        }
        .ion {
          width: 25px;
        }
      }
    }
    .tab-content-container {
      flex: 3;
      overflow-y: auto;
      display: block;
      height: 550px;
      text-align: left;
      .tab-content-item {
        flex: 1;
        display: none;
        &.active {
          display: block;
        }
      }
    }
  }

  .project-setting-modal {
    .show {
      display: block;
    }
    .modal-body {
      padding: 0;
      border: 0;
      .tab-container {

      }
    }
    .modal-dialog {
      min-width: 700px;
      margin: 1.75rem auto;
    }
  }
</style>
