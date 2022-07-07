// 节流自定义指令
import { HTMLElementExtend, BindingExtend } from '../types'

const throttle = {
  mounted(el: HTMLElementExtend, binding: BindingExtend) {
    /**
     * @params func--执行事件
     * @params type--事件类型
     * @params wait--时间间隔
     * @params immediate-- false事件冒泡，true事件捕获
     */
    const [
      func,
      type = 'click',
      wait = 300,
      immediate = true
    ] = binding.value;

    el.$type = type;

    let timer: any = null
    // 定义执行函数
    el.handle = ()=> {
      if (timer !== null) return
      timer = setTimeout(() => {
        func()
        timer = null
      }, wait)
    }

    // 事件监听
    el.addEventListener(type, el.handle, immediate)
  },
  unmounted(el: HTMLElementExtend) {
    el.removeEventListener(el.$type, el.handle)
  }
}

export default throttle