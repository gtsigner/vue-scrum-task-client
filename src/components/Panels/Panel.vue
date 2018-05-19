<template>
  <transition name="fade">
    <div v-if="show" class="project-panel">
      <div class="panel-main">
        <div class="panel-header">
          <div class="project-panel-header">
            <div class="title">{{title}}</div>
            <a class="ion ion-close close-handler" @click="close"></a>
          </div>
        </div>
        <div class="project-panel-body thin-scroll">
          <div class="p-1">
            <el-input v-model="search.keywords" placeholder="输入搜索的用户名或手机号"></el-input>
          </div>
          <div class="list-group member-list">
            <!--邀请会员-->
            <div
              @click="getNewMember"
              class="list-item member-item">
              <img class="avatar" src="../../assets/icons/plus.png" alt="">
              <div class="content">
                <p style="line-height: 40px;color: dodgerblue;">邀请新成员</p>
              </div>
            </div>
            <!--会员列表-->
            <loading v-if="isLoading"></loading>
            <div
              class="list-item member-item"
              v-for="(m,i) in members" :key="i">
              <img class="avatar" :src="m.avatar" alt="">
              <div class="content">
                <p class="nickname">{{m.username}}</p>
                <p class="email">{{m.email||'未设置邮箱'}}</p>
              </div>
              <div class="right-menu">
                <el-popover
                  placement="bottom"
                  width="200"
                  trigger="click">
                  <div class="menu-list">
                    <h5 class="header">成员管理</h5>
                    <div class="menu-item cursor-pointer">配置权限</div>
                    <div @click="removeMember(m)" class="menu-item danger cursor-pointer">移除成员</div>
                  </div>
                  <span slot="reference"><i class="ion ion-ios-arrow-down"></i></span>
                </el-popover>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Loading from '@/components/Loading'

  export default {
    name: "project-member-panel",
    components: {Loading},
    props: {
      show: false
    },
    data() {
      return {
        members: [],
        title: '项目成员',
        dialogShow: false,
        isLoading: true,
        search: {
          keywords: '',
        }
      };
    },
    computed: {
      project() {
        return this.$store.state.project;
      }
    },
    watch: {
      'show'() {
        this.loadMembers();
      }
    },
    methods: {
      //移除成员
      remove() {

      },
      getNewMember() {
        this.$emit('open-dialog');
      },
      action(modalName) {
        this.$emit('action', modalName);
      },
      close() {
        this.$emit('update:show', false)
      },
      async removeMember(member) {
        this.isLoading = true;
        await this.$api.instance().delete(`project/${this.project._id}/member/remove/${member._id}`);
        await this.loadMembers();
        this.isLoading = false;
      },
      async setting() {

      },
      async loadMembers() {
        this.isLoading = true;
        let res = await this.$api.instance().get(`project/${this.project._id}/members`);
        this.members = [...res];
        this.isLoading = false;
      }
    },
    async mounted() {
      this.loadMembers();
    }
  }
</script>

<style scoped lang="scss">
  .menu-list {
    .header {
      line-height: 40px;
      text-align: center;
    }
    .menu-item {
      border-top: 1px solid $grey-100;
      line-height: 40px;
      &:hover {
        color: #000;
      }
      &.danger {
        color: $red-500;
      }
    }
  }

  .member-list {
    .member-item {
      display: flex;
      padding: 5px 10px;
      cursor: pointer;
      &:hover {
        background: $grey-200;
      }
      .avatar {
        padding: 5px;
        height: 40px;
        width: 40px;
        border-radius: 50%;
      }
      .content {
        margin-left: 10px;
        flex: auto;
        p {
          line-height: 20px;
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
        margin-right: 10px;
        line-height: 40px;
        display: none;
        i {
          font-size: 20px;
        }
      }
    }
  }

  .project-panel {
    position: fixed;
    right: 0;
    top: 112px;
    background-color: #f7f7f7;
    box-shadow: -3px 0 3px rgba(0, 0, 0, .1);
    width: 300px;
    bottom: 0;
  }

  .project-panel {
    cursor: auto;
    .panel-main {
      height: 100%;
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
    }
    .panel-header {
      position: relative;
      overflow: hidden;
      height: 50px;
      flex: none;
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
      flex: auto;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
</style>
