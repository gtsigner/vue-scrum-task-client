<template>
  <div class="board-view">
    <div class="board-task-view">
      <div class="board-warnings"></div>
      <ul class="board-task-stages horizontal-scroll list-unstyled move-able">
        <li class="task-stage" v-for="stage in taskStages">
          <!--header-->
          <header class="task-stage-header ui-sortable-handle">
            <div class="task-name hinted">
              <span v-html="stage.name"></span> ·
              <span class="task-count" v-html="stageTasks.length"></span>
              <i class="ion ion-android-arrow-dropdown-circle board-stage-menu float-right"></i>
            </div>
          </header>
          <div class="task-stage-wrap">
            <section class="stage-content thin-scroll">
              <ul class="stage-tasks list-unstyled">
                <draggable
                  style="min-height: 200px"
                  @update="updateTask"
                  @save="updateTask"
                  v-model="stageTasks"
                  :options="dragOptions">
                  <li class="task task-card task-item" v-for="task in stageTasks"
                      :key="task._id">
                    <!--优先级-->
                    <div class="task-priority-wrapper">
                      <div class="task-priority-view">
                        <div class="task-priority bg-priority-2"></div>
                      </div>
                    </div>
                    <!-- task content -->
                    <div class="task-checkbox" @click="changeTaskStatus(task)">
                      <i v-if="task.status===1" class="ion ion-checkmark"></i>
                    </div>
                    <div class="task-content-wrapper">
                      <div class="task-content" v-html="task.title"></div>
                      <div class="avatar img-circle"
                           style="background-image:url('/static/images/head.jpg')"
                           data-title="Godtoy"></div>
                    </div>
                  </li>
                </draggable>
              </ul>
            </section>
            <div class="task-creator-wrap mt-2">
              <a class="task-creator-handler">
                <i class="ion ion-plus-circled mr-1"></i>
                <span>添加任务</span>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "board-view",
    props: {
      project: {},
      taskList: {},
    },
  }
</script>

<style >

</style>
