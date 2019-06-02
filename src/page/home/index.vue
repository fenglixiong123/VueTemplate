<template>
  <div>
    Home
    <hr/>
    <app-title>前言</app-title>
    <app-note>
      <p>1</p>
      <p>2</p>
      <p>3</p>
    </app-note>
    <app-section title="学习">
      section1
    </app-section>
    <app-section title="娱乐">
      section2
    </app-section>
    <app-section title="文化">
      section3
    </app-section>
  </div>
</template>

<script>


  export default {
    name: 'index',
    data(){
      return{
        opens:['/selfManage']
      }
    },
    methods:{
      handleSelect:function (key, keyPath) {
        console.log(key,keyPath)
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
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
  body{margin: 0;}

  .flx-header .el-menu-demo{
    width: 100%;
    padding-left: 300px;
  }
  a{
    text-decoration: none;
  }
  .flx-main-left{
    margin-left: 20px;
  }
  .flx-main-right{
    width: 90%;
    height: 500px;
    padding: 20px;
    border: 1px solid grey;
  }
  .flx-footer{
    text-align: center;
    line-height: 60px;
    margin-top: 20px;
    width:100%;
    height: 60px;
    background-color: #545c64;
    /*border:1px solid blue;*/
  }
  .back-color{
    background:linear-gradient(#9ed128 0%,#358b98 80%);
    opacity: 0.8;
  }
</style>
