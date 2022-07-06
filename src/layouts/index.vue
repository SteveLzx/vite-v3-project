<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import AppAside from './components/AppAside.vue'
import Tags from './components/Tags.vue'

// 缓存目录
const includeRouterList = ref<string[]>([])
const route = useRoute()
watch(()=> route, (newVal, oldVal)=> {
  console.log(newVal.meta)
  if (newVal.meta.keepAlive && includeRouterList.value.indexOf(newVal!.name) === -1) {
    includeRouterList.value.push(newVal!.name)
  }
}, { deep: true })

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
        <Tags />
      </el-header>
      <el-main>
        <router-view v-slot="{ Component }">
          <keep-alive :include="includeRouterList">
            <component :is="Component" />
          </keep-alive>
        </router-view>
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
  height: 98px;
}
</style>