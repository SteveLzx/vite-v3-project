// 自定义权限管理指令
import store from '@/store'
import { HTMLElementExtend, BindingExtend } from '../types'

const premission = {
  mounted(el: HTMLElementExtend, binding: BindingExtend) {
    const { value } = binding
    const roles = store.getters['base/roles']
    if (Array.isArray(value) && value.length > 0) {
      const permissionsRoles = value
      const hasPermission = roles.some((role: string) => {
        return permissionsRoles.includes(role)
      })
      if (!hasPermission) {
        el.parentNode?.removeChild(el)
      }
    } else {
      throw new Error("need roles! like v-premission=['admin', 'editor']");
    }
  }
}

export default premission