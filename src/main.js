// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import Notifications from 'vue-notification'
import BootstrapVue from 'bootstrap-vue'
import VueSocket from './plugins/vue-socket'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'
import './assets/scss/app.scss'
import Api from './utils/api'

require('es6-promise').polyfill()


Vue.use(BootstrapVue);
Vue.use(Notifications);
Vue.use(ElementUI);

//Socket
Vue.use(VueSocket, "ws://team.oeynet.com", {
  reconnection: true
});
Vue.prototype.$api = Api;

import router from './router/index'
import store from './store/index';


/*点击延迟  手机版才需要，PC完全不需要*/
// const FastClick = require('fastclick')
// FastClick.attach(document.body)

Vue.config.productionTip = false


/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router, store,
  template: '<App/>',
  components: {App}
});

document.body.ondrop = function (event) {
  event.preventDefault();
  event.stopPropagation();
}
