<template>
  <div>
    <el-dialog
      title="任务管理"
      width="30%"
      :visible.sync="show"
      :append-to-body=true
      @close="close"
      center>
      <div class="center">
        <div class="form">
          <el-input placeholder="任务内容">{{task.title}}</el-input>
        </div>

        <p>参与者 · 1</p>
        <ul class="activity-list">
          3月6日 10:44
          Godtoy 认领了任务
          3月6日 10:46
          Godtoy 完成了任务
          3月6日 10:46
          Godtoy 重做了任务
          3月6日 10:58
          Godtoy 完成了任务
          3月9日 10:20
          Godtoy 将任务移动到 Pull Request
          1分钟前
          Godtoy 重做了任务
          1分钟前
          Godtoy 完成了任务
          几秒前
          Godtoy 移除了执行者
          几秒前
          Godtoy 认领了任务
        </ul>

      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Detail",
    data() {
      return {
        show: true,
        task: {}
      }
    },
    computed: {
      project() {
        return this.$store.state.project;
      },
      taskId() {
        return this.$route.params._taskId;
      }
    },
    methods: {
      close() {
        this.$router.replace({name: 'ProjectNormal'})
      },
      submit() {

      }
    },
    async activated() {
      this.isLoading = true;
      let task = await this.$api.instance().get(`task/${this.taskId}`);
      if (task.code === this.$api.ResCodes.FAIL) {
        return false;
      }
      this.task = task;
      this.show = true;
      this.isLoading = false;
    },
    created() {

    }
  }
</script>

<style scoped>

</style>
