<template>
  <div class="pg-login">
    <div class="container">
      <h1 class="text-center app-logo">
        OeyTeam - 登录
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
                              placeholder="手机号">
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
                <b-button
                  v-if="!isRequest"
                  size="lg"
                  :block="true"
                  @click="login"
                  type="button" variant="primary">
                  <span>登 录</span>
                </b-button>
                <b-button
                  v-if="isRequest"
                  class="disabled"
                  size="lg"
                  :block="true"
                  @click="login"
                  type="button" variant="primary">
                  <span>登录中...</span>
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
              <span class="color-gary">还没有帐号？</span>
              <router-link to="/portal/register">注册新帐号</router-link>
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
        isRequest: false,
        user: {
          type: 'LOGIN_PASSWORD',
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
      async login() {
        try {
          this.isRequest = true;
          let res = await Api.login(this.user);
          if (res.code === Api.ResCodes.SUCCESS) {
            this.$store.commit('SET_LOGIN_STATUS', true);
            Auth.setToken(res.access_token);
            //跳转
            let redirect = this.$route.query.redirect;
            redirect = redirect === undefined ? '/' : redirect;
            this.$router.replace({path: redirect});
          } else {
            this.$notify({
              type: 'error',
              group: 'foo',
              title: '登录失败',
              text: res.message
            });
          }
        } catch (e) {

        } finally {
          this.isRequest = false;
        }
      }
    },
    created() {
      Auth.logout();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .app-logo {
    margin-top: 10%;
    font-size: 35px;
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
