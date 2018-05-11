<template>
  <div class="analytics-view thin-scroll">
    <div class="container main-wrapper">
      <div class="board-wrapper">
        <!--<p class="board-title">任务概况</p>-->
        <div class="row task-total">
          <div class="col-3" v-for="(t,i) in totals" :key="i">
            <div class="card">
              <p class="title">{{t.title}}</p>
              <p class="text-center">
                <el-progress
                  :color="t.color"
                  :width=160
                  type="circle"
                  :percentage="t.rate"
                  :show-text=false></el-progress>
              </p>
              <p class="count">{{t.count}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="board-wrapper">
        <div class="row">
          <div id="taskChart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HighCharts from 'highcharts';

  export default {
    name: "project-analytics",
    data() {
      return {
        totals: [
          {title: '未完成', count: 1, rate: 10, color: '#77C2F8'},
          {title: '已完成', count: 3, rate: 24, color: '#9ED979'},
          {title: '任务总量', count: 5, rate: 20, color: '#77C2F8'},
          {title: '今日到期', count: 3, rate: 80, color: '#ff0a05'},
          {title: '已逾期', count: 2, rate: 70, color: '#ff5b0f'},
          {title: '待认领', count: 4, rate: 50, color: '#FFC774'},
          {title: '按时完成', count: 6, rate: 12, color: '#9ED979'},
          {title: '逾期完成', count: 6, rate: 40, color: '#ff7e09'},
        ],
      }
    },
    methods: {},
    created() {

    },
    mounted() {
      var chart = HighCharts.chart('taskChart', {
        title: {
          text: '用户任务完成情况'
        },
        subtitle: {},
        xAxis: {
          tickInterval: 24 * 3600 * 1000, // 坐标轴刻度间隔为一星期
        },
        yAxis: {
          title: {
            text: '任务条数'
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 2010
          }
        },
        series: [{
          name: '任务总数',
          data: [1, 2, 3, 4, 5, 6, 7, 7]
        }, {
          name: '已完成',
          data: [2, 1, 3, 2, 1, 2, 3, 2]
        }, {
          name: '未完成',
          data: [3, 3, 3, 1, 2, 1, 2, 3]
        }],
        responsive: {
          rules: [{
            condition: {},
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }]
        }
      });
    }
  }
</script>

<style scoped lang="scss">
  .analytics-view {
    position: fixed;
    top: 113px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    #taskChart {
      width: 100%;
      margin-right: 15px;
      margin-left: 15px;
    }
    .main-wrapper {
      margin-top: 20px;
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
    .task-total {
      .col {
        padding: 0 5px !important;
      }
      .card {
        margin-bottom: 15px;
        padding: 15px 0 0;
        font-size: 14px;
        position: relative;
        text-align: center;
        .title {
          font-size: 15px;
          line-height: 30px;
        }
        .el-process {
        }
        .count {
          position: absolute;
          top: 110px;
          left: 0;
          right: 0;
          font-size: 36px;
          font-family: DIN Condensed, serif;
          font-weight: 700;
          line-height: 50px;
          height: 36px;
          margin-left: 1px;
          padding-top: 2px;

        }
      }
    }
  }
</style>
