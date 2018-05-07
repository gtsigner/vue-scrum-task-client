/**
 * Created by zhaojunlike on 11/6/2017.
 */
import Vuex from 'vuex';
import Vue from 'vue'

Vue.use(Vuex)
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

let state = {
  project: {
    _id: '',
    title: 'loading'
  },//当前项目
  tags: [],
  projects: [],
  posts: [],
  user: {},
  taskLists: [],
  taskList: {},//
  taskStages: [],
  appLoading: true,
  loginStatus: false,
  accessToken: ''
};

const store = new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
});

export default store;
