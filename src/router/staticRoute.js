
import Login from "../page/login";
import Home from "../page/home";
import House from "../page/house";
import Time from "../page/time";
import Admin from "../page/admin";
import Guide from "../page/guide";
import Setting from "../page/setting";
import Statistic from "../page/statistic";

const staticRoute = [
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
    component:Home,
    meta:{
      auth:true
    },
    children:[
      {
        path:'house',
        component:House,
        meta:{
          auth:true
        }
      },
      {
        path: 'time',
        component: Time,
        meta: {
          auth: true
        }
      },
      {
        path: 'admin',
        component: Admin,
        meta: {
          auth: true
        }
      },
      {
        path:'guide',
        component:Guide
      },
      {
        path:'setting',
        component:Setting
      },
    ]
  },
  {
    path:'/static',
    component:Statistic
  },
  {
    path:'*',
    redirect: '/404'
  }
];

export default staticRoute;
