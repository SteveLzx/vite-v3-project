<script setup lang="ts">
import { ArrowLeft,  ArrowRight, CircleClose } from '@element-plus/icons-vue'
import { ref, onMounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
// import { routes } from '@/router'

// 获取当前所有路由数组
const router = useRouter()

// 当前路由
const currentRoute = ref({})

const tagsRef = ref<HTMLDivElement>()

watch(() => router.currentRoute.value, (to) => {
  nextTick(() => {
    currentRoute.value = to
    getTagElementByName()
  })
}, { immediate: true, deep: true })

const getTagElementByName = () => {
  (tagsRef.value as any).forEach((tag: any) => {
    if (tag.$attrs['data-router-item'].path === currentRoute.value.path) {
      moveToView(tag.$el);
    }
  })
}


const scrollOuterRef = ref<HTMLDivElement>()
const scrollBodyRef = ref<HTMLDivElement>()
const tagBodyLeft = ref(0)

const moveToView = (tag: any) => {
  // console.log(tag)
  // 赋值当前元素
  const outerWidth = scrollOuterRef.value!.offsetWidth
  const bodyWidth = scrollBodyRef.value!.offsetWidth
  // console.log('outerWidth', outerWidth)
  // console.log('bodyWidth', bodyWidth)
  const tagOffsetLeft = tag.offsetLeft
  // console.log('tagOffsetLeft', tagOffsetLeft)
  const tagOffsetWidth = tag.offsetWidth
  // console.log('tagOffsetWidth', tagOffsetWidth)  
  if (bodyWidth < outerWidth) {
    tagBodyLeft.value = 0;
  } else {
    // console.log('tagBodyLeft', tagBodyLeft.value)
    // console.log('outerWidth / 2', outerWidth / 2)
    const halfOuterWidth = outerWidth / 2
    if (halfOuterWidth > tagOffsetLeft) {
      tagBodyLeft.value = 0;
    } else {
      // 获取最大滚动距离
      const maxScollWidth = bodyWidth - outerWidth
      const maybeScollWidth = tagOffsetWidth / 2 + tagOffsetLeft - halfOuterWidth
      tagBodyLeft.value = -(Math.min(maxScollWidth, maybeScollWidth));
    }    
  }
  // console.log('tagBodyLeft.value', tagBodyLeft.value)
}

// 左点击
const handleToLeft = () => {
  // console.log('向左点击')
  // 获取当前tag的前一个tag
  const currentTagIndex = tags.value.findIndex(tag => tag.path === currentRoute.value.path)
  // console.log('currentTagIndex', currentTagIndex)
  // 当前下标为0 直接返回
  if (currentTagIndex === 0) return;
  // 当前下标大于0，找到前一个元素
  const tag = tags.value[currentTagIndex - 1]
  router.push({ path: tag.path })
}

// 右点击
const handleToRight = () => {
  // console.log('向右点击')
  // 获取当前tag的后一个tag
  const currentTagIndex = tags.value.findIndex(tag => tag.path === currentRoute.value.path)
  // console.log('currentTagIndex', currentTagIndex)
  // 当前下标为最后一个时 直接返回
  if (currentTagIndex === tags.value.length - 1) return;
  // 当前下标大于0，找到前一个元素
  const tag = tags.value[currentTagIndex + 1]
  router.push({ path: tag.path })  
}

// 点击tag
const handleTagChange = (item: any) => {
  router.push({ path: item.path })
}

// 获取当前所有路由数组
const tags = ref([
  { fullPath: '/home', path: '/home', meta: { title: 'page首页' } },
  { fullPath: '/home', path: '/home1', meta: { title: 'page首页1' } },
  { fullPath: '/home', path: '/home2', meta: { title: 'page首页2' } },
  { fullPath: '/home', path: '/home3', meta: { title: 'page首页3' } },
  { fullPath: '/home', path: '/home4', meta: { title: 'page首页4' } },
  { fullPath: '/home', path: '/home5', meta: { title: 'page首页5' } },
  { fullPath: '/home', path: '/home6', meta: { title: 'page首页6' } },
  { fullPath: '/home', path: '/home7', meta: { title: 'page首页7' } },
  { fullPath: '/home', path: '/home8', meta: { title: 'page首页8' } },
  { fullPath: '/home', path: '/home9', meta: { title: 'page首页9' } },
  { fullPath: '/home', path: '/home10', meta: { title: 'page首页10' } },
  { fullPath: '/home', path: '/home11', meta: { title: 'page首页11' } },
  { fullPath: '/home', path: '/home12', meta: { title: 'page首页12' } },
  { fullPath: '/home', path: '/home13', meta: { title: 'page首页13' } },
  { fullPath: '/home', path: '/home14', meta: { title: 'page首页14' } },
  { fullPath: '/home', path: '/home15', meta: { title: 'page首页15' } },
  { fullPath: '/home', path: '/home16', meta: { title: 'page首页16' } },
  { fullPath: '/home', path: '/home17', meta: { title: 'page首页17' } },
  { fullPath: '/home', path: '/home18', meta: { title: 'page首页18' } },
  { fullPath: '/home', path: '/home19', meta: { title: 'page首页19' } },
  { fullPath: '/home', path: '/home20', meta: { title: 'page首页20' } },
  { fullPath: '/home', path: '/home21', meta: { title: 'page首页21' } },
  { fullPath: '/home', path: '/home22', meta: { title: 'page首页22' } },
  { fullPath: '/home', path: '/home23', meta: { title: 'page首页23' } },
  { fullPath: '/home', path: '/home24', meta: { title: 'page首页24' } },
  { fullPath: '/home', path: '/home25', meta: { title: 'page首页25' } },
  { fullPath: '/home', path: '/home26', meta: { title: 'page首页26' } },
  { fullPath: '/home', path: '/home27', meta: { title: 'page首页27' } },
  { fullPath: '/home', path: '/home28', meta: { title: 'page首页28' } },
  { fullPath: '/home', path: '/home29', meta: { title: 'page首页29' } },
  { fullPath: '/home', path: '/home30', meta: { title: 'page首页30' } },
])

</script>
<template>
  <div class="flex border padding-2-4">
    <el-button class="mr-4" type="primary" plain :icon="ArrowLeft" @click="handleToLeft"></el-button>
    <div class="scroll_outer" ref="scrollOuterRef">
      <TransitionGroup name="list">
        <div class="scroll_body" key="list" :style="{ left: tagBodyLeft + 'px' }" ref="scrollBodyRef">
            <el-tag
              ref="tagsRef"
              class="cus_tag"
              v-for="tag in tags"
              :key="tag.name"
              :type="tag.path !== currentRoute!.path ? 'info' : ''"
              effect="plain"
              closable
              :data-router-item="tag"
              @click="handleTagChange(tag)"
            >{{ tag.meta.title }}</el-tag>           
        </div>
      </TransitionGroup>
    </div>
    <el-button class="ml-4" type="primary" plain  @click="handleToRight"><el-icon><ArrowRight /></el-icon></el-button>
    <el-dropdown>
      <el-button class="ml-4" type="primary" plain><el-icon><CircleClose /></el-icon></el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>全部关闭</el-dropdown-item>
          <el-dropdown-item>关闭其他</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>    
  </div>
</template>
<style lang="scss" scoped>
  @import 'styles/common';
  .flex {
    display: flex;
  }
  .border {
    border: 1px solid $--color-border-split;
  }
  .padding-2-4 {
    padding: 2px 4px;
  }
  .cus_tag {
    height: 32px;
    flex-shrink: 0;
    cursor: pointer;
    margin: 0 2px;
  }
  .mr-4 {
    margin-right: 4px;
  }  
  .ml-4 {
    margin-left: 4px;
  }
  .scroll_outer {
    flex: 1;
    position: relative;
    overflow: auto;
    &::-webkit-scrollbar {
    display: none;
    }
    .scroll_body {
      position: absolute;
      display: inline-block;
      overflow: visible;
      white-space: nowrap;
    }
  }

  .list-move {
    transition: all 0.5s ease;
  }
</style>