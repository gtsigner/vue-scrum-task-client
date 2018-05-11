<template>
  <div class="collection-view container">
    <div class="wall-view">
      <div class="collection-header">
        <el-breadcrumb class="nav-bread" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>{{defaultFolder.title}}</el-breadcrumb-item>
          <el-breadcrumb-item :key="i" v-for="(n,i) in navList">{{n.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div @click="newFolderShow">
          <span class="ion ion-plus-circled"></span>
          <span class="create-btn">创建文件夹</span>
        </div>
        <div>
          <el-upload
            :headers="headers"
            class="avatar-uploader"
            action="/api/v1/upload/file"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload">
            <span class="ion ion-ios-upload"></span>
            <span class="upload-btn">上传</span>
          </el-upload>
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
          <tr v-if="newFolder.active">
            <td>
              <el-checkbox size="medium" name="type"></el-checkbox>
            </td>
            <td style="display: flex;align-items: center;">
              <img class="icon-floder" src="/static/images/floder.png" alt="">
              <input
                id="newFolderInput"
                @keyup.enter="saveNewFolder"
                ref="newFolderInput"
                @focusout="newFolder.active = false"
                v-model="newFolder.title"
                placeholder="请输入文件夹名称 Enter 确认" type="text" class="form-control">
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr @click="jumpFolder(col)" v-for="(col,i) in collections" :key="i">
            <td>
              <el-checkbox size="medium" name="type"></el-checkbox>
            </td>
            <td>
              <img class="icon-floder" src="/static/images/floder.png" alt="">
              {{col.title}}
            </td>
            <td>{{col.size||'-'}}</td>
            <td>{{col.creator.username}}</td>
            <td>{{col.updateAt | formatDateTime}}</td>
            <td>
              <!--操作-->
            </td>
          </tr>
          <tr class="text-center" v-if="collections.length===0&&files.length===0">
            <td colspan="20">空空如也~</td>
          </tr>
          <tr @click="jumpFile(col)" v-for="(col,i) in files" :key="col._id">
            <td>
              <el-checkbox size="medium" name="type"></el-checkbox>
            </td>
            <td>
              <img class="icon-floder" src="/static/images/image.png" alt="">
              {{col.fileName}}
            </td>
            <td>{{col.fileSize||'-'}}</td>
            <td>{{col.creator.username}}</td>
            <td>{{col.updateAt | formatDateTime}}</td>
            <td>
              <!--操作-->
            </td>
          </tr>

          </tbody>
        </table>
      </div>
      <div style="height: 100px;">
        <loading v-if="isLoading"></loading>
      </div>
    </div>
  </div>
</template>

<script>
  import Loading from '@/components/Loading'

  export default {
    name: "project-collection-view",
    components: {
      Loading
    },
    computed: {
      project() {
        return this.$store.state.project;
      },
      folderId() {
        return this.$route.params._collectionId;
      },
      defaultFolder() {
        return this.$store.state.folder;
      },
      headers() {
        return {
          'access-token': this.$store.state.accessToken,
          'collection-id': this.folder._id
        }
      }
    },
    data() {
      return {
        isLoading: true,
        collections: [],
        files: [],
        folder: {},
        newFolder: {
          title: '', active: false
        },
        navList: [],

      }
    },
    watch: {
      ['$route.params._collectionId'](n) {
        console.log("Change:", n)
        if (n && n !== this.folder._id) {
          this.getFolder();
        }
      }
    },
    methods: {
      jumpFile() {

      },
      async saveNewFolder() {
        //alert('save');
        let res = await this.$api.instance().post(`collection`, {
          _projectId: this.project._id,
          _parentId: this.folder._id,
          title: this.newFolder.title,
        });
        this.newFolder.title = '';
        //在创建成功后，重新获取一次文件夹
        this.collections = [res, ...this.collections];
        this.newFolder.active = false;
      },
      jumpFolder(folder) {
        this.$router.push({
          name: 'project-collection-view',
          params: {
            _collectionId: folder._id
          }
        })
      },
      async saveFile() {


      },
      newFolderShow() {
        this.newFolder.active = true;
        //必须要在显示后才有ref
        this.$nextTick(() => {
          this.$refs.newFolderInput.focus()
        });
      },
      async getFolder() {
        this.isLoading = true;
        let res = await this.$api.instance().get(`collection/${this.folderId}/show`);
        this.files = [...res.files];
        this.collections = [...res.children];
        this.folder = res.folder;
        this.navList = [];
        this.isLoading = false;
      },
      beforeUpload(file) {
      },
      uploadSuccess(file) {
        this.files = [file, ...this.files];
        this.$message({
          message: '恭喜你，上传文件成功',
          type: 'success'
        });
      }
    },
    async created() {
      await this.getFolder();
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
    top: 120px;
    margin: 0 auto;
    right: 0;
    bottom: 15px;
    left: 0;
    border: 1px solid $grey-100;
    max-height: 800px;
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
      flex: none;
      .nav-bread {
        font-size: 20px;
        flex: auto;
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
      flex: auto;
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
