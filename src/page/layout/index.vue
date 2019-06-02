<template>
  <div>
    <el-container>
      <el-header>
        <!--头部导航-->
        <Header/>
      </el-header>
      <!--左侧导航-->
      <el-container>
        <el-aside width="300px">
          <keep-alive>
            <Lefter/>
          </keep-alive>
        </el-aside>
        <el-main>
          <!--中间内容-->
          <div class="sys-content">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
        </el-main>
      </el-container>
      <el-footer>
        <!--底部导航-->
        <Footer/>
      </el-footer>
    </el-container>
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
.sys-content{

}
</style>
