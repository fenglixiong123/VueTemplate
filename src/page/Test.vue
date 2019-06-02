<template>
    <div>
     <lay-out/>
    </div>
</template>

<script>

  import Header from "./layout/Header";
  import Footer from "./layout/Footer";
  import Lefter from "./layout/Lefter";
  import LayOut from "./layout/index";
    export default {
      name: "Test",
      components: {LayOut, Lefter, Footer, Header},
      data(){
        return{
          menuTree:[]
        }
      },
      mounted(){
        console.log(".........")
        this.menuTree = this.$store.getters['menu/menuTree'];
        console.log(this.menuTree);

      }
    }
</script>

<style scoped>

</style>
