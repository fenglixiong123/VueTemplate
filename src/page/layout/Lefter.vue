<template>
  <div class="sys-left">
    <el-menu :default-active="defActive" router
             :default-openeds="opens"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <lefter-item v-for="(item,index) in menuTree" :item="item" :itemIndex="String(index)" :key="index"></lefter-item>
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
          opens:['/home','news']
        }
      },
      computed:{
        menuTree(){
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
