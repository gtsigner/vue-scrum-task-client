import Project from '@/views/project/Project'

//Demand
import ProjectDemand from '@/views/project/ProjectDemand'
import ProjectDefect from '@/views/project/ProjectDefect'
import ProjectView from '@/views/project/ProjectView'
import ProjectNormal from '@/views/project/ProjectNormal'
import ProjectGroupChat from '@/views/project/ProjectGroupChat'


import ProjectPosts from '@/views/project/ProjectPosts'
import ProjectCollection from '@/views/project/ProjectCollection'
import ProjectMember from '@/views/project/ProjectMember'
import ProjectAnalytics from '@/views/project/ProjectAnalytics'


import ProjectPostView from '@/views/project/apps/ProjectPostView'

const ProjectAppsView = [
  {
    name: 'ProjectPosts',
    path: 'posts',
    component: ProjectPosts,//分享
    children: [{
      name: 'ProjectPostView',
      path: 'post/:postId',
      component: ProjectPostView,//分享
    }]
  },
  {
    name: 'ProjectCollection',
    path: 'collections',
    component: ProjectCollection//文件
  },
  {
    name: 'ProjectMember',
    path: 'members',
    component: ProjectMember//分享
  },
  {
    name: 'ProjectAnalytics',
    path: 'analytics',
    component: ProjectAnalytics//分享
  },
];

export default [
  {
    path: '/project/:_projectId',
    component: Project,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        name: 'ProjectView',
        path: '',
        component: ProjectView//项目总览
      },
      {
        name: 'ProjectSource',
        path: 'source',
        component: ProjectView//项目总览
      },
      /*项目类型*/
      {
        name: 'ProjectNormal',
        path: 'task/normal/:_taskListId',
        component: ProjectNormal//普通项目模板
      },
      /**/
      {
        name: 'ProjectDemand',
        path: 'demand',
        component: ProjectDemand//敏捷开发需求
      },
      {
        name: 'ProjectDefect',
        path: 'defect',
        component: ProjectDefect//敏捷开发缺陷
      },
      {
        name: 'ProjectIteration',
        path: 'iteration',
        component: ProjectDefect//敏捷开发迭代
      },
      {
        name: 'ProjectGroupChat',
        path: 'group_chat',
        component: ProjectGroupChat//群聊
      },
      ...ProjectAppsView
    ]

  }
];


//需求
