<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(bread,index) in breadList" :to="{ path: bread.path }" :key="index">{{bread.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
    export default {
      name: "BreadCrumb",
      props: ['breadList']
    }
</script>

<style scoped>

</style>
