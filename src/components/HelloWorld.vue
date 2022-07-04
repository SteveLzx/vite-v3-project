<script setup lang="ts">
import {ref, Ref } from 'vue'

defineProps<{ msg: string }>()
const count = ref(0)

// 定义事件
const emit = defineEmits<{ (event: 'add'): void }>()
const onEmitClick = () => {
  emit('add')
}

// 导出
// defineExpose({count})

interface exFace {
  count: Ref<number>,
  count1?: number,
}

const obj: exFace = {
  count: ref(10)
}

defineExpose(obj)

const add1 = () => {
  count.value += 1
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <button type="button" @click="count++">count is: {{ count }}</button>
  <button type="button" @click="onEmitClick">emit</button>
</template>
