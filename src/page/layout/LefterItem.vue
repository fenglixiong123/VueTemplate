<template>
  <el-submenu v-if="item.children && item.children.length" :index="navIndex">
    <!--创建父级菜单-->
    <template slot="title"><i v-if="item.icon" :class="item.icon"></i>{{ item.title }}</template>
    <!--创建子级菜单-->
    <lefter-item v-for="(subItem,i) in item.children" :item="subItem" :key="navIndex+'-'+i" :navIndex="navIndex+'-'+i"></lefter-item>
  </el-submenu>

  <el-menu-item class="menuItem" v-else :index="item.path" :route="{path:item.path}"><i v-if="item.icon" :class="item.icon"></i>{{ item.title }}</el-menu-item>
</template>

<script>
    export default {
      name: "LefterItem",
      props:['item','navIndex'],
      methods:{

      }
    }
</script>
