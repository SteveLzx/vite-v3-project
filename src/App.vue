<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import AL from 'comp/HelloWorld.vue'
import axios from 'axios'
// import { ref } from 'vue'

async function queryData() {
  const { data } = await axios.get('/api/get')
  console.log(data)
}

// queryData()

// async function queryDevOrProData() {
//   const { data } = await axios.get(import.meta.env.VITE_BASE_API)
//   console.log(data)  
// }

// queryDevOrProData()

// const hw = ref(null)

// const onAppAdd = () => {
//   console.log('app组件触发')
//   console.log(hw.value.count)
// }

</script>

<template>
  <router-view />
  <!-- <el-button type="primary">Primary</el-button> -->
  <!-- <img alt="Vue logo" src="/img/young-woman-relaxing-on-a-rowing-boat-enjoying-the-nature-picjumbo-com.jpg" style="width: 100%;" /> -->

  <!-- <img alt="Vue logo" src="/img/logo.png" /> -->
  <!-- <AL msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <!-- <img alt="Vue logo" src="./assets/image/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" @add="onAppAdd" ref="hw" /> -->
</template>

