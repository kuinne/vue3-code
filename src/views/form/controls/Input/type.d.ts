import type { FormSize } from '../../types'

export interface Props {
  modelValue?: string | number

  type?: 'text' | 'password' | 'number' | 'textarea'

  placeholder?: string

  disabled?: boolean

  clearable?: boolean

  size?: FormSize

  error?: boolean

  /** 输入时是否触发表单的校验 默认为 true*/
  validateEvent?: boolean
}
