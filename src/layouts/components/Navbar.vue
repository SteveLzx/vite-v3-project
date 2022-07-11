<script setup lang="ts">
  import { ref } from "vue"
</script>
<template>
  <el-menu
    default-active="1"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-row type="flex" align="middle">
      <span 
        class="iconfont extend"
        @click="$store.commit('base/SHOW_COLLAPSE')"
      >&#xe614;</span>
    </el-row>
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="3">Info</el-menu-item>
    <el-menu-item index="4">Orders</el-menu-item>
  </el-menu>
</template>
<style lang="scss" scoped>
  .extend {
    width: 30px;
    cursor: pointer;
    color: #fff;
  }
</style>