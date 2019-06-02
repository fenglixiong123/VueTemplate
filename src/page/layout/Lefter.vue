<template>
  <div class="sys-left">
    <el-menu router unique-opened
             :default-active="defActive"
             :default-openeds="defOpens"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-menu-item index="/home/setting">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
      <LefterItem v-for="(item,index) in menuTree" :item="item" :itemIndex="String(index)" :key="index"></LefterItem>
    </el-menu>
  </div>
</template>

<script>
    import LefterItem from "./LefterItem";
    export default {
      name: "Lefter",
      components: {LefterItem},
      data(){
        return{
          defOpens:['/home/picture']
        }
      },
      computed:{
        menuTree(){
          console.log('get menuTree..................');
          return this.$store.getters['menu/menuTree'];
        },
        defActive(){
          return this.$route.path;
        },
      },
      methods:{

      }
    }
</script>

<style scoped>
.sys-left{
  padding-left: 20px;
  margin-top: 20px;
  margin-right: 20px;
}
</style>
