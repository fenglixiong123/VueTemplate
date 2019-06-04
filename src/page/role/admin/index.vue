<template>
  <div>
    <search-bar>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="ID">
          <el-input :value="entityVo.id" @input="updateForm({'id':$event})" placeholder="ID"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-input :value="entityVo.title" @input="updateForm({'title':$event})" placeholder="角色"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onClear">清空</el-button>
        </el-form-item>
      </el-form>
    </search-bar>
    <el-button style="margin-bottom: 10px" type="primary" plain size="mini">新增</el-button>
    <el-table :border="true" :data="tableList">
      <el-table-column label="ID" prop="id" width="50px"></el-table-column>
      <el-table-column label="角色名" prop="title" width="200px"></el-table-column>
      <el-table-column label="备注" prop="remark" ></el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" type="primary" plain size="mini"
            @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button icon="el-icon-delete" type="danger" plain size="mini"
            @click="handleDelete(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <table-page :page-info="pageInfo" :page-change="pageChange" :size-change="sizeChange"/>

  </div>
</template>

<script>
    import TablePage from "../../../components/TablePage/index";
    import SearchBar from "../../../components/SearchBar/index";
    export default {
      name: "Role",
      components: {SearchBar, TablePage},
      data(){
        return{
          msg:''
        }
      },
      computed:{
        tableList:function () {
          return this.$store.getters['role/tableList'];
        },
        pageInfo:function () {
          return this.$store.getters['role/pageInfo'];
        },
        entityVo:function () {
          console.log(this.$store.getters['role/entityVo']);
          return this.$store.getters['role/entityVo'];
        },
        queryVo:function () {
          return this.$store.getters['role/queryVo'];
        },
      },
      methods:{
        updateForm(val){
          this.$store.dispatch('role/updateEntityVo',val);
        },
        onSubmit() {
          this.$store.dispatch('role/listPage',this.queryVo);
        },
        onClear(){
          this.$store.dispatch('role/clearPage',this.queryVo);
        },
        handleEdit(index, row) {
          console.log(index, row.id);
        },
        handleDelete(index, row) {
          this.$store.dispatch('role/deleteRole',row.id);
        },

        sizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.$store.dispatch('role/queryPage',{
            pageSize:val
          });
        },
        pageChange(val) {
          console.log(`当前页: ${val}`);
          this.$store.dispatch('role/queryPage',{
            pageNo:val
          });
        }
      },
      mounted() {
        this.$store.dispatch('role/listPage',this.queryVo);
      }
    }
</script>

<style scoped>

</style>
