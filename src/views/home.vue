<template>
  <div>首页</div>
  <div>{{$store.state.count}}</div>
  <el-button @click="$store.commit('increment')">+1</el-button>
</template>