import * as types from './mutation-types'
import Api from '../utils/api'

export default {
  getUserProfile() {

  },
  async getTaskStagesAsync({commit, state}, search) {
    return Api.taskStages(search)
      .then((res) => {
        commit(types.SET_TASK_STAGES, res);
      });
  },
  async setTaskStages({commit, state}, stages) {
    //先存库,然后更新vuex
    let stageIds = [];
    stages.forEach((stage) => {
      stageIds.push(stage._id)
    });
    let taskListId = stages[0]._task_list_id;
    Api.updateTaskList(taskListId, {stage_ids: stageIds}).then((res) => {

    });
    commit(types.SET_TASK_STAGES, stages);
  },
  //设置项目
  async getProjectAsync({commit}, projectId) {
    return Api.project({'id': projectId})
      .then((res) => {
        if (res.project !== null) {
          //将Project 提交到Vuex
          commit(types.SET_PROJECT, res.project)
        }
      });
  },
  async addTaskStages({commit}, stage) {
    commit(types.ADD_TASK_STAGES, stage);
  },
  setProject({commit}, project) {
    commit(types.SET_PROJECT, project)
  }
}
