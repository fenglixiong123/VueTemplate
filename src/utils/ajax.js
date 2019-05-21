/**
 * 拦截器全局限制
 * axios全局配置
 **/

import Axios from 'axios'
import store from '../store'
import router from '../router'
import {Auth} from './auth'
import {Message} from "element-ui";


//请求列表
let requestList = [];
//取消接口请求
let CancelToken = Axios.CancelToken;




/**
 * 超时设置5秒
 */
const service = Axios.create({
  timeout: 5000
});

/**
 * 请求前置拦截器
 * 检查token是否有效：
 * 无效则重新获取或者返回重新认证页面
 * 有效则每次请求为请求加上token的请求头
 */
service.interceptors.request.use(
  request =>{
    let currentUrl = request.url;
    let stopRequest = 0;
    console.log('request-------->');
    console.log("currentUrl：",currentUrl);
    request.cancelToken = new CancelToken(function executor(cancelFunction) {stopRequest = cancelFunction;});
    Auth.checkToken(stopRequest,function () {
      console.log('after get token , set login status');
      Auth.setLoginStatus();
      console.log('ready to start real request');
      request.headers['X-Token'] = `${store.state.auth.token}`;
    });
    stopRepeatRequest(currentUrl,stopRequest);
    return request;
  },
  err =>{
    return Promise.reject(err);
  }
);

/**
 * 请求后置拦截器
 * 针对响应代码跳转到相应页面
 */
service.interceptors.response.use(
  response =>{
    console.log('response------>');
    for (let i = 0; i < requestList.length; i++) {
      if(requestList[i] === response.config.url){
        setTimeout(function () {
          requestList.splice(i,1);
        },500);
        break;
      }
      return Promise.resolve(response.data);
    }
  },
  error=>{
    if(Axios.isCancel(error)){
      console.log(error);
      return Promise.reject("该请求在axios拦截器中被中断了");
    }else if(error.response){
      switch (error.response.status) {
        case 401:
          router.push('error/401');
          break;
        case 403:
          router.push('error/403');
          break;
        default:
          Message({
            message: `服务器错误！错误代码：${error.response.status}`,
            type: 'error',
            duration: 5 * 1000
          })
      }
      return Promise.reject(error.response.data);
    }
  }
);

/**
 * @name 阻止短时间内重复请求
 * @param currentUrl 当前请求地址
 * @param stopRequest 中断请求
 * @description 每个请求发起前先判断当前请求是否存在于RequestList中，
 *              如果存在则取消该次请求，如果不存在则加入RequestList中，
 *              当请求完成后500ms时，清除RequestList中对应的该请求。
 */
function stopRepeatRequest(currentUrl,stopRequest) {
  console.log("check request rate");
  for (let i=0;i<requestList.length;i++){
    if(requestList[i] === currentUrl){
      console.log("request too much，try again later！");
      stopRequest();
      Message({
        message: '请求过于频繁，请稍后再试！',
        type: 'error'
      });
      return;
    }
  }
  console.log('good request rate');
  requestList.push(currentUrl);
}

export default service;
