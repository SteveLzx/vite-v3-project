
export interface HTMLElementExtend extends HTMLElement {
  $value?: any
  handle?: any
}

export interface BindingExtend {
  instance: any
  value: any
  oldValue: any
  arg: any
  modifiers: any
  dir: any
}
