import Cookies from 'js-cookie'

const AuthKey = {
  loginKey: 'isLogin',
  tokenKey: 'token',
  tokenTimeoutNew: 'getNewToken',
  tokenTimeoutJump: 'jumpAuthPage'
};

/**
 * login: 用来设置登录状态，超过时间则重新登录
 * token: 用来和后端交互，访问接口数据
 */
const Auth = {

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

  // 设置Token
  setToken: function(token){
    // TODO: 设置token，并填写有效期
    let maxAge = new Date(new Date().getTime() + 30 * 1000)
    Cookies.set(AuthKey.tokenKey, token, {
      expires: maxAge
    })
  },

  // 设置登录状态
  setLoginStatus: function(){
    // TODO: 设置超时登录时间，在该时间范围内没有任何请求操作则自动删除
    console.log("登录状态最长时间更新");
    let maxAge = new Date(new Date().getTime() + 30 * 60 * 1000)
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
  }

};

export {
  AuthKey,
  Auth
};
