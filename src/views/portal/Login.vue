<template>
  <div class="pg-login">
    <div class="container">
      <h1 class="text-center app-logo">
        OeyTeam
      </h1>
      <div class="row login-form">
        <div>
          <div class="login-form-main">
            <b-form>
              <b-form-group id="username"
                            label-for="username">
                <b-form-input size="lg" id="username"
                              type="text"
                              v-model="user.username"
                              required
                              placeholder="用户名 / 邮箱地址">
                </b-form-input>
              </b-form-group>
              <b-form-group id="password"
                            label-for="password">
                <b-form-input size="lg" id="password"
                              classs="input-lg"
                              type="password"
                              v-model="user.password"
                              required
                              placeholder="密码">
                </b-form-input>
              </b-form-group>
              <div class="text-center">
                <b-button size="lg"
                          :block="true"
                          @click="login"
                          type="button" variant="primary">
                  <span>登 录</span>
                </b-button>
              </div>
            </b-form>
          </div>
          <div class="partner-login-main">
            <b-button size='lg'
                      class="wechat-login-button"
                      :block="true"
                      @click="loginByWeChat"
                      type="button" variant="success">
              <span>使用 微信 登录</span>
              <i></i>
            </b-button>
            <p class="link-reg-new">
              <span class="color-gary">还没有帐号？</span> <a href="">注册新帐号</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '@/utils/api'
  import Auth from '@/utils/auth'


  export default {
    name: 'hello',
    components: {},
    data() {
      return {
        user: {
          username: '',
          password: '',
          email: '',
          pass_err_count: 0
        },
      }
    },
    methods: {
      loginByWeChat() {
        Auth.logout();
      },
      login() {
        Api.login(this.user).then(res => {
          if (res.status_code === Api.ResCodes.SUCCESS) {
            Auth.setToken(res.data.access_token, res.data.expires_in - 60);
            //跳转
            let redirect = this.$route.query.redirect;
            redirect = redirect === undefined ? '/' : redirect;
            this.$router.replace({path: redirect});
          } else {
            alert('登陆失败');
          }
        })
      }
    },
    created() {
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .app-logo {
    margin-top: 10%;
    font-size: 45px;
    margin-bottom: 40px;
  }

  .login-form-main {
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }

  .login-form {
    margin: 0 auto;
    width: 100%;
    max-width: 330px;
    padding: 15px;
    .form-control {
      box-sizing: border-box;
      position: relative;
      height: auto;
      width: 330px;
    }
  }

  .partner-login-main {
    .wechat-login-button {
      background: #fff;
      color: $color-success;
      &:focus, &:active {
        background: #fff;
        color: $color-success;
      }
    }
    .link-reg-new {
      text-align: center;
      font-size: .9em;
      margin-top: .8rem;
    }
    .color-gary {
      color: #A6A6A6;
    }
  }
</style>
