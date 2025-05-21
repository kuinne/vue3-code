import type { FormSize } from './form'
import type { FormRuleItem } from './validation'

export type FormValue = string | number | boolean | Date | null | undefined

export interface FormItemProps {
  prop: string
  label?: string
  disabled?: boolean
  required?: boolean
  rules?: FormRuleItem[]
  gridColSpan?: number
  gridRowSpan?: number

  size?: FormSize

  /** 显示错误校验信息 默认为 true */
  showMessage?: boolean
}
