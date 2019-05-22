import axios from 'utils/ajax'
import Auth from 'utils/auth'

const state = {
  token:'',
};

//这里只能做同步请求
const mutations = {
  setToken:function (state, token) {
    if(token){
      Auth.setToken(token);
      Auth.setLoginStatus();
    }else {
      Auth.removeToken();
      Auth.removeLoginStatus();
    }
    state.token = token;
  }
};

//只有这里可以进行异步请求
const actions = {
  getNewToken:function ({commit, state}) {
    return new Promise((resolve, reject) => {
      axios({
        url: '/getToken',
        method: 'get',
        param: {
          token: state.token
        }
      }).then(res => {
        commit('setToken', res.token);
        //resolve将token传给调用函数者
        resolve(res.token);
      }).catch(err=>{
        //如果发生后台错误
        reject("getNewToken后台服务错误，后台无服务");
      })
    });
  },
};


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
