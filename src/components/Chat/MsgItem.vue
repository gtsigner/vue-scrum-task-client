<template>
  <div class="msg-item">
    <li class="message-item msg-left" v-if="!isSelf">
      <div class="msg-box">
        <a href="#">
          <img class="avatar" :src="msg.sender.avatar" alt="">
        </a>
        <p class="content">{{msg.message}}</p>
      </div>
      <p class="date">{{msg.sender.username}}. {{msg.createdAt|formatDay}}</p>
    </li>
    <!--自己发送的消息-->
    <li class="message-item msg-right" v-if="isSelf">
      <span class="content">{{msg.message}}</span>
      <p class="date">{{msg.sender.username}}. {{msg.createdAt|formatDay}}</p>
    </li>
  </div>
</template>

<script>
  import Dayjs from 'dayjs'

  export default {
    name: "MsgItem",
    props: {
      msg: {
        _senderId: '',
        sender: {
          avatar: '',
          username: '',
          nickname: ''
        },
        createdAt: '',
        message: '',
      }
    },
    computed: {
      isSelf() {
        return this.$store.state.user._id === this.msg._senderId;
      }
    },
    filters: {
      formatDay(date) {
        return Dayjs(date).format('MM月DD日 HH:mm:ss');
      },
    }
  }
</script>

<style scoped lang="scss">
  .message-item {
    margin-bottom: 10px;
    width: 100%;
    .avatar {
      height: 45px;
      width: 45px;
      border-radius: 50%;
    }
    &.msg-left {
      text-align: left;
      .avatar {
        float: left;
      }
      .content {
        margin-left: 5px;
      }
    }
    &.msg-right {
      text-align: right;
      .date {
        text-align: right;
      }
    }
    .content {
      min-height: 50px;
      display: inline-block;
      background: #e5f6fb;
      padding: 10px 15px;
      border-radius: 8px;
      font-size: 14px;
      margin-bottom: 0;
    }
    .date {
      margin-top: 5px;
      font-size: 12px;
    }
  }
</style>
