<template>
  <el-submenu v-if="item.children && item.children.length" :index="itemIndex">
    <template slot="title">
      <i v-if="item.icon" class="item.icon"></i>{{ item.title }}
    </template>
    <lefter-item v-for="(subItem,i) in item.children" :key="itemIndex+'-'+i" :item="subItem" :itemIndex="itemIndex+'-'+i"></lefter-item>
  </el-submenu>
  <el-menu-item v-else :index="itemIndex" :route="{path:item.path}">
    <i v-if="item.icon" class="item.icon"></i>{{ item.title }}
  </el-menu-item>
</template>

<script>
    export default {
      name: "LefterItem",
      props:['item','itemIndex'],
      methods:{
        handleClick:function (index) {
          console.log('sss',index);
          document.getElementById('menu'+index).style.color='red';
        }
      }
    }
</script>
