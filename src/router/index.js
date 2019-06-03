import Vue from 'vue'
import Router from 'vue-router'
import staticRoute from './staticRoute'
import {isWrite} from '../utils/write'
import {alertErrorMsg} from '../utils/message'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getMenuList} from '../utils/menu'

Vue.use(Router);

const router = new Router({
  mode:'history',
  linkActiveClass:'active',
  routes: staticRoute
});


let menuList = store.getters['menu/menuList'];

/**
 * 钩子函数
 * 全局钩子来拦截导航
 */
router.beforeEach((to,from,next)=>{
  NProgress.start();
  let token = store.getters.token;
  console.log(`======>Route will go to : ${to.fullPath},token:${token}`);

  //如果是白名单
  if(isWrite(to.path)){
    next();
    return;
  }

  //如果是登录状态
  if(token){
    console.log("token有效");
    let isPowered = false;
    console.log("开始权限检测");

    //这里开始判断权限
    if(menuList){
      menuList.forEach(v=>{
        if(v.path === to.path){
          isPowered = true;
        }
      });
    }else {
      alertErrorMsg('请登录后再访问');
      next({
        path: '/login',
        query: { redirect: to.path }
      })
    }
    if(isPowered){
      console.log('本页面检测到拥有权限');
      next();
    }else {
      alertErrorMsg("您访问的页面暂时没有权限！");
      console.log('没有权限！');
      next('/401');
    }
  }else {

    //这边是需要登录的
    alertErrorMsg('请登录后再访问');
    console.log("token无效");
    store.dispatch('auth/resetToken');
    next({
      path: '/login',
      query: { redirect: to.path }
    })

  }

});

router.afterEach(() => {
  NProgress.done()
});

export default router;
