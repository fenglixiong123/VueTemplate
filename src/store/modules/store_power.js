/**
 * 权限菜单相关
 **/
import {apiPowerListByAdminId} from '../../api/api_power'
import {getPowerList,setPowerList} from '../../utils/power'

const state = {
  powerList: getPowerList(),
};

const getters = {
  powerList: state => state.powerList,
};

const mutations = {

  setPowerList: (state, data) => {
    state.powerList = data
  },
};

const actions = {

  //获取权限列表
  getPowerList({commit,state},id){
    console.log('ready to get permissions !');
    return new Promise((resolve,reject) =>{
      apiPowerListByAdminId(id).then(res=>{
        commit("setPowerList", res.data);
        setPowerList(res.data);
        console.log('successful to get permissions !');
        resolve(res.data);
      },err=>{
        reject(err);
      });
    })
  }


};

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}
