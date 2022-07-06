import { createApp } from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入store
import store from './store'
// 引入element
import ElementPlus from 'element-plus'
// 引入全局样式
import 'styles/index.scss'

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
