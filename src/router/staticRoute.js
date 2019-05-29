
import Login from "../page/login";
import Home from "../page/home";
import House from "../page/house";
import Time from "../page/time";
import Admin from "../page/admin";
import Guide from "../page/guide";
import Setting from "../page/setting";
import Statistic from "../page/statistic";

import Error401 from '../page/error/401'
import Error403 from '../page/error/403'
import Error404 from '../page/error/404'
import Error500 from '../page/error/500'

const staticRoute = [
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
    path:'/401',
    name:'401',
    component: Error401
  },
  {
    path:'/403',
    name:'403',
    component: Error403
  },
  {
    path:'/404',
    name:'404',
    component: Error404
  },
  {
    path:'/500',
    name:'500',
    component: Error500
  },
  {
    path:'/*',
    name:'NotFound',
    redirect: '/404'
  }
];

export default staticRoute;
