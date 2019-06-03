<template>
  <div class="bread-crumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(bread,index) in breadList" :to="{ path: bread.path }" :key="index">{{bread.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <hr style="margin-top: 10px"/>
  </div>
</template>

<script>
    export default {
      name: "BreadCrumb",
      props: ['breadList']
    }
</script>

<style scoped>
.bread-crumb{
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
