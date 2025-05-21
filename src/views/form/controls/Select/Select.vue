<template>
  <div
    :class="[
      'form-select',
      size && `form-select--${size}`,
      {
        'form-select--disabled': disabled,
        'form-select--error': error,
      },
    ]"
  >
    <select
      :value="modelValue"
      :disabled="disabled"
      :class="['form-select-inner']"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
    <span v-if="clearable && modelValue" class="form-select-clear" @click="handleClear">×</span>
    <span v-else class="form-select-arrow">▼</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useInjectForm, useInjectFormItem } from '../../context'
import type { Props } from './type'

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  options: () => [],
  placeholder: '',
  validateEvent: true,
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'clear'])

const formItemContext = useInjectFormItem()
const formContext = useInjectForm()

const error = computed(() => formItemContext?.validateStatus === 'error' || props.error)
const size = computed(() => props.size || formItemContext?.size || formContext?.size)

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
  if (props.validateEvent) {
    formItemContext?.onFieldChange()
  }
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
  if (props.validateEvent) {
    formItemContext?.onFieldBlur()
  }
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<style lang="scss" scoped>
@use './style.scss';
</style>
