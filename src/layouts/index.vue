<script setup lang="ts">
import AppMian from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
import AppAside from './components/AppAside.vue'
</script>
<template>
  <el-container class="cus_container">
    <el-aside 
      :width="$store.state.base.isCollapse ? '63px' : '200px'"
      class="cus_aside"
    >
      <AppAside />
    </el-aside>
    <el-container>
      <el-header class="cus_header">
        <Navbar />
      </el-header>
      <el-main>
        <AppMian />
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="scss" scoped>
@import 'styles/common.scss';
.cus_container {
  height: 100%;
}
.cus_aside {
  background-color: #545c64;
}
.cus_header {
  padding: 0;
}
</style>