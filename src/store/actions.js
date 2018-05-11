import * as types from './mutation-types'
import Api from '../utils/api'
import Auth from '../utils/auth'

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
    stages.forEach((stage, sort) => {
      stage.sort = sort;
    });
    Api.updateTaskStages(stages).then(() => {
      commit(types.SET_TASK_STAGES, stages);
    });
  },
  //设置项目
  async getProjectAsync({commit}, projectId) {
    //获取Project
    let res = await Api.project(projectId);
    commit(types.SET_PROJECT, res.project);
    commit(types.SET_TASK_STAGES, res.taskStages);
    commit(types.SET_DEFAULT_FOLDER, res.folder);
    return res;
  },
  async addTaskStages({commit}, stage) {
    commit(types.ADD_TASK_STAGES, stage);
  },
  setProject({commit}, project) {
    commit(types.SET_PROJECT, project)
  },
  /**
   * 获取所有项目
   * @param commit
   * @returns {Promise<void>}
   */
  async loadAllProjects({commit}) {
    let res = await Api.projects();
    commit(types.SET_ALL_PROJECT, res)
  },
  //加载用户基本信息
  async loadLoginUser({commit}) {
    let res = await Api.me();
    if (res.code === 401) {
      commit(types.SET_LOGIN_STATUS, false);
    } else {
      commit(types.SET_USER_PROFILE, res);
      commit(types.SET_LOGIN_STATUS, true);
      commit(types.SET_ACCESS_TOKEN, Api.accessToken);
    }
  },
  async doInitLoad({commit}) {

  },
  async loadProjectPost({commit}, projectId) {
    let res = await Api.instance().get(`project/${projectId}/posts`);
    commit('SET_PROJECT_POSTS', res);
  },
  async logout({commit}) {
    commit(types.SET_ACCESS_TOKEN, null);
    commit(types.SET_LOGIN_STATUS, false);
    Auth.logout();
  }
}
