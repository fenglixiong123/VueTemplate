<template>
  <div class="sys-left">
    <el-menu :default-active="defActive" router
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
  float: left;
  width: 30%;
}
</style>
