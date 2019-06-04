<template>
  <div class="sys-table-page">
    <el-pagination
          background
          :layout="layout"
          :current-page="pageInfo.pageNo"
          :page-sizes="pageInfo.pageSizes"
          :page-size="pageInfo.pageSize"
          :total="pageInfo.total"
          @size-change="sizeChange"
          @current-change="pageChange">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'TablePage',
    props: {
      pageInfo:{
        type : Object,
        default : function () {
          return {
            total : 0,
            pageNo : 1,
            pageSize : 5,
            pageSizes : [5, 10, 25, 50],
          }
        }
      },
      layout:{
        type : String,
        default : 'total, sizes, prev, pager, next, jumper'
      },
      sizeChange: {
        type: Function,
        default: function(){
          return null
        }
      },
      pageChange: {
        type: Function,
        default: function(){
          return null
        }
      }
    },
  }
</script>

<style scoped>
.sys-table-page{
  margin-top: 10px;
}
</style>
