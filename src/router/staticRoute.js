
import Login from "../page/login";
import Home from "../page/home";
import House from "../page/house";
import Time from "../page/time";
import Admin from "../page/admin";
import Guide from "../page/guide";
import Setting from "../page/setting";
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
    name:'login',
    component: Login
  },
  {
    path:'/home',
    name:'home',
    component:Home,
    meta:{
      auth:true
    },
    children:[
      {
        path:'house',
        name:'house',
        component:House,
        meta:{
          auth:true
        }
      },
      {
        path: 'time',
        name:'time',
        component: Time,
        meta: {
          auth: true
        }
      },
      {
        path: 'admin',
        name:'admin',
        component: Admin,
        meta: {
          auth: true
        }
      },
      {
        path:'guide',
        name:'guide',
        component:Guide
      },
      {
        path:'setting',
        name:'setting',
        component:Setting
      },
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
