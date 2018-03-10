import * as types from './mutation-types'

export default {
  //获取后设置VuexTaskStages
  [types.SET_TASK_STAGES](state, res) {
    state.taskStages = [
      ...res
    ];
  },
  //设置项目Vuex
  [types.SET_PROJECT](state, project) {
    state.project = project;
  },
  //添加TaskStages
  [types.ADD_TASK_STAGES](state, stage) {
    state.taskStages.push(stage);
  }
}
