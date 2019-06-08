import {apiLogin,apiLogout,apiUserInfo} from '../../api/api_auth'
import { getToken, setToken, removeToken } from '../../utils/auth'
import {getUser,setUser,removeUser} from '../../utils/user'
import {getMenuList, getMenuTree, removeMenu, setMenuList, setMenuTree} from '../../utils/menu'
import {toTree} from "../../utils/tree";

/**
 * 这样做原因：
 * 由于state当浏览器刷新时候会清空state
 * 所以利用localStorage来保存数据不被清空，
 * 刷新的话从localStorage中重新取数据
 * @type {{userInfo: any, token}}
 */
const state = {
  token:getToken(),
  userInfo:getUser(),
  menuList: getMenuList(),
  menuTree: getMenuTree()
};


const mutations = {
  setToken : (state, token) => {
    state.token = token
  },
  setUserInfo : (state, userInfo) => {
    state.userInfo = userInfo
  },
  setMenuList: (state, data) => {
    state.menuList = data
  },
  setMenuTree: (state, data) => {
    state.menuTree = data
  },
};

const actions = {

  login({ commit }, userInfo) {
    console.log("----->login action");
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      apiLogin({ username: username, password: password }).then(res => {
        console.log("login res:",res);
        const {token,user,menuList} = res.data;
        let menuTree = toTree(menuList,0);
        commit('setToken', token);
        commit('setUserInfo',user);
        commit("setMenuList", menuList);
        commit("setMenuTree", menuTree);
        setToken(token);
        setUser(user);
        setMenuList(menuList);
        setMenuTree(menuTree);
        resolve(res);
      },err=>{
        reject(err);
      })
    })
  },

  getInfo({commit}) {
    console.log("----->getInfo action");
    return new Promise((resolve, reject) => {
      apiUserInfo().then(res => {
        commit('setUserInfo',res.data);
        setUser(res.data);
        resolve(res);
      },err=>{
        reject(err);
      })
    })
  },

  logout({dispatch,state }) {
    console.log("----->logout action");
    return new Promise((resolve, reject) => {
      apiLogout(state.token).then((res) => {
        dispatch('resetToken');
        resolve(res);
      },err=>{
        reject(err);
      })
    })
  },

  resetToken({ commit }) {
    console.log("----->resetToken action");
    return new Promise(resolve => {
      commit('setToken', '');
      removeToken();
      removeUser();
      removeMenu();
      resolve()
    })
  },
};

export default {
  namespaced:true,
  state,
  mutations,
  actions
}
