import Project from '@/views/project/Project'

//Demand
import ProjectDemand from '@/views/project/ProjectDemand'
import ProjectDefect from '@/views/project/ProjectDefect'
import ProjectView from '@/views/project/ProjectView'
import ProjectNormal from '@/views/project/ProjectNormal'
import ProjectGroupChat from '@/views/project/ProjectGroupChat'


import ProjectPosts from '@/views/project/ProjectPosts'

const ProjectAppsView = [
  {
    name: 'ProjectPosts',
    path: 'posts',
    component: ProjectPosts//分享
  }
];

export default [
  {
    path: '/project/:project_id',
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
      /*项目类型*/
      {
        name: 'ProjectNormal',
        path: 'task/normal/:task_list_id',
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
