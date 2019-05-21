/**
 * 拦截器全局限制
 * axios全局配置
 **/

import Axios from 'axios'
import store from '../store'
import router from '../router'
import {Auth,AuthKey} from './auth'
import {Message} from "element-ui";

//token获取锁定
let tokenLock = false;
//请求列表
let requestList = [];
//取消接口请求
let CancelToken = Axios.CancelToken;

/**
 * @name Token校验
 * @param cancel 中断函数
 * @param callback 回调
 * @description 校验Token是否过期，如果Token过期则根据配置采用不同方法获取新Token
 * 自动获取Token：过期时自动调用获取Token接口。注意：当有任一请求在获取Token时，其余请求将顺延，直至新Token获取完毕
 * 跳转授权Token：过期时中断当前所有请求并跳转到对应页面获取Token。注意：跳转页面授权最佳实现应在授权页面点击触发
 */
function checkToken(cancel,callback) {
  if(!Auth.hasToken()){
    //自动获取token
    if(Auth.tokenTimeoutMethod === AuthKey.tokenTimeoutNew){
      //如果当前有请求token
      if(tokenLock){
        setTimeout(function () {
          checkToken(cancel,callback)
        },500);
      }else {
        tokenLock = true;
        store.dispatch("auth/getNewToken").then(()=>{
          console.log("已获取新的token");
          callback();
          tokenLock = false;
        }).catch((err)=>{
          console.log(err)
        })
      }
    }
    if(Auth.tokenTimeoutMethod === AuthKey.tokenTimeoutJump && Auth.isLogin()){
      if(router.currentRoute.path!=='/auth'){
        //无法保证一定会中断所有请求
        cancel();
        router.push('/auth');
      }
    }
  }else {
    callback();
  }
}

/**
 * @name 阻止短时间内重复请求
 * @param url 当前请求地址
 * @param cancel 中断请求
 * @description 每个请求发起前先判断当前请求是否存在于RequestList中，
 *              如果存在则取消该次请求，如果不存在则加入RequestList中，
 *              当请求完成后500ms时，清除RequestList中对应的该请求。
 */
function stopRepeatRequest(url,cancel) {
  for (let i=0;i<requestList.length;i++){
    if(requestList[i]===url){
      cancel();
      return;
    }
  }
  requestList.push(url);
}

/**
 * 超时设置
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
    console.log("当前访问URL：",request.url);
    let cancel;
    request.cancelToken = new CancelToken(function executor(c) {
      cancel = c;
    });
    checkToken(cancel,function () {
      Auth.setLoginStatus();
      request.headers.Authorization = `${store.state.user.token}`;
    });
    stopRepeatRequest(request.url,cancel);
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
            type: 'error'
          })
      }
      return Promise.reject(error.response.data);
    }
  }
);

export default service;
