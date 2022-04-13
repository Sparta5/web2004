<template>
  <div class="validate-input-container pb-3">
    <!-- $attrs使用根元素 attribute 属性 -->
    <input
      type="text"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    />
    <span v-if="inputRef.error" class="invalid-feedback">
      {{ inputRef.message }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted } from 'vue'
import { emitter } from './ValidateForm.vue'
const emailReg =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
// 正则密码大于6位，不能包含空格
const passwordReg = /^\S{6,}$/
interface RuleProp {
  type: 'required' | 'email' | 'min'
  min?: number
  message: string
}
export type RulesProp = RuleProp[]
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String
  },
  // 组件的根元素是否继承 attribute
  inheritAttrs: false,
  setup(props, content) {
    console.log(content.attrs)
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    // inpunt验证
    const validateInput = () => {
      if (props.rules) {
        // 循环每一个满足条件
        const allPassd = props.rules.every((rule) => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = inputRef.val.trim() !== ''
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            case 'min':
              passed = passwordReg.test(inputRef.val)
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassd
        return allPassd
      }
      return true
    }
    // 清空input的值
    const clearInput = () => {
      inputRef.val = ''
    }

    // 获取父组件ref的值
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      console.log(targetValue)
      content.emit('update:modelValue', targetValue)
    }
    // 发送事件ValidateForm组件等待接收
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
      emitter.emit('form-item-clear', clearInput)
    })

    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>

<style></style>
