// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import VueCookie from 'vue-cookie'


import BootstrapVue from 'bootstrap-vue'

Vue.use(VueCookie)
Vue.use(BootstrapVue)


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'
import './assets/scss/app.scss'


import router from './router/index'
import store from './store/index';

/*点击延迟*/
require('es6-promise').polyfill()

const FastClick = require('fastclick')
FastClick.attach(document.body)


Vue.config.productionTip = false


/* eslint-disable no-new */


new Vue({
  el: '#app',
  router, store,
  template: '<App/>',
  components: {App}
});

document.body.ondrop = function (event) {
  event.preventDefault();
  event.stopPropagation();
}
