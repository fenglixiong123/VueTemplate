<template>
  <div>
    <app-search>
      <el-form :inline="true" class="demo-form-inline" size="mini">
        <el-form-item label="ID">
          <el-input v-model="searchVo.id" placeholder="ID"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="searchVo.title" placeholder="角色"></el-input>
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
        <el-table-column label="角色名" prop="title" width="200px"></el-table-column>
        <el-table-column label="备注" prop="remark" ></el-table-column>
        <el-table-column label="操作" width="240px">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" content="编辑数据" placement="top-start">
              <el-button icon="el-icon-edit" type="primary" plain size="mini"
                       @click="handleEdit(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="分配菜单" placement="top-start">
              <el-button icon="el-icon-s-operation" type="primary" plain size="mini"
                       @click="assignMenuDialogOpen(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="分配权限" placement="top-start">
              <el-button icon="el-icon-setting" type="primary" plain size="mini"
                       @click="assignPowerDialogOpen(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="删除数据" placement="top-start">
              <el-button icon="el-icon-delete" type="danger" plain size="mini"
                       @click="handleDelete(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <table-page :page-info="pageInfo" :page-change="pageChange" :size-change="sizeChange" :disabled="tableLoading"/>
    <div class="sys-add">
      <el-dialog :title="optionAdd?'新增':'修改'" :visible.sync="addFormVisible" width="30%">
        <el-form label-width="60px">
          <el-form-item label="角色">
            <el-input v-model="entityVo.title" autocomplete="off"></el-input>
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
    <div class="sys-assign-menu">
      <el-dialog title="分配菜单" :visible.sync="assignMenuDialogVisible" width="40%">
        <el-button style="margin-bottom: 10px" type="primary" size="mini" @click="clearMenuTree">清空</el-button>
        <!--{{hasMenus}}-->
        <el-tree ref="menuTree" v-loading="assignMenuDialogLoading"
                 :data="allMenus" node-key="id" check-strictly
                 show-checkbox default-expand-all highlight-current
                 @check-change="assignMenuSelectChange">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.title }}-{{data.id}}</span>
          </span>
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="assignMenuDialogCancel">取消</el-button>
          <el-button type="primary" @click="assignMenuDialogConfirm" :disabled="assignMenuDialogLoading">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="sys-assign-menu">
      <el-dialog title="分配权限" :visible.sync="assignPowerDialogVisible" width="30%">
        <el-button style="margin-bottom: 10px" type="primary" size="mini" @click="clearPowerTree">清空</el-button>
        <!--{{hasPowers}}-->
        <el-tree ref="powerTree" v-loading="assignPowerDialogLoading"
                 :data="allPowers" node-key="id" check-strictly
                 show-checkbox default-expand-all highlight-current
                 @check-change="assignPowerSelectChange">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.title }}</span>
          </span>
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="assignPowerDialogCancel">取消</el-button>
          <el-button type="primary" @click="assignPowerDialogConfirm" :disabled="assignPowerDialogLoading">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import {apiRoleAdd, apiRoleUpdate, apiRoleDelete, apiRoleListPage,
      apiRoleFindPossessMenu,apiRoleFindPossessPower,
      apiRoleAssignMenu,apiRoleAssignPower} from '../../../api/api_role'
    import {alertSuccessMsg, alertErrorMsg, notifyError} from '../../../utils/message'
    import {clearObj} from "../../../utils/common";
    import TablePage from "../../../components/TablePage/index";
    import AppToolbar from "../../../components/AppToolbar/index";
    import AppSearch from "../../../components/AppSearch/index";
    export default {
      name: "Role",
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
            remark : null
          },
          pageInfo:{
            total : 0,
            pageNo : 1,
            pageSize : 5,
            pageSizes : [5, 10, 25, 50],
          },
          currentRowId:null,
          allMenus:[],
          hasMenus:[],
          allPowers:[],
          hasPowers:[],
          checkMenus:[],
          checkPowers:[],
          assignMenuDialogVisible:false,
          assignMenuDialogLoading:false,
          assignPowerDialogVisible:false,
          assignPowerDialogLoading:false,
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
          apiRoleListPage(this.queryVo).then(res=>{
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
          this.entityVo.remark = row.remark;
        },
        handleDelete(row) {
          this.$confirm('确认删除此条记录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            apiRoleDelete(row.id).then(res=>{
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
              apiRoleAdd(this.entityVo).then(res=>{
                alertSuccessMsg("添加成功！");
                clearObj(this.entityVo);
                this.listPage();
              },err=>{
                alertErrorMsg("添加失败！");
                console.log("err",err)
              })
            }else {return;}
          }else{
            apiRoleUpdate(this.entityVo).then(res=>{
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
        assignMenuDialogOpen:function(row){
          this.currentRowId = row.id;
          this.assignMenuDialogVisible = true;
          this.assignMenuDialogLoading = true;
          apiRoleFindPossessMenu(row.id).then(res=>{
            const {allMenus,hasMenus} = res.data;
            this.allMenus = allMenus;
            this.hasMenus = hasMenus;
            this.$refs.menuTree.setCheckedKeys(hasMenus);
            this.assignMenuDialogLoading = false;
          },err=>{
            console.log('err',err);
          })
        },
        assignMenuDialogConfirm:function(){
          this.assignMenuDialogVisible = false;
          apiRoleAssignMenu(this.currentRowId,this.hasMenus).then(res=>{
            alertSuccessMsg('分配菜单成功！');
          }).catch(err=>{
            alertErrorMsg('分配角色失败！');
            console.log(err);
          })
        },
        assignMenuDialogCancel:function(){
          this.assignMenuDialogVisible = false;
          setTimeout(()=>{
            this.allMenus = [];
            this.hasMenus = [];
          },200)

        },
        assignPowerDialogOpen:function(row){
          this.currentRowId = row.id;
          this.assignPowerDialogVisible = true;
          this.assignPowerDialogLoading = true;
          apiRoleFindPossessPower(row.id).then(res=>{
            const {allPowers,hasPowers} = res.data;
            this.allPowers = allPowers;
            this.hasPowers = hasPowers;
            this.$refs.powerTree.setCheckedKeys(hasPowers);
            this.assignPowerDialogLoading = false;
          },err=>{
            console.log('err',err);
          })
        },
        assignPowerDialogConfirm:function(){
          this.assignPowerDialogVisible = false;
          apiRoleAssignPower(this.currentRowId,this.hasPowers).then(res=>{
            alertSuccessMsg('分配权限成功！');
          }).catch(err=>{
            alertErrorMsg('分配权限失败！');
            console.log(err);
          })
        },
        assignPowerDialogCancel:function(){
          this.assignPowerDialogVisible = false;
          setTimeout(()=>{
            this.allPowers = [];
            this.hasPowers = [];
          },200)
        },
        assignMenuSelectChange:function(){
          this.hasMenus = this.$refs.menuTree.getCheckedKeys()
            .concat(this.$refs.menuTree.getHalfCheckedKeys());
        },
        assignPowerSelectChange:function(){
          this.hasPowers = this.$refs.powerTree.getCheckedKeys()
            .concat(this.$refs.powerTree.getHalfCheckedKeys());
        },
        clearMenuTree:function(){
          this.$refs.menuTree.setCheckedKeys([]);
        },
        clearPowerTree:function(){
          this.$refs.powerTree.setCheckedKeys([]);
        },
        validate:function(){
          if(this.entityVo.title==null||this.entityVo.title===''){
            alertErrorMsg("角色不能为空");
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
