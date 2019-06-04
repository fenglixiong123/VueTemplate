import {apiRoleGet, apiRoleAdd, apiRoleUpdate, apiRoleDelete,
  apiRoleList, apiRoleListPage,} from '../../api/api_role'
import {alertSuccessMsg,alertErrorMsg} from '../../utils/message'

const state = {
  entityVo : {
    id : null,
    title : null
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
  entityVo : state=>state.entityVo,
  queryVo : state=>{
    return{
      page : state.pageInfo.pageNo,
      pageSize : state.pageInfo.pageSize,
      entity : state.entityVo
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
  setEntityVo(state,entityVo){
    state.entityVo = Object.assign(state.entityVo,entityVo);
  },
  clearEntityVo(state){
    state.entityVo = {
      id : null,
      title : null
    }
  }
};

const actions = {

  updateEntityVo({commit,state},entityVo){
    commit('setEntityVo',entityVo);
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

  clearPage({dispatch,commit,getters}){
    commit('clearEntityVo');
    dispatch('listPage',getters.queryVo);
  },

  deleteAdmin({dispatch,commit},id){
    apiRoleDelete(id).then(res=>{
      console.log('res',res);
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
