<template>
  <div
    ref="formRef"
    class="form"
    :class="[
      `form--layout-${layout}`,
      `form--label-position-${labelPosition}`,
      `form--size-${size}`,
    ]"
    :style="{
      '--form-grid-cols': layout === 'grid' ? gridCols : undefined,
      '--form-row-gap': rowGap,
      '--form-col-gap': colGap,
    }"
    v-bind="$attrs"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, nextTick, computed, reactive, toRefs } from 'vue'
import type { FormProps } from './types/form'

import { useProvideForm, type FormContext, type FormItemContext } from './context'

const props = withDefaults(defineProps<FormProps>(), {
  model: () => ({}),
  layout: 'horizontal',
  labelAlign: 'right',
  labelPosition: 'inline',
  labelWidth: '100px',
  disabled: false,
  gridCols: 3,
  gridColSpan: 1,
  gridRowSpan: 1,
  rowGap: '20px',
  colGap: '20px',
  size: 'default',
})

const formRef = ref<HTMLElement>()
const maxLabelWidth = ref(0)

const fields: FormItemContext[] = []

const getField: FormContext['getField'] = (prop) => {
  return fields.find((field) => field.prop === prop)
}

const addField: FormContext['addField'] = (field) => {
  fields.push(field)
}

const removeField: FormContext['removeField'] = (field) => {
  if (field.prop) {
    fields.splice(fields.indexOf(field), 1)
  }
}

const validateField: FormContext['validateField'] = async (prop) => {
  const field = getField(prop)
  if (!field) return true
  return field.validate()
}

const validate: FormContext['validate'] = async () => {
  let flag = true

  for (const field of fields) {
    flag = (await field.validate()) && flag
  }
  return flag
}

const clearValidate: FormContext['clearValidate'] = () => {
  fields.forEach((field) => {
    field.clearValidate()
  })
}
// 计算最大标签宽度
const calculateMaxLabelWidth = async () => {
  if (
    (props.layout === 'vertical' || props.layout === 'horizontal') &&
    props.labelPosition === 'inline' &&
    props.labelWidth === 'auto'
  ) {
    await nextTick()
    const labels = formRef.value?.getElementsByClassName('form-item__label')

    if (labels && labels.length > 0) {
      let maxWidth = 0
      // 创建临时span计算文本宽度
      const tempSpan = document.createElement('span')
      tempSpan.style.visibility = 'hidden'
      tempSpan.style.position = 'absolute'
      tempSpan.style.whiteSpace = 'nowrap'
      tempSpan.style.fontSize = '14px'
      document.body.appendChild(tempSpan)

      // 将HTMLCollection转换为数组
      Array.from(labels).forEach((label: Element) => {
        const text = label.textContent?.trim() || ''
        tempSpan.textContent = text
        const width = tempSpan.getBoundingClientRect().width
        maxWidth = Math.max(maxWidth, width)
      })

      document.body.removeChild(tempSpan)
      // 添加padding
      maxLabelWidth.value = maxWidth + 16
    }
  }
}

// 监听布局和标签宽度的变化
watch(
  () => [props.layout, props.labelWidth, props.labelPosition],
  () => {
    calculateMaxLabelWidth()
  },
)

onMounted(() => {
  calculateMaxLabelWidth()
})

// 统一的标签宽度
const unifiedLabelWidth = computed(() => {
  if (
    props.layout === 'vertical' &&
    props.labelPosition === 'inline' &&
    props.labelWidth === 'auto'
  ) {
    return `${maxLabelWidth.value}px`
  }
  return props.labelWidth
})

useProvideForm(
  reactive({
    ...toRefs(props),
    getField,
    addField,
    removeField,
    validateField,
    validate,
    clearValidate,
    unifiedLabelWidth,
  }),
)

defineExpose({
  validate,
  validateField,
  clearValidate,
})
</script>

<style lang="scss" scoped>
@use './styles/form.scss';
</style>
