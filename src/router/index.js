import Vue from 'vue'
import Router from 'vue-router'
import staticRoute from './staticRoute'
import {getToken} from '../utils/auth'
import store from '../store'

Vue.use(Router);

const router = new Router({
  mode:'history',
  linkActiveClass:'active',
  routes: staticRoute
});

/**
 * 钩子函数
 * 全局钩子来拦截导航
 */
router.beforeEach((to,from,next)=>{
  let token = getToken();
  console.log(`======>Route will go to : ${to.fullPath},token:${token}`);
  if(to.meta.auth){
    if(token && token!=='undefined'){
      console.log("token有效");
      next();
    }else {
      console.log("token无效");
      store.dispatch('user/resetToken');
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }else{
    next();
  }
});

export default router;
