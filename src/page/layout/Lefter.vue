<template>
  <div class="sys-left">
    <el-menu router unique-opened
             :default-active="defActive"
             :default-openeds="defOpens"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <LefterItem v-for="(item,index) in menuTree" :item="item" :navIndex="String(index)" :key="index"></LefterItem>
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
          defOpens:['/home']
        }
      },
      computed:{
        menuTree(){
          console.log('get menuTree..................');
          return this.$store.getters.menuTree;
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
