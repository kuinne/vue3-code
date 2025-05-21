<template>
  <div
    class="form-item__label"
    :class="[
      `form-item__label--${labelAlign}`,
      { 'form-item__label--ellipsis': labelEllipsis, 'form-item__label--required': required },
      size && `form-item__label--${size}`,
    ]"
    :style="{
      width: labelWidth === 'auto' ? undefined : labelWidth,
      flex: labelPosition === 'top' ? undefined : `0 0 ${labelWidth}`,
    }"
  >
    <el-tooltip
      v-if="labelEllipsis"
      :content="label"
      placement="top"
      :disabled="!isLabelOverflow"
      effect="dark"
    >
      <label ref="labelRef" class="label-text" :class="{ 'label-text--ellipsis': labelEllipsis }">
        {{ label }}
      </label>
    </el-tooltip>
    <label v-else class="label-text">{{ label }}</label>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import type { FormLabelProps } from './types'

const props = withDefaults(defineProps<FormLabelProps>(), {
  label: '',
  labelAlign: 'left',
  labelPosition: 'inline',
})

const labelRef = ref<HTMLElement>()
const isLabelOverflow = ref(false)

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
  () => props.labelWidth,
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
</script>

<style lang="scss" scoped>
@use './styles/formLabel.scss';
</style>
