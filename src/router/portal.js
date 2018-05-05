import Login from '@/views/portal/Login'
import Register from '@/views/portal/Register'

export default [
  {
    path: '/portal/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/portal/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresAuth: false
    }
  }
];
