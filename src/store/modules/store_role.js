/**
 *
 *
 *
 * 此页面暂时废弃，不用vuex处理表单
 *
 *
 *
 *
 */


import {apiRoleGet, apiRoleAdd, apiRoleUpdate, apiRoleDelete,
  apiRoleList, apiRoleListPage,} from '../../api/api_role'
import {alertSuccessMsg,alertErrorMsg} from '../../utils/message'

const state = {
  searchVo : {
    id : null,
    title : null
  },
  entityVo : {
    id : null,
    title : null,
    remark : null
  },
  tableList:[],
  pageInfo:{
    total : 0,
    pageNo : 1,
    pageSize : 5,
    pageSizes : [5, 10, 25, 50],
  },
};

const getters = {
  tableList : state=>state.tableList,
  pageInfo : state=>state.pageInfo,
  searchVo : state=>state.searchVo,
  entityVo : state=>state.entityVo,
  queryVo : state=>{
    return{
      page : state.pageInfo.pageNo,
      pageSize : state.pageInfo.pageSize,
      entity : state.searchVo
    }
  },
};

const mutations = {
  setPageInfo(state,pageInfo){
    state.pageInfo = Object.assign(state.pageInfo,pageInfo);
  },
  setTableList(state,data){
    state.tableList = data;
  },
  setSearchVo(state,searchVo){
    state.searchVo = Object.assign(state.searchVo,searchVo);
  },
  setEntityVo(state,entityVo){
    state.entityVo = Object.assign(state.entityVo,entityVo);
  },
  clearSearchVo(state){
    state.searchVo = {
      id : null,
      title : null
    }
  },
  clearEntityVo(state){
    state.entityVo = {
      id : null,
      title : null,
      remark : null
    }
  },
};

const actions = {

  updateSearch({commit,state},searchVo){
    commit('setSearchVo',searchVo);
  },
  updateEntity({commit,state},entityVo){
    commit('setEntityVo',entityVo);
  },

  clearSearch({dispatch,commit,getters}){
    commit('clearSearchVo');
    dispatch('listPage',getters.queryVo);
  },
  clearEntity({dispatch,commit}){
    commit('clearEntityVo');
  },

  queryPage({dispatch,commit,getters,state},pageInfo){
    commit('setPageInfo',pageInfo);
    dispatch('listPage',getters.queryVo);
  },

  listPage({commit,state},data){
    console.log(data);
    apiRoleListPage(data).then(res=>{
      const pageResult = res.data;
      commit('setTableList',pageResult.list);
      commit('setPageInfo',{
        total : pageResult.total
      });
    },err=>{
      console.log("err",err);
    });
  },

  add({dispatch,commit},data){
    apiRoleAdd(data).then(res=>{
      alertSuccessMsg("添加成功！");
      dispatch('listPage',getters.queryVo);
    },err=>{
      alertErrorMsg("添加失败！");
      console.log("err",err)
    })
  },

  update({dispatch},data){
    apiRoleUpdate(data).then(res=>{
      alertSuccessMsg("更新成功！");
      dispatch('listPage',getters.queryVo);
    },err=>{
      alertErrorMsg("更新失败！");
      console.log("err",err)
    })
  }
  ,

  delete({dispatch,commit},id){
    apiRoleDelete(id).then(res=>{
      alertSuccessMsg('删除成功');
      dispatch('queryPage');
    },err=>{
      console.log("err",err);
      alertErrorMsg('删除失败');
    });
  }
};



export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}
