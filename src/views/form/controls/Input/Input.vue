<template>
  <div
    :class="[
      'form-input',
      size && `form-input--${size}`,
      {
        'form-input--disabled': disabled,
        'form-input--error': error,
      },
    ]"
  >
    <textarea
      v-if="type === 'textarea'"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="['form-textarea-inner']"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <input
      v-else
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="['form-input-inner']"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span
      v-if="clearable && modelValue && type !== 'textarea'"
      class="form-input-clear"
      @click="handleClear"
    >
      ×
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useInjectForm, useInjectFormItem } from '../../context'
import type { Props } from './type'

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  validateEvent: true,
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'clear'])

const formItemContext = useInjectFormItem()
const formContext = useInjectForm()

const error = computed(() => props.error || formItemContext?.validateStatus === 'error')
const size = computed(() => props.size || formItemContext?.size || formContext?.size)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
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
  if (props.validateEvent) {
    formItemContext?.onFieldChange()
  }
}
</script>

<style lang="scss" scoped>
@use './style.scss';
</style>
