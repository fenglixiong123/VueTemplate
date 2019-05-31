/**
 * 权限菜单相关
 **/
import {apiMenuListByAdminId} from '../../api/api_menu'
import {getMenuList,setMenuList} from '../../utils/menu'

const state = {
  menuList: getMenuList(),
};

const getters = {
  menuList: state => state.menuList,
};

const mutations = {
  setMenuList: (state, data) => {
    state.menuList = data
  },

};

const actions = {

  //获取菜单列表
  getMenuList({commit,state},id){
    console.log('ready to get menus !');
    return new Promise((resolve,reject) =>{
      apiMenuListByAdminId(id).then(res=>{
        commit("setMenuList", res.data);
        setMenuList(res.data);
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
