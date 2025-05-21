import type { LabelAlign, LabelPosition } from './form-label'
import type { FormRuleItem } from './validation'

export type FormLayout = 'horizontal' | 'vertical' | 'grid'

export type FormSize = 'small' | 'default' | 'large'

export interface FormProps {
  model?: Record<string, unknown>
  layout?: FormLayout
  labelAlign?: LabelAlign
  labelPosition?: LabelPosition
  labelWidth?: string | number
  labelEllipsis?: boolean
  disabled?: boolean
  gridCols?: number
  gridColSpan?: number
  gridRowSpan?: number
  rowGap?: string
  colGap?: string
  size?: FormSize

  rules?: Record<string, FormRuleItem[]>

  /** 显示错误校验信息 默认为 true */
  showMessage?: boolean
}

export interface FormInstance {
  validate: () => Promise<boolean>
  resetFields: () => void
  clearValidate: () => void
}
