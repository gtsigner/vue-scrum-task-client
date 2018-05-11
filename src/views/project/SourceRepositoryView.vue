<template>
  <div class="repository-view container">
    <div class="wall-view">
      <div class="repository-content thin-scroll">
        <div class="file-list">
          <table class="table table-hover table-bordered">
            <thead>
            <tr>
              <td style="border: none">最新提交：</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="f in files" :key="f._id">
              <td class="file-item">
                <div class="title">
                  <i class="ion ion-social-javascript" v-if="f.type==='file'"></i>
                  <i class="ion ion-folder" v-if="f.type==='folder'"></i>
                  <a href="#" class="file-name">{{f.name}}</a>
                </div>
                <div class="commit-msg">
                  <code>sdf24234234sdf</code>
                  <span>修复一些Bug</span>
                </div>
                <div class="update">1天前</div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="readme-wrapper">
          <div class="header">
            <i class="ion ion-android-bookmark"></i>
            README.md
          </div>
          <div class="content">
            <vue-markdown class="markdown-content">{{str}}</vue-markdown>
          </div>
        </div>
      </div>
      <Loading style="margin-top: 20px" v-if="isLoading"></Loading>
    </div>
  </div>
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  import Loading from '@/components/Loading'

  export default {
    name: "SourceRepositoryView",
    components: {
      VueMarkdown, Loading
    },
    data() {
      return {
        isLoading: true,
        files: [
          {_id: '1', name: 'src', type: 'folder', commit: '', updateAt: '', hash: '', ext: '',},
          {_id: '2', name: 'readme.js', type: 'file', commit: '', updateAt: '', hash: '', ext: '',},
          {_id: '3', name: 'demo.js', type: 'file', commit: '', updateAt: '', hash: '', ext: ''},
        ],
        str: "![](http://dl.iteye.com/upload/picture/pic/137631/7a0f9e40-51e7-36c8-80a5-f947acf80aae.png)\n" +
        "\n" +
        "[![License](https://img.shields.io/badge/%20license-GNU%20General%20Public%20License%20v3.0-blue.svg)](http://www.gnu.org/licenses/gpl-3.0.en.html) ![](https://img.shields.io/badge/%20build-passing-brightgreen.svg) [![Join the chat at https://gitter.im/gaoxianglong/shark](https://badges.gitter.im/gaoxianglong/shark.svg)](https://gitter.im/gaoxianglong/shark?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)\n" +
        "\n" +
        "云集全链路压测军演系统具备强大的分布式压测能力，**能够在短时间内发起超大规模的压测流量**，使用TITAN能够快速挖掘出业务系统的性能瓶颈，探测出业务系统的真实容量水位，有指导的在大促前进行容量规划和性能优化，让系统坚如磐石。\n" +
        "\n" +
        "- [InfoQ架构文稿 & 线上全链路压测方案](http://www.infoq.com/cn/articles/yunjiweidian-12.12)<br>\n" +
        "- [中文使用手册](https://github.com/yunjiweidian/TITAN/wiki/%E4%B8%AD%E6%96%87%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C)<br>\n" +
        "- [安装部署手册](https://github.com/yunjiweidian/TITAN/wiki/%E5%AE%89%E8%A3%85%E9%83%A8%E7%BD%B2%E6%89%8B%E5%86%8C)<br>\n" +
        "\n" +
        "----------\n" +
        "\n" +
        "## 功能特点\n" +
        "\n" +
        "- **天生为分布式系统而生**，具备超高的并发压测能力，支持对Agent（压测引擎）节点的无限水平扩容；\n" +
        "- 操作极其简单，上手快速，并且具备友好的交互式体验；\n" +
        "- 能够适配任何复杂的业务场景，**支持多链路组装压测，无惧任何业务场景挑战**；\n" +
        "- 支持对压测引擎、目标机器的可视化CPU、内存、磁盘IOPS等监控，让问题浮出水面；\n" +
        "- 支持定时自动化压测任务，更好的**实现线上压测常态化**；\n" +
        "- 便捷的压测引擎管理，无需运维手工介入（启/停）；\n" +
        "- 永久开源、**不阉割功能**，并且保证和云集内部版本保持一致，持续更新维护中；\n" +
        "- 完全采用Java语言编写，方便二次开发实现功能扩展。\n" +
        "\n" +
        "----------\n" +
        "\n" +
        "## 功能界面\n" +
        "![](http://dl.iteye.com/upload/picture/pic/137641/754bed99-683b-3978-b614-1be71443441c.png)\n" +
        "\n" +
        "----------\n" +
        "\n" +
        "## 整体架构\n" +
        "TITAN整体由如下5部分子系统构成：\n" +
        "- **Manager**：管理控制台，负责链路、场景等相关信息管理，以及获取压测的业务指标数据与监控指标数据；\n" +
        "- **TaskService**：负责具体的压测任务编排工作，并将压测任务信息下发给空闲Agent；\n" +
        "- **Agent**：压测引擎，向ZK注册心跳、获取压测任务并执行；\n" +
        "- **Monitor**：负责收集压测引擎、目标机器的CPU、内存、磁盘IOPS等监控指标数据；\n" +
        "- **DataCollect**：负责收集压测数据并实施上报。\n" +
        "\n" +
        "![](http://dl.iteye.com/upload/picture/pic/137639/7880c09c-3490-3358-a4e4-dab919854624.jpg)\n" +
        "\n" +
        "----------\n" +
        "\n" +
        "## 文档&协作\n" +
        "- 文档地址：https://github.com/yunjiweidian/TITAN/wiki\n" +
        "- 协作开发：请在master分支上提pull request\n" +
        "- 提问题：https://github.com/yunjiweidian/TITAN/issues\n" +
        "\n" +
        "----------\n" +
        " \n" +
        " ## 联系我们\n" +
        " \n" +
        "- issues：https://github.com/yunjiweidian/TITAN/issues\n" +
        "- email：gaoxl@yunjiweidian.com\n" +
        "- QQ Group：574295338\n" +
        "- Power by云集研发中心基础架构组\n" +
        "\n" +
        "----------",
        _resId: this.$route.params.resId,
      }
    }
  }
</script>

<style scoped lang="scss">
  .repository-view {
    position: fixed;
    top: 120px;
    margin: 0 auto;
    right: 0;
    bottom: 10px;
    left: 0;
    height: auto;
    .wall-view {
      position: relative;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      background: #fff;
      max-height: 100%;
      padding-bottom: 10px;
      flex-direction: column;
    }
    .repository-header {
      padding: 10px 20px;
    }
    .repository-content {
      padding: 20px;
      overflow-y: auto;
      .readme-wrapper {
        border-radius: 5px;
        border: 1px solid #D4D4D5;
        min-height: 300px;
        .header {
          background: #f0f0f0;
          line-height: 40px;
          font-size: 16px;
          padding-left: 15px;
          border-bottom: 1px solid #D4D4D5;
        }
        .content {
          overflow: hidden;
          .markdown-content {
            padding: 2em 2em 2em !important;
          }
        }
      }
    }
  }

  .file-list {
    .file-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: none;
      border-top: 1px solid #dee2e6;
      .title {
        flex: 1;
        .ion {
          font-size: 15px;
        }
        .file-name {
          font-size: 15px;
          margin-left: 5px;
        }
      }
      .commit-msg {
        flex: 2;
        text-align: center;
        code {
          background: #f5f5f5;
          border-radius: 3px;
          padding: 3px 5px;
        }
      }
      .update {
        flex: 1;
        text-align: right;
      }
    }
  }
</style>
