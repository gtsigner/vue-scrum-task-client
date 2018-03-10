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
    title: 'loading'
  },//当前项目
  tags: [],
  projects: [],
  user: {},
  taskLists: [],
  taskList: {},//
  taskStages: []
};

const store = new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
});

export default store;
