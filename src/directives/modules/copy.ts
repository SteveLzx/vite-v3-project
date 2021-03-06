// 赋值指令
import { ElMessage } from 'element-plus'
import { HTMLElementExtend, BindingExtend } from '../types'

const copy = {
  mounted(el: HTMLElementExtend, binding: BindingExtend) {
    const { value } = binding
    el.$value = value
    el.handle = () => {
      if (!el.$value) {
        // 值为空的时候，提示
        ElMessage.warning('复制的值不能为空')
      } else {
        if ((window as any).clipboardData) {
          (window as any).clipboardData.setData('text', el.$value)
        } else {
          (function (content) {
            document.oncopy = (e: any) => {
              e.clipboardData.setData('text', content)
              e.preventDefault()
              document.oncopy = null
            }
          })(el.$value)
          document.execCommand('Copy')
        }
        ElMessage.success('复制成功')
      }
    }
    el.addEventListener('click', el.handle)
  },
  beforeUpdate(el: HTMLElementExtend, binding: BindingExtend) {
    // 更新
    const { value } = binding
    el.$value = value
  },
  unmounted(el: HTMLElementExtend) {
    // 卸载
    el.removeEventListener('click', el.handle)
  }
}

export default copy