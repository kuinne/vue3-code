import type { FormSize } from './form'

export type LabelAlign = 'left' | 'right'

export type LabelPosition = 'top' | 'inline'

export interface FormLabelProps {
  label?: string
  labelWidth?: string | number | 'auto'

  labelAlign?: LabelAlign
  labelPosition?: LabelPosition

  labelEllipsis?: boolean
  required?: boolean

  size?: string
}
