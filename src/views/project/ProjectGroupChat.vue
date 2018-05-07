<template>
  <div class="project-message-view container">
    <div class="message-panel-view row">
      <div data-reactroot="" class="message-panel">
        <header class="message-panel-header">
          <div class="header-content">
            <h4>
              {{project.title}} - 群聊
              <el-popover
                placement="bottom"
                width="200"
                trigger="click"
                content="清空消息">
                <span slot="reference" class="float-right toggle-more">
                  <i class="ion ion-ios-more"></i>
                </span>
              </el-popover>
            </h4>
          </div>
        </header>
        <section style="height: 0" id="msgContainer" class="message-container flex-fill thin-scroll">
          <ul class="message-list list-unstyled">
            <msg-item :key="i" v-for="(m,i) in historyMessages" :msg="m"></msg-item>
          </ul>
        </section>
        <footer class="message-panel-footer flex-static">
          <el-input v-model="newMessage.content" type="textarea"></el-input>
          <div class="text-right">
            <el-button @click="send" type="primary" class="submit-btn">发送</el-button>
          </div>
        </footer>
        <div class="message-panel-mask"></div>
      </div>
    </div>
  </div>
</template>

<script>

  import MsgItem from '@/components/Chat/MsgItem'
  import * as EventTypes from '../../utils/socket-event-types';

  export default {
    name: 'Project',
    components: {MsgItem},
    data() {
      return {
        //历史消息
        historyMessages: [],
        newMessage: {content: ''},
        search: {
          p: 1,
        }
      }
    },
    computed: {
      project() {
        return this.$store.state.project;
      }
    },
    methods: {

      //获取历史记录
      async chatHistory() {
        let query = this.$api.bQ({_projectId: this.project._id});
        let res = await this.$api.instance().get('/chat/hgm?' + query);
        this.historyMessages = res.concat(this.historyMessages);
        this.scBottom();
      },
      async send() {
        this.$socket.emit('chat.message', {
          action: 'chat.room',
          payload: {
            _projectId: this.project._id,
            message: this.newMessage.content,
            to: this.project._id
          }
        });
        this.newMessage.content = '';
      },
      async chooseGroup() {
        this.$socket.emit('chat.room', {
          action: 'change.room',
          payload: {
            projectId: this.project._id
          }
        });
      },
      scBottom() {
        this.$nextTick(() => {
          const ct = this.$el.querySelector('#msgContainer');
          ct.scrollTop = ct.scrollHeight;
        });
      }
    },
    async created() {
      await this.chatHistory();
      await this.chooseGroup();
    },
    socket: {
      events: {
        /**
         * 收到信息
         * @param chat
         */
        [EventTypes.CHAT_MESSAGE](msg) {
          if (msg.data.action === 'chat.message') {
            this.historyMessages.push({
              ...msg.data.payload
            });
            this.scBottom();
          }
        },
      }
    },
    activated() {
      this.scBottom();
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .message-list {
    padding: 10px;
  }

  .toggle-more {
    cursor: pointer;
    line-height: 65px;
    .ion {
      font-size: 30px;
    }
  }

  .project-message-view {
    position: fixed;
    top: 120px;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .place-bottom {
    height: 40px;
  }

  .flex-static {
    -webkit-flex-shrink: 0;
    flex-shrink: 0;
  }

  .flex-fill {
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
  }

  .message-panel-view {
    background-color: #fff;
    border-radius: 4px;
    z-index: 50;
    width: 100%;
    max-width: 100%;
    position: relative;
    height: 100%;
    .message-panel {
      flex-direction: column;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      display: flex;
      min-height: 0;
      position: relative;
    }

    .message-panel-header {
      flex: none;
      height: 60px;
      h4 {
        line-height: 60px;
        font-size: 20px;
        margin: 0;
        padding: 0 10px;
      }
      .header-content {
        border-bottom: 1px solid #dddddd;
      }
    }
    .message-container {
      height: auto;
      position: relative;
      will-change: transform;
      overflow: auto;
      display: block;
    }
    .message-panel-footer {
      z-index: 9;
      overflow: visible;
      background-color: #e5e5e5;
      border-top: 1px solid #d9d9d9;
      padding: 8px;
    }
    .submit-btn {
      margin-top: 5px;
    }
  }


</style>
