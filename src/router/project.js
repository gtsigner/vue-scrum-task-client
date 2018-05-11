import Project from '@/views/project/Project'

//Demand
import ProjectDemand from '@/views/project/ProjectDemand'
import ProjectDefect from '@/views/project/ProjectDefect'
import ProjectView from '@/views/project/ProjectView'
import ProjectNormal from '@/views/project/ProjectNormal'
import ProjectGroupChat from '@/views/project/ProjectGroupChat'

//分享
import ProjectPosts from '@/views/project/ProjectPosts'
//文件夹
import ProjectCollection from '@/views/project/ProjectCollection'
import ProjectCollectionView from '@/views/project/apps/ProjectCollectionView'
//成员
import ProjectMember from '@/views/project/ProjectMember'
//可视化
import ProjectAnalytics from '@/views/project/ProjectAnalytics'
//分享子页面
import ProjectPostView from '@/views/project/apps/ProjectPostView'
//源码
import ProjectSourceView from '@/views/project/ProjectSource'
import SourceRepositoryView from '@/views/project/SourceRepositoryView'
import SourceRootView from '@/views/project/SourceRootView'

const ProjectAppsView = [
  {
    name: 'ProjectPosts',
    path: 'posts',
    component: ProjectPosts,//分享
    //子分享
    children: [{
      name: 'ProjectPostView',
      path: 'post/:postId',
      component: ProjectPostView,//分享
    }]
  },
  {
    name: 'ProjectCollection',
    path: 'collections',
    component: ProjectCollection,//文件
    children: [
      {
        name: 'project-collection-view',
        path: ':_collectionId',
        component: ProjectCollectionView,//分享
      }
    ]
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
        component: ProjectView,//项目总览
        redirect: {
          name: 'ProjectAnalytics'
        }
      },
      /**
       * 项目代码库
       */
      {
        path: 'source',
        component: ProjectSourceView,
        children: [
          {
            name: 'project-source-root',
            path: '',
            component: SourceRootView,
          },
          {
            name: 'source-repository',
            path: 'repository/:resId',
            component: SourceRepositoryView
          }
        ]
      },
      /*项目类型*/
      {
        name: 'ProjectNormal',
        path: 'task/normal/:_taskListId',
        component: ProjectNormal//普通项目模板
      },
      {
        name: 'ProjectSmarty',
        path: 'task/smarty/:_taskGroupId',
        component: ProjectNormal,
        children: []
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
