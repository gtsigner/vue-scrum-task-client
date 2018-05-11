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
  projects: [],//所有项目
  project: {
    _id: '',
    title: 'loading'
  },//当前项目
  tags: [],
  posts: [],
  user: {},
  taskLists: [],
  taskList: {},//
  taskStages: [],
  appLoading: true,
  loginStatus: false,
  accessToken: '',
  folder: {_id: '', title: '默认文件夹'},
};

const store = new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
});

export default store;
