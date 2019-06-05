<template>
  <div>
    <app-section :title="'欢迎您 , '+userInfo.username">
      <el-row>
        <el-col :span="8">
          <el-card shadow="always" :body-style="cardStyle">
            <p>用户ID：{{userInfo.id}}</p>
            <p>用户名：{{userInfo.username}}</p>
            <p>昵称：{{userInfo.nickname}}</p>
            <p>性别：{{userInfo.sex===0?'女':'男'}}</p>
            <p>Email：{{userInfo.email}}</p>
            <p>Phone：{{userInfo.phone}}</p>
            <p>地址：{{userInfo.address}}</p>
          </el-card>
        </el-col>
      </el-row>
    </app-section>

  </div>
</template>

<script>

  import AppSection from "../../components/AppSection/index";
  export default {
    name: 'Home',
    components: {AppSection},
    data(){
      return{
        cardStyle:{
          padding:'20px',
          color:'yellow',
          backgroundColor:'grey'
        }
      }
    },
    computed:{
      userInfo:function () {
        return this.$store.getters.userInfo;
      }
    },
    methods:{
      //全局loading加载器
      openLoading(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(()=>{
          loading.close();
        },2000)
      }
    }
  }
</script>

<style scoped>

</style>
