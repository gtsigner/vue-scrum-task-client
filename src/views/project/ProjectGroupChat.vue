<template>
  <div class="project-message-view container">
    <div class="message-panel-view row">
      <div data-reactroot="" class="message-panel">
        <header class="message-panel-header">
          <div class="header-content">
            <h4>
              敏捷研发模板 - 群聊
            </h4>
          </div>
        </header>
        <section class="message-container flex-fill thin-scroll">
          <ul class="message-list list-unstyled">
            <li class="message-item">1</li>
            <li class="message-item">1</li>
            <li class="message-item">1</li>
            <li class="message-item">1</li>
            <li class="message-item">1</li>
            <li class="message-item">1</li>
            <li class="message-item">1</li>
            <li class="message-item">1</li>
            <li class="message-item">1</li>
            <li class="message-item">1</li>
            <li class="message-item">1</li>
            <li class="message-item">1</li>
            <li class="message-item">1</li>
            <li class="message-item">1</li>
            <li class="message-item">1</li>
            <li class="message-item">1</li>
            <li class="message-item">1</li>
            <li class="message-item">1</li>
            <li class="message-item">1</li>
            <li class="message-item">1</li>
            <li class="message-item">1</li>
            <li class="message-item">1</li>
            <li class="message-item">1</li>
          </ul>
          <div class="place-bottom"></div>
        </section>
        <footer class="message-panel-footer flex-static">
          <button>发送</button>
        </footer>
        <div class="message-panel-mask"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '@/utils/api'
  import Auth from '@/utils/auth'


  export default {
    name: 'Project',
    components: {},
    data() {
      return {}
    },
    methods: {
      loginByWeChat() {
        //alert("跳转微信中");
      },
      login() {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
      padding: 20px;
    }
  }


</style>
