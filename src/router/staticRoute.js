
import Login from "../page/login";
import Layout from "../page/layout";
import Statistic from "../page/statistic";

import Test from '../page/Test'

const staticRoute = [
  {
    path:'/test',
    component: Test
  },
  {
    path:'/',
    redirect: '/home/house'
  },
  {
    path:'/login',
    component: Login
  },
  {
    path:'/home',
    component: Layout,
    children:[
      {
        path:'',
        component: ()=>import('../page/home'),
      },
      {
        path:'picture',
        component: ()=>import('../page/picture')
      },
      {
        path: 'time',
        component: ()=>import('../page/time'),
      },
      {
        path: 'admin',
        component: ()=>import('../page/admin'),
      },
      {
        path:'guide',
        component: ()=>import('../page/guide')
      },
      {
        path:'setting',
        component:()=>import('../page/setting')
      },
    ]
  },
  {
    path:'/user',
    component: Layout,
    children:[
      {
        path: 'admin',
        component: ()=>import('../page/admin'),
      }
    ]
  },
  {
    path:'/static',
    component:Statistic
  },
  {
    path:'/error',
    component:()=>import('../page/error'),
    children: [
      {
        path: '401',
        component: () => import('../page/error/401')
      },
      {
        path: '403',
        component: () => import('../page/error/403')
      },
      {
        path: '404',
        component: () => import('../page/error/404')
      },
      {
        path: '500',
        component: () => import('../page/error/500')
      }
    ]
  },
  {
    path:'/*',
    redirect: '/error/404'
  }
];

export default staticRoute;
