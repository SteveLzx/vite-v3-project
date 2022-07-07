<template>
  <ul>
    <li v-for="(item) in list" :key="item" v-copy="item">{{item}}</li>
  </ul>
  <div v-longpress="handleLongpress">长按按钮</div>
  <button v-debounce="[handleDebounce, 'click', 1000, true]">防抖点击</button>
  <button v-throttle="[handleDebounce, 'click', 2000, true]">节流点击</button>
</template>
<script lang="ts">
import { toRefs } from 'vue'
import { goodsList } from './model/goodsModel'
export default {
  setup() {
    const { state, queryGoodsList } = goodsList()
    
    const handleLongpress = () => {
      console.log("handleLongpress")
    }

    const handleDebounce = () => {
      console.log("handleDebounce")
    }

    return {
      ...toRefs(state),
      queryGoodsList,
      handleLongpress,
      handleDebounce
    }
  }
}
</script>