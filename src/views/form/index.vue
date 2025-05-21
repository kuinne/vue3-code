<template>
  <div class="form-demo">
    <div class="form-demo__header">
      <h3>表单布局控制</h3>
      <div class="form-demo__controls">
        <div class="control-group">
          <span>布局方式：</span>
          <el-radio-group v-model="layout">
            <el-radio-button label="horizontal">水平</el-radio-button>
            <el-radio-button label="vertical">垂直</el-radio-button>
            <el-radio-button label="grid">网格</el-radio-button>
          </el-radio-group>
        </div>

        <div class="control-group">
          <span>标签位置：</span>
          <el-radio-group v-model="currentLabelPosition">
            <el-radio-button label="inline">行内</el-radio-button>
            <el-radio-button label="top">顶部</el-radio-button>
          </el-radio-group>
        </div>

        <div class="control-group">
          <span>标签对齐：</span>
          <el-radio-group v-model="labelAlign">
            <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="right">右对齐</el-radio-button>
          </el-radio-group>
        </div>

        <div class="control-group">
          <span>标签宽度：</span>
          <el-radio-group v-model="currentLabelWidth">
            <el-radio-button label="auto">自适应</el-radio-button>
            <el-radio-button label="100px">100px</el-radio-button>
            <el-radio-button label="150px">150px</el-radio-button>
          </el-radio-group>
        </div>

        <div class="control-group">
          <span>标签省略：</span>
          <el-radio-group v-model="labelEllipsis">
            <el-radio-button :label="true">启用</el-radio-button>
            <el-radio-button :label="false">禁用</el-radio-button>
          </el-radio-group>
        </div>

        <div v-if="layout === 'grid'" class="control-group">
          <span>网格列数：</span>
          <el-radio-group v-model="gridCols">
            <el-radio-button :label="2">2列</el-radio-button>
            <el-radio-button :label="3">3列</el-radio-button>
            <el-radio-button :label="4">4列</el-radio-button>
          </el-radio-group>
        </div>

        <div class="control-group">
          <span>行间距：</span>
          <el-radio-group v-model="rowGap">
            <el-radio-button label="10px">10px</el-radio-button>
            <el-radio-button label="20px">20px</el-radio-button>
            <el-radio-button label="30px">30px</el-radio-button>
          </el-radio-group>
        </div>

        <div class="control-group">
          <span>列间距：</span>
          <el-radio-group v-model="colGap">
            <el-radio-button label="10px">10px</el-radio-button>
            <el-radio-button label="20px">20px</el-radio-button>
            <el-radio-button label="30px">30px</el-radio-button>
          </el-radio-group>
        </div>

        <div class="control-group">
          <span>尺寸：</span>
          <el-radio-group v-model="size">
            <el-radio-button label="small">小</el-radio-button>
            <el-radio-button label="default">默认</el-radio-button>
            <el-radio-button label="large">大</el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>

    <div class="form-demo__content">
      <h2>表单组件示例</h2>

      <Form
        ref="formRef"
        :model="formData"
        :layout="layout"
        :label-width="currentLabelWidth"
        :label-position="currentLabelPosition"
        :label-align="labelAlign"
        :label-ellipsis="labelEllipsis"
        :grid-cols="gridCols"
        :row-gap="rowGap"
        :col-gap="colGap"
        :size="size"
        :rules="formRules"
        :style="'max-width: 1000px'"
      >
        <!-- 选择器示例 -->
        <FormItem prop="select" label="选择器">
          <Select
            v-model="formData.select"
            :options="[
              { label: '选项1', value: 1 },
              { label: '选项2', value: 2 },
            ]"
            placeholder="请选择"
            clearable
          ></Select>
        </FormItem>
        <!-- 必填校验 -->
        <FormItem v-model="formData.input" prop="input" label="输入框" required>
          <Input v-model="formData.input" placeholder="请输入" clearable />
        </FormItem>
        <FormItem
          v-model="formData.longText"
          prop="longText"
          label="长标签哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"
        >
          <Input v-model="formData.longText" placeholder="请输入" clearable />
        </FormItem>

        <!-- 数字范围校验 -->
        <FormItem prop="range" label="数字范围">
          <Input type="number" v-model="formData.range" placeholder="请输入数字" clearable />
        </FormItem>

        <!--占多行 -->
        <FormItem prop="textare" label="占多行" :grid-row-span="3">
          <div
            style="
              border: 1px solid;
              width: 100%;
              height: 100%;
              min-width: 100px;
              box-sizing: border-box;
            "
          ></div>
        </FormItem>

        <!-- 多行文本框 -->
        <FormItem prop="textare" label="多行文本框" :grid-col-span="gridCols">
          <Input type="textarea" v-model="formData.textarea" placeholder="请输入" clearable />
        </FormItem>

        <FormItem
          prop="customComponent"
          label="自定义组件"
          v-slot="{ error }"
          :show-message="false"
        >
          <div>
            <MoneyInput
              v-model="formData.customComponent"
              placeholder="请输入金额"
              clearable
              :error="!!error"
              @change="handleCusotmChange"
              @blur="handleCusotmBlur"
            >
              <template #prefix>
                <span class="custom-prefix">$</span>
              </template>
              <template #suffix>
                <span class="custom-suffix">USD</span>
              </template>
            </MoneyInput>
            {{ error }}
          </div>
        </FormItem>
        <FormItem prop="customComponent1" label="自定义组件2">
          <div>
            <MoneyInput v-model="formData.customComponent1" placeholder="请输入金额" clearable>
              <template #prefix>
                <span class="custom-prefix">$</span>
              </template>
              <template #suffix>
                <span class="custom-suffix">USD</span>
              </template>
            </MoneyInput>
          </div>
          <template #error="{ error }">错误附加信息{{ error }}</template>
        </FormItem>
      </Form>
      <el-button type="primary" @click="validateForm">校验表单</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import Form from './Form.vue'
import FormItem from './FormItem.vue'
import MoneyInput from './components/MoneyInput.vue'
import type { FormProps } from './types/form'
import { ElMessage } from 'element-plus'

import Input from './controls/Input'
import Select from './controls/Select'

const layout = ref<FormProps['layout']>('horizontal')
const currentLabelPosition = ref<FormProps['labelPosition']>('inline')
const labelAlign = ref<FormProps['labelAlign']>('left')
const currentLabelWidth = ref<'auto' | '100px' | '150px'>('auto')
const labelEllipsis = ref(true)
const gridCols = ref(3)
const rowGap = ref('20px')
const colGap = ref('20px')
const size = ref<FormProps['size']>('default')

const formData = reactive({
  input: '',
  select: 1,
  textarea: '',
  longText: '',
  range: 0,
  customComponent: '',
  customComponent1: '',
})

const formRef = ref<InstanceType<typeof Form>>()

const formRules = ref<FormProps['rules']>({
  input: [
    {
      required: true,
      message: '请输入必填项',
    },
    {
      min: 3,
      max: 5,
      message: '长度在3-5之间',
    },
  ],
  pattern: [
    { required: true, message: '请输入邮箱' },
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: '请输入正确的邮箱格式',
    },
  ],
  range: [
    { type: 'number', required: true, message: '请输入数字' },
    {
      validator(rule, value, callback) {
        if (value < 0 || value > 100) {
          callback(new Error('数字范围在0-100之间'))
        } else {
          callback()
        }
      },
    },
  ],
  custom: [
    { required: true, message: '请输入' },
    {
      validator: (rule, value, callback) => {
        const num = Number(value)
        if (!isNaN(num) && num % 2 === 0) {
          callback(new Error('自定义校验失败'))
        } else {
          callback()
        }
      },
      message: '自定义校验失败',
    },
  ],
  amount: [{ required: true, message: '请输入' }],

  customComponent: [
    {
      required: true,
      message: '请输入必填项',
    },
    {
      message: '请输入数字',
      pattern: /^\d*\.?\d*$/,
    },
  ],
  customComponent1: [
    {
      required: true,
      message: '请输入必填项',
    },
    {
      message: '请输入数字',
      pattern: /^\d*\.?\d*$/,
    },
  ],
})

const validateForm = async () => {
  if (await formRef.value?.validate()) {
    ElMessage.success('校验成功')
  } else {
    ElMessage.error('校验失败')
  }
}

const handleCusotmChange = (value: string | number) => {
  formRef.value?.validateField('customComponent')
}

const handleCusotmBlur = (value: string | number) => {
  formRef.value?.validateField('customComponent')
}
</script>

<style lang="scss" scoped>
.form-demo {
  margin: 0 auto;
  padding: 10px;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  gap: 10px;

  h2 {
    margin-bottom: 20px;
    text-align: center;
    position: sticky;
    top: 0;
    background: #fff;
    padding: 10px 0;
    z-index: 1;
  }

  &__header {
    width: 300px;
    flex-shrink: 0;
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    position: sticky;
    top: 60px;
    background: #fff;
    z-index: 1;
    height: fit-content;

    h3 {
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ebeef5;
    }
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__controls {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .control-group {
    display: flex;
    align-items: center;
    gap: 8px;

    span {
      white-space: nowrap;
    }
  }
}

.custom-prefix,
.custom-suffix {
  color: #409eff;
  font-weight: bold;
}

.custom-tip {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
