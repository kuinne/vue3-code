import { inject, provide, type InjectionKey } from 'vue'
import type { FormItemProps, FormProps, ValidateStatus } from './types'

export interface FormContext extends FormProps {
  getField: (prop: string) => FormItemContext | undefined
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void

  validateField: (prop: string) => Promise<boolean>

  validate: () => Promise<boolean>

  clearValidate: () => void
}

export interface FormItemContext extends FormItemProps {
  validateStatus: ValidateStatus
  validate: () => Promise<boolean>
  clearValidate: () => void

  onFieldBlur: () => void
  onFieldChange: () => void
}

export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey')

export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey')

export function useProvideForm(context: FormContext) {
  provide(formContextKey, context)
}

export function useInjectForm(defaultValue?: FormContext) {
  return inject(formContextKey, defaultValue)
}

export function useProvideFormItem(context: FormItemContext) {
  provide(formItemContextKey, context)
}

export function useInjectFormItem(defaultValue?: FormItemContext) {
  return inject(formItemContextKey, defaultValue)
}
