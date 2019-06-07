<template>
  <div>
    <app-search>
      <el-form :inline="true" class="demo-form-inline" size="mini">
        <el-form-item label="ID">
          <el-input v-model="searchVo.id" placeholder="ID"></el-input>
        </el-form-item>
        <el-form-item label="菜单">
          <el-input v-model="searchVo.title" placeholder="菜单"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchSubmit" :disabled="tableLoading">查询</el-button>
          <el-button type="primary" @click="searchClear" :disabled="tableLoading">清空</el-button>
        </el-form-item>
      </el-form>
    </app-search>
    <app-toolbar>
      <el-button type="primary" plain size="mini" @click="addDialogOpen" :disabled="tableLoading">新增</el-button>
    </app-toolbar>
    <div class="sys-table">
      <el-table :border="true" :data="tableList" v-loading="tableLoading">
        <el-table-column label="ID" prop="id" width="40px"></el-table-column>
        <el-table-column label="菜单名" prop="title" width="100px"></el-table-column>
        <el-table-column label="父级菜单ID" prop="parentId" width="100px"></el-table-column>
        <el-table-column label="路径" prop="path" ></el-table-column>
        <el-table-column label="图标" prop="icon" width="120px"></el-table-column>
        <el-table-column label="备注" prop="remark" ></el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" type="primary" plain size="mini"
                       @click="handleEdit(scope.row)"></el-button>
            <el-button icon="el-icon-delete" type="danger" plain size="mini"
                       @click="handleDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <table-page :page-info="pageInfo" :page-change="pageChange" :size-change="sizeChange" :disabled="tableLoading"/>
    <div class="sys-add">
      <el-dialog :title="optionAdd?'新增':'修改'" :visible.sync="addFormVisible" width="50%">
        <el-form label-width="60px" :inline="true">
          <el-form-item label="菜单">
            <el-input v-model="entityVo.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="父级ID">
            <el-input v-model="entityVo.parentId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="路径">
            <el-input v-model="entityVo.path" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="entityVo.order" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="图标">
            <el-input v-model="entityVo.icon" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="entityVo.remark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogCancel">取消</el-button>
          <el-button type="primary" @click="addDialogConfirm">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {apiMenuAdd, apiMenuUpdate, apiMenuDelete, apiMenuListPage,} from '../../../api/api_menu'
  import {alertSuccessMsg, alertErrorMsg, notifyError} from '../../../utils/message'
  import {clearObj} from "../../../utils/common";
  import TablePage from "../../../components/TablePage/index";
  import AppToolbar from "../../../components/AppToolbar/index";
  import AppSearch from "../../../components/AppSearch/index";
  export default {
    name: "Menu",
    components: {AppSearch, AppToolbar, TablePage},
    data(){
      return{
        optionAdd:false,
        addFormVisible : false,
        tableLoading:true,
        tableList:[],
        searchVo : {
          id : null,
          title : null
        },
        entityVo : {
          id : null,
          title : null,
          parentId : null,
          path : null,
          icon : null,
          order : null,
          remark : null
        },
        pageInfo:{
          total : 0,
          pageNo : 1,
          pageSize : 5,
          pageSizes : [5, 10, 25, 50],
        }
      }
    },
    computed:{
      queryVo:function () {
        return {
          page : this.pageInfo.pageNo,
          pageSize : this.pageInfo.pageSize,
          entity : this.searchVo
        };
      },
    },
    methods:{
      listPage:function(){
        this.tableLoading = true;
        apiMenuListPage(this.queryVo).then(res=>{
          const pageResult = res.data;
          const {list,total} = pageResult;
          this.tableList = list;
          this.pageInfo.total = total;
          this.tableLoading = false;
        },err=>{
          notifyError("数据请求出错！");
          this.tableLoading = false;
          console.log("err",err);
        });
      },
      searchSubmit() {
        this.listPage();
      },
      searchClear(){
        clearObj(this.searchVo);
        this.listPage();
      },
      handleEdit(row) {
        clearObj(this.entityVo);
        this.optionAdd = false;
        this.addFormVisible = true;
        this.entityVo.id = row.id;
        this.entityVo.title = row.title;
        this.entityVo.parentId = row.parentId;
        this.entityVo.path = row.path;
        this.entityVo.icon = row.icon;
        this.entityVo.order = row.order;
        this.entityVo.remark = row.remark;
      },
      handleDelete(row) {
        this.$confirm('确认删除此条记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          apiMenuDelete(row.id).then(res=>{
            alertSuccessMsg('删除成功');
            this.listPage();
          },err=>{
            console.log("err",err);
            alertErrorMsg('删除失败');
          });
        }).catch(()=>{});
      },
      addDialogOpen(){
        clearObj(this.entityVo);
        this.optionAdd = true;
        this.addFormVisible = true;
      },
      addDialogConfirm:function(){
        if(this.optionAdd){
          if(this.validate()){
            apiMenuAdd(this.entityVo).then(res=>{
              alertSuccessMsg("添加成功！");
              clearObj(this.entityVo);
              this.listPage();
            },err=>{
              alertErrorMsg("添加失败！");
              console.log("err",err)
            })
          }else {return;}
        }else{
          apiMenuUpdate(this.entityVo).then(res=>{
            alertSuccessMsg("更新成功！");
            clearObj(this.entityVo);
            this.listPage();
          },err=>{
            alertErrorMsg("更新失败！");
            console.log("err",err)
          })
        }
        this.addFormVisible = false;
      },
      addDialogCancel:function(){
        clearObj(this.entityVo);
        this.addFormVisible = false;
      },
      validate:function(){
        if(this.entityVo.title==null||this.entityVo.title===''){
          alertErrorMsg("菜单不能为空");
          return false;
        }
        return true;
      },
      sizeChange(val) {
        this.pageInfo.pageSize = val;
        this.listPage();
      },
      pageChange(val) {
        this.pageInfo.pageNo = val;
        this.listPage();
      }
    },
    mounted() {
      this.listPage();
    }
  }
</script>

<style scoped>

</style>
