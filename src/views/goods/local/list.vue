<template>
  <ul>
    <li v-for="(item) in list" :key="item" v-copy="item">{{item}}</li>
  </ul>
  <div v-longpress="handleLongpress">长按按钮</div>
  <button v-debounce="[handleDebounce, 'click', 1000, true]">防抖点击</button>
  <button v-throttle="[handleDebounce, 'click', 2000, true]">节流点击</button>

  <div class="water-marker">
    <div v-watermarker="{text:'zzz - 版权所有', color:'rgba(180, 180, 180, 0.8)'}">
      <div class="water-marker-item">测试问题啊测试问题啊测试问题啊测试问题啊测试问题啊测试问题啊</div>
    </div>
  </div>
  <!-- <div class="c_draggable" v-draggable="['c_draggable__header', draggableCallback]">
    <div class="c_draggable__header">拖拽块头部</div>
    <div class="c_draggable__body">拖拽块内容</div>
  </div> -->

  <el-input v-model="inputValue" v-emoji />

  <el-button type="primary" v-premission="['admin']">权限控制按钮1</el-button>
  <el-button v-premission="['editor']">权限控制按钮2</el-button>
</template>
<script lang="ts">
import { toRefs, ref, onMounted } from 'vue'
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

    const draggableCallback = () => {
      // console.log("draggableCallback")
    }

    const inputValue = ref('')

    return {
      ...toRefs(state),
      queryGoodsList,
      handleLongpress,
      handleDebounce,
      draggableCallback,
      inputValue
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
  .c_draggable {
    position: fixed;
    bottom: 100px;
    left: 0;
    width: 200px;
    height: 200px;
    background-color: red;
  }
</style>