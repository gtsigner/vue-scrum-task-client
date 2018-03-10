<template>
  <div class="project-view">
    <div class="container">
      <div class="row task-total">
        <div class="col">
          <div class="card">
            <p>任务数量</p>
            <p>2</p>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <p>已完成</p>
            <p><span>2</span></p>
          </div>
        </div>
        <div class="col ">
          <div class="card">
            <p>未完成</p>
            <p>33</p>
          </div>
        </div>
        <div class="col ">
          <div class="card">
            <p>已逾期</p>
            <p>33</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '@/utils/api'

  import ProjectSettingModal from '../../components/Modals/ProjectSettingModal'

  export default {
    name: 'Project',
    components: {
      ProjectSettingModal
    },
    computed: {
      project() {
        return this.$store.state.project;
      }
    },
    data() {
      return {
        show: true
      }
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    display: block;
    position: relative;
  }

  .project-view {
    margin-top: 20px;
    text-align: center;
    .task-total {
      .card {
        padding: 15px;
        font-size: 14px;
      }
    }
  }
</style>
