<template>
  <ul>
    <li v-for="(item) in list" :key="item" v-copy="item">{{item}}</li>
  </ul>
  <div v-longpress="handleLongpress">长按按钮</div>
  <button v-debounce="[handleDebounce, 'click', 1000, true]">防抖点击</button>
  <button v-throttle="[handleDebounce, 'click', 2000, true]">节流点击</button>

  <div class="water-marker">
    <div v-watermarker="{text:'卡洛背心 - 版权所有', color:'rgba(180, 180, 180, 0.8)'}">
      <div class="water-marker-item">测试问题啊测试问题啊测试问题啊测试问题啊测试问题啊测试问题啊</div>
    </div>
  </div>  
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
<style lang="scss" scoped>
  .water-marker{
    height: 300px;
    .water-marker-item{
      line-height: 300px;
    }
  }
</style>