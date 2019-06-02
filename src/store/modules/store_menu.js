/**
 * 权限菜单相关
 **/
import {apiMenuListByAdminId} from '../../api/api_menu'
import {getMenuList, getMenuTree, setMenuList, setMenuTree} from '../../utils/menu'
import {toTree} from "../../utils/tree";

const state = {
  menuList: getMenuList(),
  menuTree: getMenuTree()
};

const getters = {
  menuList: state => state.menuList,
  menuTree: state => state.menuTree,
};

const mutations = {
  setMenuList: (state, data) => {
    state.menuList = data
  },
  setMenuTree: (state, data) => {
    state.menuTree = data
  },
};

const actions = {

  //获取菜单列表
  getMenuList({commit,state},id){
    console.log('ready to get menus !');
    return new Promise((resolve,reject) =>{
      apiMenuListByAdminId(id).then(res=>{
        let menuTree = toTree(res.data,0);
        commit("setMenuList", res.data);
        commit("setMenuTree", menuTree);
        setMenuList(res.data);
        setMenuTree(menuTree);
        console.log('successful to get menus !');
        resolve(res.data);
      },err=>{
        reject(err);
      });
    })
  },


};

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}
