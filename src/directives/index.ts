import copy from './modules/copy'
import longpress from './modules/longpress'
import debounce from './modules/debounce'
import throttle from './modules/throttle'
import watermarker from './modules/watermarker'

// 创建自定义指令数组
const directivesObj: any = {
  copy,
  longpress,
  debounce,
  throttle,
  watermarker
}

const directives = {
  install: (app: any) => {
    Object.keys(directivesObj).forEach(key => {
      // 批量注册
      app.directive(key, directivesObj[key])
    })
  }
}

export default directives