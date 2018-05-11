<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
  import Loading from '@/components/Loading'

  export default {
    name: "project-collection",
    computed: {
      folder() {
        return this.$store.state.folder;
      }
    },
    data() {
      return {}
    },
    components: {},
    activated() {
      if (this.$route.name === 'ProjectCollection') {
        this.$router.replace({
          name: 'project-collection-view',
          params: {
            _collectionId: this.folder._id,
          }
        })
      }
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
