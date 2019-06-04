<template>
  <div class="sys-content">
    <!--面包屑-->
    <BreadCrumb :bread-list="levelList"/>
    <!--视图层-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
    import BreadCrumb from "../../components/BreadCrumb/index";
    export default {
      name: "Mainer",
      components: {BreadCrumb},
      data(){
        return{
          levelList: [],
        }
      },
      methods:{
        /**
         * 获取当前面包屑
         */
        getBreadCrumb:function () {
          let breads = this.$route.matched;
          this.levelList = breads.map(item=>{
            return{
              path:item.path,
              title:item.meta.title,
            }
          });
        }
      },
      watch:{
        $route(){
          this.getBreadCrumb();
        }
      },
      created() {
        this.getBreadCrumb();
      }
    }
</script>

<style scoped>

</style>
