<template>
  <ul>
    <li v-for="(item) in list" :key="item" v-copy="item">{{item}}</li>
  </ul>
  <div v-longpress="handleLongpress">长按按钮</div>
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
    
    return {
      ...toRefs(state),
      queryGoodsList,
      handleLongpress
    }
  }
}
</script>