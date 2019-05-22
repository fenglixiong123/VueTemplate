import Cookies from 'js-cookie'
import store from "../store";
import router from "../router";
import AuthKey from '../const/authKey'

/**
 * login: 用来设置登录状态，超过时间则重新登录
 * token: 用来和后端交互，访问接口数据
 */
const Auth = {

  //token获取锁定
  tokenLock : false,

  // 当Token超时后采取何种策略
  // jumpAuthPage  每次请求时判断Token是否超时，若超时则跳转到授权页面
  // getNewToken  每次请求时判断Token是否超时，若超时则获取新Token (推荐)
  tokenTimeoutMethod: AuthKey.tokenTimeoutNew,

  // Token是否超时
  hasToken: function(){
    return Cookies.get(AuthKey.tokenKey)
  },

  // 当前是否是登录状态
  isLogin: function(){
    return Cookies.get(AuthKey.loginKey)
  },

  getToken: function(){
    return Cookies.get(AuthKey.tokenKey)
  },
  // 设置Token
  setToken: function(token){
    let maxAge = new Date(new Date().getTime() + 30 * 1000);
    console.log("设置Token超时时间为：",maxAge);
    Cookies.set(AuthKey.tokenKey, token, {
      expires: maxAge
    })
  },

  // 设置登录状态
  setLoginStatus: function(){
    let maxAge = new Date(new Date().getTime() + 30 * 60 * 1000);
    console.log("设置LoginStatus超时时间为：",maxAge);
    Cookies.set(AuthKey.loginKey, 'true', {
      expires: maxAge
    })
  },

  // 移除Token
  removeToken: function(){
    Cookies.remove(AuthKey.tokenKey)
  },

  // 移除登录状态
  removeLoginStatus: function(){
    Cookies.remove(AuthKey.loginKey)
  },

  /**
   * @name Token校验
   * @param cancel 中断函数，只会用在第二种方式
   * @param callback 回调
   * @description 校验Token是否过期，如果Token过期则根据配置采用不同方法获取新Token
   * 自动获取Token：过期时自动调用获取Token接口。注意：当有任一请求在获取Token时，其余请求将顺延，直至新Token获取完毕
   * 跳转授权Token：过期时中断当前所有请求并跳转到对应页面获取Token。注意：跳转页面授权最佳实现应在授权页面点击触发
   */
  checkToken : function (cancel,callback) {
    console.log('checkToken start....');
    if(!Auth.hasToken()){
      //自动获取新token
      if(Auth.tokenTimeoutMethod === AuthKey.tokenTimeoutNew){
        //如果当前有请求token
        if(Auth.tokenLock){
          console.log("token has been locked , request cancel !")
          cancel("没有获取到锁，中断请求，请稍后重试！");
          return false;
          // setTimeout(function () {
          //   Auth.checkToken(cancel,callback)
          // },500);
        }else {
          console.log("%c>>>>>>加获取Token锁！",'background:red');
          Auth.tokenLock = true;
          store.dispatch("auth/getNewToken")
            .then(token=>{
              console.log("成功获取新token:",token);
              callback();
            })
            .catch((err)=>{
              console.log("获取token err:",err);
            }).finally(function () {
              //一定要释放锁
              console.log("%c<<<<<<<<放获取Token锁！",'background:red');
              Auth.tokenLock = false;
          })
        }
      }//如果token过期则采用跳转到认证页面
      if(Auth.tokenTimeoutMethod === AuthKey.tokenTimeoutJump && Auth.isLogin()){
        console.log('next is go auth page');
        if(router.currentRoute.path!=='/auth'){
          //无法保证一定会中断所有请求
          cancel();
          router.push('/auth');
        }
      }
    }else {
      console.log('success get token from cookie');
      callback();
    }
    console.log('checkToken end....');
    return true;
  }

};



export default Auth
