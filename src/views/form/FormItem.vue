<template>
  <div
    class="form-item"
    :class="[
      { 'form-item--disabled': disabled },
      `form-item--label-position-${formContext?.labelPosition}`,
    ]"
    :style="{
      gridColumn: `span ${gridColSpan ?? formContext?.gridColSpan}`,
      gridRow: `span ${gridRowSpan ?? formContext?.gridRowSpan}`,
    }"
  >
    <FormLabel
      :label="label"
      :label-width="formContext?.labelWidth"
      :label-align="formContext?.labelAlign"
      :label-position="formContext?.labelPosition"
      :label-ellipsis="formContext?.labelEllipsis"
      :required="required"
      :size="size"
    />
    <div class="form-item__content">
      <slot :error="errorMessage" :size="size"></slot>
      <slot v-if="showMessage && errorMessage" :error="errorMessage" name="error">
        <div class="form-item__error">{{ errorMessage }}</div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, nextTick, watch, reactive, toRefs } from 'vue'
import type { FormItemProps, FormRuleItem, ValidateStatus } from './types'
import AsyncValidator from 'async-validator'
import FormLabel from './FormLabel.vue'
import { useInjectForm, useProvideFormItem, type FormItemContext } from './context'

// 使用泛型来定义 props 类型
const props = withDefaults(defineProps<FormItemProps>(), {
  type: 'input',
  disabled: false,
  required: false,
  gridColSpan: 1,
  gridRowSpan: 1,
  rules: () => [],
  showMessage: true,
}) as FormItemProps

const formContext = useInjectForm()

const labelRef = ref<HTMLElement>()
const isLabelOverflow = ref(false)
const validateStatus = ref<ValidateStatus>('')
const errorMessage = ref('')

const size = computed(() => props.size || formContext?.size)
const showMessage = computed(() => props.showMessage || formContext?.showMessage)

// 检查标签是否溢出
const checkLabelOverflow = async () => {
  await nextTick()
  if (labelRef.value) {
    const label = labelRef.value
    isLabelOverflow.value = label.scrollWidth > label.clientWidth
  }
}

onMounted(() => {
  checkLabelOverflow()
})

// 监听标签宽度变化
watch(
  () => formContext?.labelWidth,
  () => {
    checkLabelOverflow()
  },
)

// 监听标签内容变化
watch(
  () => props.label,
  () => {
    checkLabelOverflow()
  },
)

const rules = computed(() => {
  const result: FormRuleItem[] = []
  if (props.rules) {
    result.push(...props.rules)
  }

  if (formContext?.rules) {
    result.push(...(formContext.rules[props.prop] || []))
  }
  return result
})

// 校验方法
const validate = async () => {
  if (rules.value.length === 0) {
    errorMessage.value = ''
    return true
  }
  validateStatus.value = 'validating'
  const value = formContext?.model?.[props.prop]
  const validator = new AsyncValidator({
    [props.prop]: rules.value,
  })

  return validator
    .validate({ [props.prop]: value }, { firstFields: true }, (errors, fields) => {
      if (errors) {
        errorMessage.value = errors[0].message || ''
      }
    })
    .then(() => {
      errorMessage.value = ''
      validateStatus.value = 'success'
      return true
    })
    .catch(() => {
      validateStatus.value = 'error'
      return false
    })
}

const clearValidate = () => {
  errorMessage.value = ''
}

const context: FormItemContext = reactive({
  ...toRefs(props),
  validateStatus,
  validate,
  clearValidate,
  onFieldBlur() {
    nextTick(validate)
  },
  onFieldChange() {
    nextTick(validate)
  },
})

useProvideFormItem(context)

onMounted(() => {
  formContext?.addField(context)
})

defineExpose({
  validate,
  clearValidate,
})
</script>

<style lang="scss" scoped>
@use './styles/formItem.scss';
</style>
