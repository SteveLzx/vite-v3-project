// 长按指令
import { HTMLElementExtend, BindingExtend } from '../types'

const longpress = {
  mounted(el: HTMLElementExtend, binding: BindingExtend) {
    // 首先判断value传入的是不是一个函数
    const { value} = binding
    if (typeof value !== 'function') {
      throw 'callback must be a function'
    }
    // 定义变量
    let timer: any = null
    // 创建计时器（2s后执行函数）
    const start = (e: any) => {
      if (e.type === 'click' && e.button !== 0) {
        return
      }
      if (timer === null) {
        timer = setTimeout(() => {
          // 执行函数
          handler(e)
        }, 2000)
      }
    }

    // 取消计时器
    const cancel = (e: any) => {
      if (timer !== null) {
        clearTimeout(timer)
        timer = null
      }
    }

    // 创建运行函数
    const handler = (e: any) => {
      value(e)
    }

    // 添加事件监听器
    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)
    // 取消计时器
    el.addEventListener('click', cancel)
    el.addEventListener('mouseout', cancel)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)
  },
  update(el: HTMLElementExtend, binding: BindingExtend) {
    const { value } = binding
    el.$value = value
  },
  unmounted(el: HTMLElementExtend) {
    el.removeEventListener('click', el.handle)
  }
}

export default longpress