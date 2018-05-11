<template>
  <div class="source-root-view container">
    <div class="wall-view">
      <div class="source-header">
        <h4>代码库</h4>
        <div @click="createResp" class="create-box color-primary cursor-pointer">
          <span class="ion ion-plus-circled"></span>
          创建代码库
        </div>
        <div class="update-box cursor-pointer color-primary" @click="loadReps">
          <span class="ion ion-load-d"></span>更新
        </div>
      </div>
      <div class="source-content thin-scroll">
        <div class="list-group" v-for="res in repositories" :key="res._id">
          <div class="list-group-item repos-item">
            <div class="title">
              <span>{{res.name}}</span>
            </div>
            <div class="footer">
              Git地址：<a :href="res.reposUrl" target="_blank">{{res.reposUrl}}</a>
            </div>
            <div>
              <router-link :to="{name:'source-repository',params:{
                   resId:res._id
              }}">查看
              </router-link>
            </div>
          </div>
        </div>
        <div class="nothing" v-if="repositories.length===0">
          <div class="text-center">
            <span class="ion ion-social-dropbox-outline"></span>
            <p class="tip">当前项目未关联任何代码库</p>
          </div>
        </div>
      </div>
      <Loading style="margin-top: 20px" v-if="isLoading"></Loading>
    </div>
  </div>
</template>

<script>
  import Loading from '@/components/Loading'

  export default {
    name: "source-root-view",
    components: {
      Loading
    },
    data() {
      return {
        resp: {
          isShow: false,
        },
        isLoading: true,
        repositories: [],
      }
    },
    computed: {
      project() {
        return this.$store.state.project;
      }
    },
    methods: {
      async createResp() {
        try {
          let val = await this.$prompt('请输入仓库名称(5-20个字母组成)', '创建新的代码库', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^[a-zA-Z]{4,20}$/,
            inputErrorMessage: '仓库名称不正确'
          });
          let res = await this.$api.instance().post('/repository', {
            _projectId: this.project._id,
            name: val.value
          });
          this.repositories.push(res);
        } catch (e) {
          console.info("用户取消创建仓库");
        }
      },
      async loadReps() {
        this.isLoading = true;
        let res = await this.$api.instance().get('/repository?_projectId=' + this.project._id);
        this.repositories = [...res];
        this.isLoading = false;
      }
    },
    async created() {
      await this.loadReps();
    },
    mounted() {

    }
  }
</script>

<style scoped lang="scss">
  .source-root-view {
    position: fixed;
    top: 120px;
    margin: 0 auto;
    right: 0;
    bottom: 10px;
    left: 0;
    height: auto;
    border: 1px solid $grey-100;
    .wall-view {
      position: relative;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      background: #fff;
      max-height: 100%;
      padding-bottom: 20px;
      flex-direction: column;
    }
    .source-header {
      padding: 20px;
      display: flex;
      align-items: center;
      h4 {
        flex: auto;
        color: #606266;
        margin: 0;
        font-size: 25px;
      }
      border-bottom: 1px solid $grey-100;
      .create-box, .update-box {
        align-self: center;
        margin: 0 5px;
        line-height: 30px;
        font-size: 18px;
        .ion {
          font-size: 18px;
          margin: 2px;
        }
      }
    }
    .source-content {
      overflow-y: auto;
      .repos-item {
        display: flex;
        border: none;
        border-bottom: 1px solid $grey-200;
        line-height: 30px;
        align-items: center;
        .title, .footer {
          overflow: hidden;
          flex: 1;
          text-align: left;
        }
        .title {
          display: block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .footer {
          flex: 3
        }
      }
    }
    .nothing {
      .ion {
        font-size: 100px;
        margin: 20px 0 0;
        color: $grey-700;
      }
      .tip {
        font-size: 13px;
        color: $grey-700;
      }
    }
  }
</style>
