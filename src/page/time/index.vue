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
  </div>
</template>

<script>
  import openWindow from '@/utils/window'
  import {parseTime,formatTime} from '../../utils/time'
    export default {
      name: "Time",
      data(){
        return{
          time:new Date()
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
        }
      }
    }
</script>

<style scoped>

</style>
