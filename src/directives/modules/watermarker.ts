// 自定义加水印指令
import { HTMLElementExtend, BindingExtend } from '../types'

const watermarker = {
  beforeMount(el: HTMLElementExtend, binding: BindingExtend) {
    const {
      text, font, color
    } = binding.value
    const canvasNode = document.createElement('canvas')
    el.appendChild(canvasNode)
    canvasNode.width = 200
    canvasNode.height = 150
    canvasNode.style.display = 'none'
    const canvasNodes = canvasNode.getContext('2d')
    if (canvasNodes !== null) {
      canvasNodes.rotate((-20 * Math.PI) / 180)
      canvasNodes.font = font || '14px'
      canvasNodes.fillStyle = color || 'rgba(180, 180, 180, 0.4)'
      canvasNodes.textAlign = 'center'
      canvasNodes.textBaseline = 'middle'
      canvasNodes.fillText(text, canvasNode.width / 10, canvasNode.height / 2)
      el.style.backgroundImage = `url(${canvasNode.toDataURL('image/png')})`
    }
  }
}

export default watermarker