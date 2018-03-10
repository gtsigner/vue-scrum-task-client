<template>
  <div>
    <div class="swim-table">
      <div class="swim-grid">
        <!--Cell 标题 Row-->
        <div class="swim-grid-header cell-container">
          <div class="swim-grid-header-column cell"
               @click="sortBy(col)"
               :class="{'swim-grid-head':col.resizable===false}"
               v-for="col in cols"
               :style="{width:col.width}">
            <div class="cell-content">
              <div class="cell-title-box">
                <span class="cell-title" v-html="col.title"></span>
                <span class="ion ion-arrow-down-b rotate-able ml-2"
                      v-bind:class="{'rotate-180':col.sort_type===2}"
                      v-if="col.sort_type!==0"></span>
              </div>
            </div>
          </div>
        </div>
        <!--内容-->
        <div class="swim-grid-content thin-scroll">
          <div class="content-item" v-for="(stage,index) in stages" :key="index">
            <!--头部-->
            <div class="cell-container border-top">
              <div class="swim-grid-content-column cell"
                   @click="stage.show=!stage.show"
                   :style="{width:cols[0].width}">
                <div class="cell-content">
                  <div class="cell-title-box">
                    <!--<span><input type="checkbox" class="mr-1"></span>-->
                    <span class="ion toggle-stage-ion rotate-able ion-arrow-down-b mr-1"
                          v-bind:class="{'rotate-right':stage.show===false}"></span>
                    <span class="cell-title" v-html="stage.title"></span>
                  </div>
                </div>
              </div>
              <div v-if="stage.creatable"
                   id="createTaskBox"
                   @click="this.newTask.popover_show=!this.newTask.popover_show"
                   class="swim-grid-content-column cell no-hover">
                <div class="cell-content">
                  <div class="cell-title-box">
                    <span class="cell-title">创建任务</span>
                    <span class="ion ml-1 btn-create-task ion-android-add-circle"></span>
                  </div>
                </div>
              </div>
              <div v-if="stage.creatable" class="float-right jump-link-box cell">
                <div class="cell-content">
                  <router-link :to="{
                    name:'ProjectIteration',
                    query:$route.query
                  }">前往[迭代]规划需求
                  </router-link>
                  <span class="ion ion-chevron-right"></span>
                </div>
              </div>
            </div>
            <!--具体内容-->
            <div>
              <div class="cell-container border-top-0 no-data-cell-container" v-if="tableRows.length!==0">
                <div class="">
                  <p><span class="ion ion-social-dropbox-outline"></span></p>
                  <p>创建新的任务开始你的工作</p>
                </div>
              </div>
              <!--task-container-->
              <div class="cell-container border-top-0" v-if="stage.show" v-for="(row,i) in tableRows">
                <div class="swim-grid-content-column cell"
                     :class="{'swim-grid-head':col.resizable===false}"
                     v-for="col in cols"
                     :style="{width:col.width}">
                  <div class="cell-content">
                    <div class="cell-title-box">
                      <span class="cell-title" v-html="row[col.fieldName]"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-popover placement="bottom"
               :show.sync="newTask.popover_show"
               target="createTaskBox">
      <div class="board-menu-header" slot="title">
        <span>创建任务</span>
      </div>
      <div class="task-create-content">
        <textarea v-model="newTask.content" class="form-control" rows="3"></textarea>
        <div class="mt-2">
          <button @click="createTask" type="button" class="btn btn-primary btn-block">创建</button>
        </div>
      </div>
    </b-popover>
  </div>
</template>

<script>
  import Api from '../utils/api'

  export default {
    name: "swim-table",
    props: {},
    data() {
      return {
        newTask: {
          content: '',
          popover_show: true
        },
        stages: [
          {
            title: '未完成的迭代需求',
            creatable: true,
            show: true,
            status: 0
          },
          {
            title: '已完成的迭代需求',
            show: false,
            status: 1
          },
        ],
        stageDoing: [],
        stageFinish: [],
        tableRows: [
          {
            _id: '123412342',
            title: '吃饭饭',
            executor: '12341234',
            end_at: '',
            status: 0
          },
          {
            _id: '123412342',
            title: '吃饭2饭',
            executor: '12341234',
            end_at: '',
            status: 1
          }
        ],
        cols: [
          {title: '标题', fieldName: 'title', width: '180px', left: '0px', resizable: false, sort_type: 0},
        ],
        tableCols: [
          {title: '任务ID', fieldName: '_id', width: 100, resizable: true},
          {title: '执行者', fieldName: 'executor', width: 100, resizable: true},
          {title: '任务状态', fieldName: '_id', width: 100, resizable: true},
          {title: '迭代', fieldName: '_id', width: 150, resizable: true},
          {title: 'Story Points', fieldName: '_id', width: 150, resizable: true},
          {title: '优先级', fieldName: '_id', width: 150, resizable: true},
          {title: '开始时间', fieldName: '_id', width: 150, resizable: true},
          {title: '截止时间', fieldName: '_id', width: 150, resizable: true},
          {title: '备注', fieldName: '_id', width: 150, resizable: true},
          {title: '标签', fieldName: '_id', width: 150, resizable: true},
          {title: '参与人员', fieldName: '_id', width: 150, resizable: true}
        ]
      }
    },
    methods: {
      createTask() {
        this.newTask.popover_show = false;
        let task = {
          project_id: this.$route.params['project_id'],
          content: this.newTask.content
        };
        this.newTask.content = '';
        Api.createTask(task).then((res) => {
          console.log(res);
        });
      },
      sortBy(col) {
        this.cols.forEach((cc) => {
          if (cc === col) {
            col.sort_type = col.sort_type === 1 ? 2 : 1;
          } else {
            cc.sort_type = 0;
          }
        });
      },
      initCols() {
        let leftTag = 180;
        this.tableCols.forEach((item, index) => {
          let col = {
            title: item.title,
            fieldName: item.fieldName,
            left: leftTag + 'px',
            width: item.width + 'px',
            resizable: item.resizable,
            sort_type: 0
          };
          leftTag += item.width;
          this.cols.push(col);
        });
      }
    },
    created() {
      this.initCols();
    }
  }
</script>

<style scoped lang="scss">

  .cell-container {
    background: #ffffff;
    position: relative;
    height: 40px;
    display: flex;
    z-index: 0;
    transition: box-shadow 200ms ease;
    border: 1px solid $color-border-gary;
    .cell {
      flex: auto;
      overflow-y: hidden;
      position: relative;
      border-right: 1px solid $color-border-gary;
      .cell-title-box {
        margin: 0 12px;
        color: #a6a6a6;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        overflow: hidden;
        .cell-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
        }
      }
      &:hover {
        background: #f5f5f5;
        cursor: pointer;
      }
      &.no-hover:hover {
        background: #fff;
      }
    }
    &.no-data-cell-container {
      padding: 30px;
      height: auto;
      min-height: 110px;
      font-size: 12px;
      text-align: center;
      color: #a6a6a6;
      display: block;
      p {
        margin-bottom: 0;
      }
      .ion {
        font-size: 6em;
      }
    }
  }

  .swim-table {
    padding: 10px 15px;
    .swim-grid {
      min-width: 1200px;
      overflow: auto;
      .swim-grid-header {
        .swim-grid-header-column {
          line-height: 30px;
          cursor: pointer;
          text-align: left;
          color: #e5e5e5;
          padding: 5px;
          .cell-content {
            display: flex;
          }
        }
      }
      .swim-grid-content {
        height: auto;
        position: relative;
        display: block;
        z-index: 999;
        .content-item {
          background: #fff;
          border-radius: 4px;
          margin-top: .5rem;
        }
        .cell-content {
          line-height: 30px;
          cursor: pointer;
          text-align: left;
          color: #e5e5e5;
          padding: 5px;
        }
        .toggle-stage-ion {
          width: 10px;
          font-size: 12px;
          text-align: center;
        }

        .btn-create-task {
          cursor: pointer;
          overflow: hidden;
          font-size: 21px;
          line-height: 30px;
          color: $color-primary;
          &:hover {
            color: $color-primary-500;
          }
        }

        .jump-link-box {
          .cell-content {
            text-align: right;
            font-size: 13px;
            color: $color-primary;
            line-height: 30px;
          }
        }
      }

    }
  }

</style>
