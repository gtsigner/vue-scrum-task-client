<template>
  <div class="source-view container">
    <div class="wall-view">
      <div class="source-header">
        <h4>文件库</h4>
        <div>
          <span>创建文件夹</span>
        </div>
        <div>
          <span>上传</span>
        </div>
      </div>
      <div class="source-content">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "project-source",
    data() {
      return {}
    },
    methods: {},
    created() {

    },
    mounted() {

    }
  }
</script>

<style scoped lang="scss">
  .source-view {
    background: #fff;
    position: fixed;
    top: 120px;
    margin: 0 auto;
    right: 0;
    bottom: 0;
    left: 0;
    border: 1px solid $grey-100;
    .wall-view {

    }
    .source-header {
      padding: 20px;
      display: flex;
      align-items: center;
      h4 {
        flex: auto;
        margin: 0;
      }
      border-bottom: 1px solid $grey-100;
    }
    .source-content {
      min-height: 300px;
    }
  }
</style>
