<template>
  <div>
    Home
    <br/>
    <button @click="clickHandler">请求</button>
    <button @click="clickCancle">取消</button>
  </div>
</template>

<script>

    import AThreeSmall from "./tea/AThreeSmall";
    export default {
        name: "Home",
      components: {AThreeSmall},
      data(){
        return{

        }
      },
      methods:{
        clickHandler:function () {

        },
        clickCancle:function () {

        }
      },
    }
</script>

<style scoped>

</style>
