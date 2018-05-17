<template>
  <div class="pg-login">
    <div class="container">
      <h3 class="text-center app-logo">
        OeyTeam - 注册
      </h3>
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
                              placeholder="手机号 / 用户名 / 邮箱">
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
              <b-form-group id="repassword"
                            label-for="repassword">
                <b-form-input size="lg" id="repassword"
                              classs="input-lg"
                              type="password"
                              v-model="user.repassword"
                              required
                              placeholder="重复密码">
                </b-form-input>
              </b-form-group>
              <div class="text-center">
                <b-button
                  v-if="!isRequest"
                  size="lg"
                  :block="true"
                  @click="login"
                  type="button" variant="primary">
                  <span>注 册</span>
                </b-button>
                <b-button
                  v-if="isRequest"
                  class="disabled"
                  size="lg"
                  :block="true"
                  @click="login"
                  type="button" variant="primary">
                  <span>注册中...</span>
                </b-button>
              </div>
            </b-form>
          </div>
          <div class="partner-login-main">
            <p class="link-reg-new">
              <span class="color-gary">已经有账号了？</span>
              <router-link to="/portal/login">登录账号</router-link>
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
          type: 'REGISTER',
          username: '',
          password: '',
          repassword: '',
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
            window.location.href = redirect;
          } else {
            return this.$message.error(res.message);
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
