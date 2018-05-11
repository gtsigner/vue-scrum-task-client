const MeView = () => import('@/views/user/me');
const InfoView = () => import('@/views/user/my/info');
const AccountView = () => import('@/views/user/my/account');
const SecurityView = () => import('@/views/user/my/security');

export default [
  {
    //个人信息
    path: '/user/my',
    name: 'user-my',
    component: MeView,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        //个人信息
        path: 'info',
        name: 'user-my-info',
        component: InfoView,
      },
      {
        path: 'account',
        name: 'user-my-account',
        component: AccountView,
      },
      {
        path: 'security',
        name: 'user-my-security',
        component: SecurityView,
      },
      {
        path: 'apps',
        name: 'user-my-apps',
        component: MeView,
      },
      {
        path: 'email',
        name: 'user-my-email',
        component: MeView,
      },
      {
        path: 'third',
        name: 'user-my-third',
        component: MeView,
      },
      {
        path: 'payment',
        name: 'user-my-payment',
        component: MeView,
      },
    ]
  },
];
