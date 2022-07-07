
export interface HTMLElementExtend extends HTMLElement {
  $value: any
  handle: any
  $type: string
}

export interface BindingExtend {
  instance: any
  value: any
  oldValue: any
  arg: any
  modifiers: any
  dir: any
}
