<template>
  <div class="collection-view container">
    <div class="wall-view">
      <div class="collection-header">
        <h4>文件库</h4>
        <div>
          <span>创建文件夹</span>
        </div>
        <div>
          <span>上传</span>
        </div>
      </div>
      <div class="collection-content">
        <table class="table table-hover text-center">
          <thead>
          <tr class="header-tr">
            <td>
              <el-checkbox name="type"></el-checkbox>
            </td>
            <td>名称</td>
            <td>大小</td>
            <td>创建者</td>
            <td>备注</td>
            <td>更新时间</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="i in tableData3">
            <td>
              <el-checkbox name="type"></el-checkbox>
            </td>
            <td>{{i.name}}</td>
            <td>{{i.name}}</td>
            <td>{{i.name}}</td>
            <td>{{i.name}}</td>
            <td>{{i.name}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "project-analytics",
    data() {
      return {
      }
    },
    methods: {},
    created() {

    },
    mounted() {

    }
  }
</script>

<style scoped lang="scss">
  .collection-view {
    .wall-view {
      border: 1px solid $color-border-gary;
      position: relative;
      width: 100%;
      margin: 10px auto 10px;
      background: #fff;
    }
    .collection-header {
      padding: 20px;
      display: flex;
      align-items: center;
      h4 {
        flex: auto;
        margin: 0;
      }
      border-bottom: 1px solid $grey-100;
    }
    .collection-content {
      min-height: 300px;
    }
  }
</style>
