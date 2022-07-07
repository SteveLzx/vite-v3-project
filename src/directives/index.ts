import copy from "./modules/copy"

// 创建自定义指令数组
const directivesObj: any = {
  copy
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