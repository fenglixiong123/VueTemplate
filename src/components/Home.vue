<template>
  <div>
    Home
    <br/>
    <button @click="clickHandler">请求</button>
  </div>
</template>

<script>
    import service from 'utils/ajax'
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
          const url = "https://api.github.com/users";
          service.get(url).then(
            res=>{
              console.log("home result:",res);
            }
          ).catch(
            err=>{
              console.log(err);
            }
          );
        }
      },
    }
</script>

<style scoped>

</style>
