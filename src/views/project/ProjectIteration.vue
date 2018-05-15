<template>
  <div class="iteration-view">
    <div class="smart-group-view fade-in">
      <div class="agile-view">
        <div class="sprint-panel-wrapper"></div>
        <div class="agile-view-wrapper">
          <div class="table-board-view">
            <swim-table></swim-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '@/utils/api'
  import Auth from '@/utils/auth'
  import SwimTable from '../../components/SwimTable'

  export default {
    name: 'project-iteration',
    components: {
      SwimTable
    },
    created() {
      console.log(this.$route);
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .smart-group-view {
    position: fixed;
    top: 122px;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0;
    overflow: hidden;
  }
</style>
