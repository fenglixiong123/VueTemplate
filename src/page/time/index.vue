<template>
  <div>
    Time
    <hr/>
    <button @click="openWindows">打开百度之窗</button>
    <button @click="formatTime">formatTime</button>
    <button @click="friendlyTime">friendlyTime</button>
    <br/>
    <br/>
    {{time}}
    <hr/>
    <button @click="findMenuList">获取菜单</button>
    <button @click="findPowerList">获取权限</button>
    <br/>
    <br/>
    <p v-for="(item,index) in lists">[{{index+1}}]——{{item}}</p>
  </div>
</template>

<script>
  import openWindow from '@/utils/window'
  import {apiMenuListByAdminId} from '@/api/api_menu'
  import {apiPowerListByAdminId} from '@/api/api_power'
  import {parseTime,formatTime} from '../../utils/time'
    export default {
      name: "Time",
      data(){
        return{
          time:new Date(),
          lists:[],
        }
      },
      methods:{
        openWindows:function () {
          openWindow("http://www.baidu.com","百度下哈",800,500);
        },
        formatTime:function(){
          console.log("format time")
          this.time = parseTime(new Date());
        },
        friendlyTime:function () {
          console.log("show time")
          this.time = formatTime(new Date().getTime()-60*60*1000,'{y}/{m}/{d} {h}:{i}:{s}');
        },
        findMenuList:function () {
          console.log("findMenuList");
          apiMenuListByAdminId(1).then(res=>{
            this.lists = res.data;
          }).catch(err=>{console.log(err)})
        },
        findPowerList:function () {
          console.log("findPowerList");
          apiPowerListByAdminId(1).then(res=>{
            this.lists = res.data;
          }).catch(err=>{console.log(err)})
        }
      }
    }
</script>

<style scoped>

</style>
