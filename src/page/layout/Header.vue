<template>
  <div class="sys-header">

    <div class="top-header">

      <div class="sys-logo">
        <img src="/static/img/boss01.jpg" style="width: 60px;height:60px;"/>
      </div>

      <el-menu :default-active="activeIndex" class="el-menu-header" mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">

        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>

        <div class="user-info">

        </div>
        <div class="sys-logout">
          <el-button type="danger" size="mini" @click="logOut">退出</el-button>
        </div>

      </el-menu>
    </div>

  </div>
</template>

<script>
    export default {
      name: "Header",
      data(){
        return{
          activeIndex: '1',
        }
      },
      methods:{
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        logOut:function () {
          console.log("logOut");
          this.$store.dispatch('auth/logout').then(rep=>{
            this.$message.success("登出成功！");
            console.log(rep);
            this.$router.push('/login');
          });
        }
      }
    }
</script>

<style scoped>
  .el-menu-header{
    padding-left: 150px;
  }
  .sys-logo{
    float: left;
    z-index: 99;
    padding-left: 0;
  }
  .sys-logout{
    float: right;
    line-height: 60px;
    padding-right: 100px;
  }
</style>
