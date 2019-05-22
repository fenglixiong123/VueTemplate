/**
 * 拦截器全局限制
 * axios全局配置
 **/

import Axios from 'axios'
import store from '../store'
import router from '../router'
import Auth from './auth'
import {addRequest,removeRequest} from './repeat'
import {alertErrorMessage} from './message'


//取消接口请求
let CancelToken = Axios.CancelToken;
const writeList = ['/getToken','https://api.github.com/users'];

function checkWrite(url) {
  for (let i = 0; i < writeList.length; i++) {
    if(writeList.includes(url)){
      console.log("白名单检验通过：",url);
      return true;
    }
  }
  return false;
}

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
  //在发送请求前做些什么
  config =>{
    let currentUrl = config.url;
    let stopRequest = 0;
    let repeatFlag = true;
    let isWrite = checkWrite(currentUrl);
    console.log('【request】-------->start',Auth.tokenLock,currentUrl);
    //这里设置一些排除不拦截的请求
    config.cancelToken = new CancelToken(function executor(cancelFunction) {stopRequest = cancelFunction;});
    if(!isWrite) {
      repeatFlag = Auth.checkToken(stopRequest, function () {
        console.log('after get token , set login status');
        Auth.setLoginStatus();
        console.log('ready to start real request');
        config.headers['X-Token'] = `${store.state.auth.token}`;
      });
    }
    if(repeatFlag) {
      addRequest(currentUrl, stopRequest);
    }
    console.log('request-------->done',Auth.tokenLock,currentUrl);
    return config;
  },
  //对请求错误做些什么
  error =>{
    console.log(`【request error】 error--------->请求错误！`,Auth.tokenLock);
    return Promise.reject(error);
  }
);

/**
 * 请求后置拦截器
 * 针对响应代码跳转到相应页面
 */
service.interceptors.response.use(
  //对响应数据做点什么
  response =>{
    let currentUrl = response.config.url;
    console.log(`%c response success------>${currentUrl}`,'background:blue');
    removeRequest(currentUrl);
    return Promise.resolve(response.data);
  },
  //对响应错误做点什么
  error=>{
    let currentUrl = error.response.config.url;
    console.log(`%c response error------>${currentUrl}`,'background:blue');
    removeRequest(currentUrl);
    if(Axios.isCancel(error)){
      console.log(error);
      return Promise.reject("该请求在axios拦截器中被中断了");
    }else if(error.response){
      alertErrorMessage(error.response.status);
      switch (error.response.status) {
        case 401:
          router.push('error/401');
          break;
        case 403:
          router.push('error/403');
          break;
        case 404:
          router.push('error/404');
          break;
        default:
          break;
      }
      return Promise.reject(error.response.data);
    }
  }
);


export default service;
