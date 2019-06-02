<template>
  <div>
    <header/>
    <lefter/>
    <div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <Footer/>
  </div>
</template>

<script>
    import Header from "./Header";
    import Lefter from "./Lefter";
    import Footer from "./Footer";
    export default {
      name: "LayOut",
      components: {Lefter, Header, Footer}
    }
</script>

<style scoped>

</style>
