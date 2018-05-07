<template>
  <div class="collection-view container">
    <div class="wall-view">
      <div class="collection-header">
        <h4>文件库</h4>
        <div>
          <span class="ion ion-plus-circled"></span>
          <span class="create-btn">创建文件夹</span>
        </div>
        <div>
          <span class="ion ion-ios-upload"></span>
          <span class="upload-btn">上传</span>
        </div>
      </div>
      <div class="collection-content thin-scroll flex-fill">
        <table class="table table-hover">
          <thead>
          <tr class="header-tr">
            <td style="width: 30px;">
              <el-checkbox size="medium" name="type"></el-checkbox>
            </td>
            <td>名称</td>
            <td>大小</td>
            <td>创建者</td>
            <td>更新时间</td>
            <td></td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(col,i) in collections" :key="i">
            <td>
              <el-checkbox size="medium" name="type"></el-checkbox>
            </td>
            <td>
              <img class="icon-floder" src="/static/images/floder.png" alt="">
              {{col.title}}
            </td>
            <td>{{col.size||'-'}}</td>
            <td>{{col.creator.username}}</td>
            <td>{{col.updateAt||'-'}}</td>
            <td>
              <!--操作-->
            </td>
          </tr>
          <tr class="text-center" v-if="collections.length===0">
            <td colspan="20">空空如也~</td>
          </tr>
          </tbody>
        </table>
        <loading v-if="isLoading"></loading>
      </div>
    </div>
  </div>
</template>

<script>
  import Loading from '@/components/Loading'

  export default {
    name: "project-collection",
    components: {
      Loading
    },
    computed: {
      project() {
        return this.$store.state.project;
      }
    },
    data() {
      return {
        isLoading: true,
        collections: [],
        current: {},//需要默认一个Current
        files: [],
      }
    },
    watch: {
      ['current._id'](n) {

      }
    },
    methods: {
      async getDefaultCollections() {
        this.isLoading = true;
        let res = await this.$api.instance().get(`project/${this.project._id}/collections`);
        //默认一个新文件夹
        res.forEach((coll) => {
          if (coll.type === 'default') {
            this.current = {...coll}
          }
        });
        //获取当前默认文件夹的子文件夹
        res.forEach((coll) => {
          if (coll._parentId === this.current._id) {
            this.collections.push(coll)
          }
        });
        this.isLoading = false;
      }
    },
    created() {
      this.getDefaultCollections();
    },
    mounted() {

    }
  }
</script>

<style scoped lang="scss">
  .icon-floder {
    height: 30px;
    width: 30px;
    margin-right: 15px;
  }

  .collection-view {
    background: #fff;
    position: fixed;
    top: 130px;
    margin: 0 auto;
    right: 0;
    bottom: 15px;
    left: 0;
    border: 1px solid $grey-100;
    max-height: 600px;
    .wall-view {
      max-height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
    }
    .collection-header {
      padding: 10px 15px;
      display: flex;
      align-items: center;
      line-height: 40px;
      h4 {
        flex: auto;
        margin: 0;
      }
      .ion {
        font-size: 18px;
        color: $blue-500;
        line-height: 40px;
      }
      .create-btn, .upload-btn {
        font-size: 18px;
        color: $blue-500;
        cursor: pointer;
        line-height: 40px;
        display: inline-block;
        margin-right: 20px;
      }
    }
    .collection-content {
      overflow-y: auto;

      .table {
        .header-tr {
          font-size: 18px;
          line-height: 30px;
          .el-checkbox {
            line-height: 30px;
          }
        }
        .el-checkbox {
          line-height: 25px;
          margin: 0;
        }
        tbody {
          line-height: 30px;
          font-size: 14px;
          tr {
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
