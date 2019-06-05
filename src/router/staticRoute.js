
import Login from "../page/login";
import Layout from "../page/layout";

import Test from '../page/Test'

const staticRoute = [
  {
    path:'/',
    redirect: '/home'
  },
  {
    path:'/login',
    component: Login
  },
  {
    path:'/home',
    title: '主页',
    component: Layout,
    meta:{
      title: '主页',
    },
    children:[
      {
        path:'',

        component: ()=>import('../page/home'),
      },
      {
        path:'picture',
        meta:{
          title: '相册',
        },
        component: ()=>import('../page/picture')
      },
      {
        path: 'time',
        meta:{
          title: '时光',
        },
        component: ()=>import('../page/time'),
      },
      {
        path: 'admin',
        meta:{
          title: '用户',
        },
        component: ()=>import('../page/admin'),
      },
      {
        path:'guide',
        meta:{
          title: '指南',
        },
        component: ()=>import('../page/guide')
      },
      {
        path:'setting',
        meta:{
          title: '设置',
        },
        component:()=>import('../page/setting')
      },
    ]
  },
  {
    path:'/user',
    component: Layout,
    meta:{
      title:'用户管理'
    },
    children:[
      {
        path: 'admin',
        meta:{
          title:'管理员用户'
        },
        component: ()=>import('../page/admin'),
      }
    ]
  },
  {
    path:'/role',
    component: Layout,
    meta:{
      title:'角色管理'
    },
    children:[
      {
        path: 'admin',
        meta:{
          title:'管理员角色'
        },
        component: ()=>import('../page/role/admin'),
      }
    ]
  },
  {
    path:'/menu',
    component: Layout,
    meta:{
      title:'菜单管理'
    },
    children:[
      {
        path: 'admin',
        meta:{
          title:'管理员菜单'
        },
        component: ()=>import('../page/menu/admin'),
      }
    ]
  },
  {
    path:'/power',
    component: Layout,
    meta:{
      title:'权限管理'
    },
    children:[
      {
        path: 'admin',
        meta:{
          title:'管理员权限'
        },
        component: ()=>import('../page/power/admin'),
      }
    ]
  },
  {
    path:'/test',
    component: Layout,
    children:[
      {
        path:'',
        component: Test
      }
    ]
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
