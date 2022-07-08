// 限制表情输入自定义指令
import { HTMLElementExtend, BindingExtend } from '../types'

// 查找input
const findElement = (parent: HTMLElement, type: string) => {
  return parent.tagName.toLocaleLowerCase() === type ? parent : parent.querySelector(type)
}

// 创建标签
const trigger = (el: HTMLElement, type: string) => {
  const e = new CustomEvent(type)
  el.dispatchEvent(e)
}

const emoji = {
  mounted(el: HTMLElementExtend, binding: BindingExtend) {
    // 定义正则规则
    const regRule = /[^u4E00-u9FA5|d|a-zA-Z|rns,.?!，。？！…—&$=()-+/*{}[]]|s/g

    // 定义执行函数
    el.$inp = findElement(el, 'input')
    el.$inp.handle = () => {
      const val = el.$inp.value
      el.$inp.value = val.replace(regRule, '')
      // console.log(el.$inp.value)
      trigger(el.$inp, 'input')
    }
    el.$inp.addEventListener('keyup', el.$inp.handle)
  },
  unmounted(el: HTMLElementExtend) {
    el.$inp.removeEventListener('keyup', el.$inp.handle)
  }
}

export default emoji