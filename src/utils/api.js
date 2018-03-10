import axios from 'axios'
import auth from './auth'
import router from '@/router/index'

const configs = {
  baseURL: 'http://team.oeyteam.com/api/',
  version: 'v1',
}

function buildQueryString(obj) {
  var str = '';
  var keys = Object.keys(obj);
  var len = keys.length;
  keys.forEach(function (k, index) {
    str += (k + '=' + obj[k]);
    if (index !== len - 1) {
      str += '&';
    }
  });
  return str;
}

const instance = axios.create({
  baseURL: configs.baseURL,
  timeout: 5000,
  //withCredentials: true,
  /*Http Header*/
  headers: {}
});

//加入Token在Request拦截器中
instance.interceptors.request.use((config) => {
  config.headers['Authorization'] = 'Bearer ' + auth.getToken();
  return config;
}, (error) => {
  return Promise.reject(error);
});
// http response 拦截器
instance.interceptors.response.use((response) => {
    return response.data;
  }, (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          console.warn('Token失效');
          auth.logout();
          router.replace({name: 'Login'});
          break;
        case 500:
          console.log("服务器异常");
          break;
      }
    }
    console.log(error.message);
    //
    if (error.message.indexOf('Network Error') !== -1) {
      alert('服务链接失败');
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  }
);

const API_URLS = {
  portal: {
    login: 'auth/login'
  },
  projects: {
    index: 'projects'
  },
  tasks: {
    index: 'tasks',
    move: 'tasks/move'
  },
  taskGroups: {
    index: 'task_groups',
  },
  taskList: {
    index: 'task_lists',
    stages: 'task_stages',
  },
  user: {
    profile: 'user/profile',
  },
  //分享
  posts: {
    index: 'posts'
  }
};

export default {
  ResCodes: {
    'SUCCESS': 1001,
    'FAIL': 1004,
    'ERROR': 1003,
  },
  ApiUrls: API_URLS,
  /*账号类*/
  login(user) {
    return instance.post(API_URLS.portal.login, user)
  },
  projects() {
    return instance.get(API_URLS.projects.index);
  },
  project(where) {
    return instance.get(API_URLS.projects.index + '?' + buildQueryString(where));
  },
  //项目下的Posts
  projectPosts(projectId, params) {
    return instance.get(
      `${API_URLS.projects.index}/${projectId}/posts?` + buildQueryString(params)
    );
  },
  createProject(project) {
    return instance.post(API_URLS.projects.index, project);
  },
  updateProject(projectId, project) {
    return instance.put(API_URLS.projects.index + '/' + projectId, project);

  },
  /*#region Task*/

  /**
   * @param task
   * @returns {AxiosPromise}
   */
  createTask(task) {
    return instance.post(API_URLS.tasks.index, task);
  },

  /**
   *
   * @param query Array
   * {project:'',stage_id:''}
   * @returns {AxiosPromise}
   */
  tasks(query) {
    return instance.get(API_URLS.tasks.index + '?' + buildQueryString(query));
  },
  updateTask(taskId, task) {
    return instance.put(API_URLS.tasks.index + '/' + taskId, task);
  },
  moveTask(taskId, params) {
    return instance.put(API_URLS.tasks.move + '/' + taskId, params);
  },
  /**/
  taskGroups(query) {
    return instance.get(API_URLS.taskGroups.index + '?' + buildQueryString(query));
  },

  /*#region Task List*/
  taskList(query) {
    return instance.get(API_URLS.taskList.index + '?' + buildQueryString(query));
  },
  updateTaskList(id, taskList) {
    return instance.patch(API_URLS.taskList.index + '/' + id, taskList);
  },

  //#region TaskList

  /*#region task stage*/
  taskStages(query) {
    return instance.get(API_URLS.taskList.stages + '?' + buildQueryString(query));
  },
  createTaskStage(stage) {
    return instance.post(API_URLS.taskList.stages, stage);
  },
  updateTaskStages() {

  },
  /*#endregion*/
  profile() {
    return instance.get(API_URLS.user.profile)
  },
  /**
   * Posts
   * @param params
   * @returns {AxiosPromise}
   */
  posts(params) {
    return instance.get(API_URLS.posts.index + '?' + buildQueryString(params));
  },
  post(_id) {
    return instance.get(API_URLS.posts.index + '/' + _id);
  },
  createPost(post) {
    return instance.post(API_URLS.posts.index, post);
  }
}
