/**
 * 权限菜单相关
 **/
import {apiNavList} from '../../api/api_access'

const state = {
  navList: []
};

const getters = {
    navList: state => state.navList,
};

const mutations = {
  setNavList: (state, data) => {
    state.navList = data
  },
};

const actions = {

  // 获取该用户的菜单列表
  getNavigationList({commit}){
    return new Promise((resolve,reject) =>{
      apiNavList().then((res) => {
        commit("setNavList", res);
        resolve(res);
      },err=>{
        reject(err);
      })
    })
  },

  // 将菜单列表扁平化形成权限列表
  getPermissionList({state}){
    return new Promise((resolve) =>{
      let accessList = [];
      // 将菜单数据扁平化为一级
      flatNavList(state.navList,accessList);
      resolve(accessList)
    })
  }


};

function flatNavList(arr,accessList){
  for(let v of arr){
    if(v.child && v.child.length){
      flatNavList(v.child)
    } else{
      accessList.push(v)
    }
  }
}

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}
