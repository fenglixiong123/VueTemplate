/**
 * 拦截器全局限制
 * axios全局配置
 **/

import Axios from 'axios'
import router from '../router'
import {getToken} from './auth'
import {alertErrorMsg,notifyError} from './message'

/**
 * 超时设置5秒
 */
const service = Axios.create({
  timeout: 5000
});

service.interceptors.request.use(

  config => {
    console.log("【service request】 : ",config.url);
    config.headers['X-Token'] = getToken()
    return config
  },
  error => {
    console.log("service reject",error);
    return Promise.reject(error)
  }

);


service.interceptors.response.use(

  response => {
    const res = response.data;
    console.log("【service response】 : ",res);
    switch (res.code) {
      case 200:
        return res;
      case 300:
        notifyError('☹=>'+res.data);
        break;
      case 400:
        notifyError('☹=>'+res.data);
        break;
      //服务器内部错误
      case 500:
        notifyError('☹=>'+res.data);
        break;
      //尚未登录
      case 4001:
        notifyError('☹=>'+res.data);
        //将跳转的路由path作为参数，登录成功后跳转到该路由
        router.push({
          path: '/login',
          query: { redirect: router.currentRoute.fullPath }
        });
        break;
      //用户被禁用
      case 4002:
        notifyError('☹=>'+res.data);
        break;
      //暂无权限
      case 4003:
        notifyError('☹=>'+res.data);
        break;
      //用户名密码错误
      case 4004:
        notifyError('☹=>'+res.data);
        break;
    }
    return Promise.reject(res)
  },
  err => {
    console.log("【service response】请求发生了错误 : ",err);
    alertErrorMsg(`☹=>错误代码：${err.response.status},未找到可用的后台服务！`);
    return Promise.reject(err)
  }
);

export default service;
