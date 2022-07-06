<template>
  <ul>
    <li v-for="(item) in list" :key="item">{{item}}</li>
  </ul>
</template>
<script lang="ts">
import { toRefs } from 'vue'
import { goodsList } from './model/goodsModel'
export default {
  setup() {
    const { state, queryGoodsList } = goodsList()
    return {
      ...toRefs(state),
      queryGoodsList
    }
  }
}
</script>