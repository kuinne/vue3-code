// 验证规则接口
import type { RuleItem } from 'async-validator'

export type FormRuleItem = RuleItem

export type ValidateStatus = 'error' | 'validating' | 'success' | ''
