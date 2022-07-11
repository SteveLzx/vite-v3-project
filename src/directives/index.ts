import copy from './modules/copy'
import longpress from './modules/longpress'
import debounce from './modules/debounce'
import throttle from './modules/throttle'
import watermarker from './modules/watermarker'
import draggable from './modules/draggable'
import emoji from './modules/emoji'
import premission from './modules/premission'

// 创建自定义指令数组
const directivesObj: any = {
  copy,
  longpress,
  debounce,
  throttle,
  watermarker,
  draggable,
  emoji,
  premission
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