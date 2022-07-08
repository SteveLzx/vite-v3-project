// 自定义拖拽指令
import { HTMLElementExtend, BindingExtend } from '../types'

// 定义移动块对象属性type
interface MoveObjType {
  top: number
  left: number
  currentX: number
  currentY: number
  flag: boolean
  cWidth: number
  cHeight: number
  tWidth: number
  tHeight: number
}

/**
 * 定义拖拽移动函数
 * @param bar 鼠标点击控制拖拽的元素
 * @param target 移动的元素
 * @param callback 移动后的回调
 */
const _draggable = (bar: HTMLElementExtend, target: HTMLElementExtend, callback: Function) => {
  let moveObj: MoveObjType = {
    top: 0,
    left: 0,
    currentX: 0,
    currentY: 0,
    flag: false,
    cWidth: 0,
    cHeight: 0,
    tWidth: 0,
    tHeight: 0
  }

  // 拖动块添加样式
  bar.style.cursor = 'move'

  // 拖动块鼠标按下
  bar.onmousedown = (event) => {
    console.log('onmousedown')
    const e = event || window.event
    const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = target
    const { clientX, clientY } = e
    const { clientWidth, clientHeight } = document.body
    // 鼠标按下时初始化moveObj
    moveObj = {
      top: offsetTop,
      left: offsetLeft,
      currentX: clientX,
      currentY: clientY,
      flag: true,
      cWidth: clientWidth,
      cHeight: clientHeight,
      tWidth: offsetWidth,
      tHeight: offsetHeight
    }

    // 给被拖动的块初始化样式
    target.style.margin = '0'
    target.style.top = `${moveObj.top}px`
    target.style.left = `${moveObj.left}px`
  }

  // 鼠标移动
  document.onmousemove = (event) => {
    console.log('onmousemove')
    const e = event || window.event
    const { flag, cWidth, tWidth, cHeight, currentX, currentY, left, top } = moveObj
    const { clientX, clientY } = e
    if (flag) {
      const nowX = clientX
      const nowY = clientY
      // 差异距离
      const disX = nowX - currentX
      const disY = nowY - currentY
      // 最终距离位置
      let zLeft = 0
      let zTop = 0

      zLeft = parseInt(String(left)) + disX
      // 限制x轴的范围
      const _zLeft1 = -parseInt(String(tWidth / 2))
      if (zLeft <= _zLeft1) zLeft = _zLeft1
      const _zLeft2 = cWidth - parseInt(String(tWidth / 2))
      if (zLeft >= _zLeft2) zLeft = _zLeft2

      zTop = parseInt(String(top)) + disY
      // 限制y轴的范围
      if (zTop <= 0) zTop = 0
      const _zTop = cHeight - parseInt(String(cHeight / 2))
      if (zTop >= _zTop) zTop = _zTop

      // 执行移动
      target.style.left = `${zLeft}px`
      target.style.top = `${zTop}px`

      callback(zLeft, zTop)
    }
  }

  // 鼠标抬起
  document.onmouseup = () => {
    console.log('onmouseup')
    moveObj.flag = false
    document.onmousemove = null
    document.onmouseup = null
  }
}

const draggable = {
  mounted(el: HTMLElementExtend, binding: BindingExtend) {
    const [ bar, callback ] = binding.value
    _draggable(<HTMLElementExtend>el.querySelector(`.${bar}`), el, callback)
  }
}

export default draggable