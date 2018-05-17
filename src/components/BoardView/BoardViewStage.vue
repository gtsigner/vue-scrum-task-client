<template>
  <!--阶段组建-->
  <div class="task-stage">
    <!--header-->
    <header class="task-stage-header ui-sortable-handle">
      <div class="task-name hinted">
        <div class="head">
          <span v-html="stage.name"></span> ·
          <span class="task-count" v-html="tasks.length"></span>
        </div>
        <div>
          <el-dropdown trigger="click">
            <div class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown" class="task-stage-menu-wrapper">
              <div class="header">
                <p class="text-center">项目阶段</p>
              </div>
              <el-dropdown-item divided @click.native="edit"><i class="el-icon-edit"></i> 编辑阶段</el-dropdown-item>
              <el-dropdown-item @click.native="remove" divided><i class="el-icon-close"></i> 删除阶段</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </header>
    <div class="task-loading">
      <loading v-if="isLoading" :loading="isLoading"></loading>
    </div>
    <div class="task-stage-wrap">
      <section class="stage-content thin-scroll">
        <div class="stage-tasks">
          <draggable
            style="min-height: 100px;"
            :data-stage-id="stage._id"
            v-model="tasks"
            @choose="choose"
            @end="end"
            @sort="sort"
            :options="dragOptions">
            <board-view-task
              :data-task-id="task._id"
              :task="task"
              :key="task._id"
              v-for="task in tasks"></board-view-task>
          </draggable>
        </div>
        <div class="task task-card task-creator-card">
          <div class="task-creator" v-if="showCreator">
            <div>
              <textarea v-model="newTask.title" class="task-content-input form-control" placeholder="任务内容"></textarea>
            </div>
            <div class="submit-set clearfix">
              <button type="button"
                      @click="createTask"
                      class="btn btn-primary btn-sm btn-submit">创建
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="task-creator-wrap mt-2">
      <a class="task-creator-handler" @click="showCreator=true">
        <i class="ion ion-plus-circled mr-1"></i>
        <span>添加任务</span>
      </a>
    </div>
  </div>
</template>

<script>
  import Api from '@/utils/api'

  import Draggable from 'vuedraggable'
  import BoardViewTask from './BoardViewTask'
  import Loading from '../Loading'
  import * as EventTypes from '../../utils/socket-event-types'

  export default {
    name: "board-view-stage",
    components: {
      Draggable, BoardViewTask, Loading
    },
    props: {
      taskList: {},
      dragOptions: {},
      project: {},
      stage: {},
    },
    data() {
      return {
        tasks: [],
        isLoading: true,
        showCreator: false,
        newTask: {
          title: ''
        },
        moveAble: {
          update: false,
          taskId: '',
          toIndex: '',
          fromIndex: '',
          fromStageId: '',
          toStageId: '',
        }
      }
    },
    watch: {
      'moveAble.update'(n, o) {
        //判断是否需要移动
        if (n === false && this.moveAble.fromStageId !== this.moveAble.toStageId) {
          console.log("Move:", `${this.moveAble.taskId} To ${this.moveAble.toStageId}`)
          Api.moveTask(this.moveAble.taskId,
            {_stageId: this.moveAble.toStageId}).then((res) => {

          });
        }
      }
    },
    methods: {
      async edit() {
        const _self = this;
        this.$prompt('请输入新阶段名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(async ({value}) => {
          let res = await this.$api.instance().put(`taskStage/${this.stage._id}`, {
            _id: this.stage._id,
            name: value
          });
          this.$message.success(res.message);
          this.$store.commit('UPDATE_STAGE', {
            _id: this.stage._id,
            name: value
          });
        });
      },
      async remove() {
        this.isLoading = true;
        let res = await this.$api.instance().delete(`taskStage/${this.stage._id}`);
        if (res.code === this.$api.ResCodes.FAIL) {
          this.$message.error(res.message);
        } else {
          this.$message.success(res.message);
          this.$store.commit('REMOVE_STAGE', this.stage);
        }
        this.isLoading = false;
      },
      sort(ele) {
      },
      choose(ele) {
        this.moveAble.taskId = ele.item.getAttribute('data-task-id');
        this.moveAble.fromStageId = ele.from.getAttribute('data-stage-id');
        this.moveAble.update = true;
      },
      end(ele) {
        this.moveAble.toStageId = ele.to.getAttribute('data-stage-id');
        this.moveAble.update = false;
      },
      async createTask() {
        let nt = {
          _projectId: this.project._id,
          _taskListId: '',
          _stageId: this.stage._id,
          title: this.newTask.title,
          content: '',
          status: 0
        };
        let res = await  Api.createTask(nt);
        this.tasks.push(res);
        this.showCreator = false;
      },
      //初始化阶段的Task
      async initStageTask() {
        this.isLoading = true;
        let res = await Api.tasks({_projectId: this.project._id, _stageId: this.stage._id});
        this.tasks = [...res];
        this.isLoading = false;
      }
    },
    socket: {
      //事件
      events: {
        //当新的任务事件通知
        [EventTypes.PROJECT_NEW_TASK](packet) {

        }
      }
    },
    created() {
      this.initStageTask();
    }
  }
</script>

<style lang="scss">
  .task-stage {
    .task-name {
      display: flex;
      .head {
        flex: auto;
      }
    }
  }

  .task {
    &.task-creator-card {
      .task-creator {
        flex: auto;
        padding: 5px;
        .task-content-input {
          width: 100%;
        }
        .submit-set {
          margin-top: 5px;
          text-align: right;
          .btn-submit {
            cursor: pointer;
          }
        }
      }
      &:hover {
        transform: none;
      }
    }
    &.task-card {
      position: relative;
      white-space: normal;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      -webkit-align-items: flex-start;
      -ms-flex-align: start;
      align-items: flex-start;
      transition: .288s all;
      margin: 0 8px 8px;
      background-color: #fff;
      border-radius: 3px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
      cursor: pointer;
      &:hover {
        transform: translateX(.3em);
      }
    }
    .task-checkbox {
      width: 20px;
      height: 20px;
      border: 2px solid #a6a6a6;
      cursor: pointer;
      border-radius: 3px;
      margin: 14px 6px 0 14px;
      flex: 0 0 auto;
      padding: 0;
      .ion {
        line-height: 20px;
        width: 20px;
        top: 0;
        margin: 0;
        color: #a6a6a6;
        font-size: 15px;
        -webkit-transform: translate(2px, -1px);
        transform: translate(2px, -1px);
      }
    }

    .task-content-wrapper {
      margin: 0 0 0 6px;
      line-height: 20px;
      cursor: pointer;
      overflow: hidden;
      -webkit-flex: 1 1 auto;
      -ms-flex: 1 1 auto;
      flex: 1 1 auto;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: flex-start;
      -ms-flex-align: start;
      align-items: flex-start;
      padding: 12px 0;
      .task-content {
        word-wrap: break-word;
        overflow: hidden;
        margin: 2px 12px 0 0;
        flex: 1 1 auto;
        font-size: 15px;
      }
      .avatar {
        width: 24px;
        height: 24px;
        opacity: 1;
        margin: 0 14px 0 0;
        flex: 0 0 auto;
        transition: -webkit-transform 218ms ease-in-out, opacity 100ms;
      }
    }
  }

  .task-stage-menu-wrapper {
    width: 200px;
    .header {
    }
  }
</style>
