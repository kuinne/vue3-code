import type { FormContext, FormItemContext } from './type.d'
import type { InjectionKey } from 'vue'
export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey')

export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey')
