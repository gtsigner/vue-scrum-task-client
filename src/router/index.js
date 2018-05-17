import Vue from 'vue'
import Router from 'vue-router'

import auth from '../utils/auth'
import store from '../store/index'

import Main from '@/views/Main'
import TeamMain from '@/views/TeamMain'

Vue.use(Router)

const rooter = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/team/:id',
    name: 'team',
    component: TeamMain,
    meta: {
      requiresAuth: true
    }
  },
];


import portal from './portal';
import project from './project';
import user from './user';

const router = new Router({
  routes: rooter.concat(portal).concat(project).concat(user)
});

/*路由拦截*/
router.beforeEach((to, from, next) => {
  /*查看是否需要权限*/
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.isLogin()) {
      next({
        path: '/portal/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      /*初始化一些信息*/
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
});

router.beforeEach(function (to, from, next) {
  //store.commit('updateLoadingStatus', {isLoading: true})
  next()
});

router.afterEach(function (to) {
  //store.commit('updateLoadingStatus', {isLoading: false})
});

export default router
