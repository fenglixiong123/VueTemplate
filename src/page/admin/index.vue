<template>
  <div>
    <app-search>
      <el-form :inline="true" class="demo-form-inline" size="mini">
        <el-form-item label="用户名">
          <el-input v-model="searchVo.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="searchVo.nickname" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchSubmit">查询</el-button>
          <el-button type="primary" @click="searchClear">清空</el-button>
        </el-form-item>
      </el-form>
    </app-search>
    <app-toolbar>
      <el-button type="primary" plain size="mini" @click="addDialogOpen">新增</el-button>
    </app-toolbar>
    <div class="sys-table">
      <el-table :border="true" :data="tableList">
        <el-table-column label="ID" prop="id" width="40px"></el-table-column>
        <el-table-column label="用户名" prop="username" width="100px"></el-table-column>
        <el-table-column label="昵称" prop="nickname" width="100px"></el-table-column>
        <el-table-column label="头像" prop="icon" width="100px"></el-table-column>
        <el-table-column label="性别" prop="sex" width="50px">
          <template slot-scope="scope">
            {{scope.row.sex===1?'男':'女'}}
          </template>
        </el-table-column>
        <el-table-column label="手机号" prop="phone" width="120px"></el-table-column>
        <el-table-column label="邮箱" prop="email" width="200px"></el-table-column>
        <el-table-column label="地址" prop="address" width="200px"></el-table-column>
        <el-table-column label="状态" prop="status" width="50px">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1"><i class="el-icon-success"></i></span>
            <span v-else><i class="el-icon-error"></i></span>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" ></el-table-column>
        <el-table-column label="操作" width="200px" fixed="right">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" content="编辑数据" placement="top-start">
              <el-button icon="el-icon-edit" type="primary" plain size="mini"
                       @click="handleEdit(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="分配角色" placement="top-start">
              <el-button icon="el-icon-user" type="primary" plain size="mini"
                       @click="assignRoleDialogOpen(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="删除数据" placement="top-start">
              <el-button icon="el-icon-delete" type="danger" plain size="mini"
                       @click="handleDelete(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <table-page :page-info="pageInfo" :page-change="pageChange" :size-change="sizeChange"/>
    <div class="sys-add">
      <el-dialog :title="optionAdd?'新增':'修改'" :visible.sync="addFormVisible" width="50%">
        <el-form label-width="60px" :inline="true">
          <el-form-item label="用户">
            <el-input v-model="entityVo.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="entityVo.nickname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="entityVo.sex">
              <el-option label="男" value="1">男</el-option>
              <el-option label="女" value="0">女</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="entityVo.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-input v-model="entityVo.status" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="entityVo.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="entityVo.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="头像">
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

    <div class="sys-distribute">
      <el-dialog title="分配角色"  :visible.sync="assignRoleFormVisible" width="50%">
        <el-card class="box-card" shadow="hover" v-loading="assignRoleDialogLoading">
          <el-checkbox-group v-model="hasRoles" size="small">
            <el-checkbox class="sys-checkbox" v-for="(item,index) in allRoles" :label="item.id" :key="index" border>
              {{item.title}}
            </el-checkbox>
          </el-checkbox-group>
          <br/>
        </el-card>
          <div slot="footer" class="dialog-footer">
            <el-button @click="assignRoleDialogCancel">取消</el-button>
            <el-button type="primary" @click="assignRoleDialogConfirm" :disabled="assignRoleDialogLoading">确定</el-button>
          </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import {apiAdminAdd, apiAdminUpdate, apiAdminDelete, apiAdminListPage,
    apiAdminAssignRole,apiAdminFindPossessRole} from '../../api/api_admin'
  import {alertSuccessMsg,alertErrorMsg} from '../../utils/message'
  import {clearObj} from "../../utils/common";
  import TablePage from "../../components/TablePage/index";
  import AppToolbar from "../../components/AppToolbar/index";
  import AppSearch from "../../components/AppSearch/index";
  export default {
    name: "Admin",
    components: {AppSearch, AppToolbar, TablePage},
    data(){
      return{
        optionAdd:false,
        addFormVisible : false,
        tableList:[],
        searchVo : {
          id : null,
          username : null,
          nickname : null,
        },
        entityVo : {
          id : null,
          username : null,
          nickname : null,
          icon : null,
          phone : null,
          email : null,
          sex : null,
          address : null,
          status : null,
          remark : null,
        },
        pageInfo:{
          total : 0,
          pageNo : 1,
          pageSize : 5,
          pageSizes : [5, 10, 25, 50],
        },
        currentRowId : null,
        assignRoleFormVisible : false,
        assignRoleDialogLoading : true,
        allRoles : [],
        hasRoles : [],
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
      selectParseForSex(){
        if(this.entityVo.sex){
          if(this.entityVo.sex === '男'){
            this.entityVo.sex = 1;
          } else if(this.entityVo.sex === '女'){
            this.entityVo.sex = 0;
          }
        }
      },
      listPage:function(){
        apiAdminListPage(this.queryVo).then(res=>{
          const pageResult = res.data;
          const {list,total} = pageResult;
          this.tableList = list;
          this.pageInfo.total = total;
        },err=>{
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
        this.entityVo.username = row.username;
        this.entityVo.nickname = row.nickname;
        this.entityVo.icon = row.icon;
        this.entityVo.sex = row.sex ===1?'男':'女';
        this.entityVo.phone = row.phone;
        this.entityVo.email = row.email;
        this.entityVo.address = row.address;
        this.entityVo.status = row.status;
        this.entityVo.remark = row.remark;
      },
      handleDelete(row) {
        this.$confirm('确认删除此条记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          apiAdminDelete(row.id).then(res=>{
            alertSuccessMsg('删除成功');
            this.listPage();
          },err=>{
            console.log("err",err);
            alertErrorMsg('删除失败');
          });
        }).catch(()=>{});
      },
      validate:function(){
        if(this.entityVo.username==null||this.entityVo.username===''){
          alertErrorMsg("用户不能为空");
          return false;
        }
        return true;
      },
      addDialogOpen(){
        clearObj(this.entityVo);
        this.entityVo.sex = '男';
        this.optionAdd = true;
        this.addFormVisible = true;
      },
      addDialogConfirm:function(){
        this.selectParseForSex();
        if(this.optionAdd){
          if(this.validate()){
            apiAdminAdd(this.entityVo).then(res=>{
              alertSuccessMsg("添加成功！");
              clearObj(this.entityVo);
              this.listPage();
            },err=>{
              alertErrorMsg("添加失败！");
              console.log("err",err)
            })
          }else {return;}
        }else{
          apiAdminUpdate(this.entityVo).then(res=>{
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
      assignRoleDialogOpen(row){
        this.currentRowId = row.id;
        this.assignRoleFormVisible = true;
        this.assignRoleDialogLoading = true;
        apiAdminFindPossessRole(row.id).then(res=>{
          const {allRoles,hasRoles} = res.data;
          this.allRoles = allRoles;
          this.hasRoles = hasRoles;
          this.assignRoleDialogLoading = false;
        },err=>{
          console.log('err',err);
        })
      },
      assignRoleDialogConfirm(){
        this.assignRoleFormVisible = false;
        apiAdminAssignRole(this.currentRowId,this.hasRoles).then(res=>{
          alertSuccessMsg('分配角色成功！');
        },err=>{
          alertErrorMsg('分配角色失败！');
          console.log('err',err)
        })
      },
      assignRoleDialogCancel(){
        this.assignRoleFormVisible = false;
        setTimeout(()=>{
          this.allRoles = [];
          this.hasRoles = [];
        },200)
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
.sys-checkbox{
  margin-left: 10px;
  margin-top: 20px;
}
</style>
