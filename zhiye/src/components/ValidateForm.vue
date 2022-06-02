<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitFrom">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
type ValidateFunc = () => boolean
type ClearFunc = () => void

interface CallbackProps {
  validator: ValidateFunc
  clearInput: ClearFunc
  // formName: string
}
// 定义一个 events 类型,这个定义是让事件和对应的 callback 一一对应
type Events = {
  'form-item-created': CallbackProps
  // 'form-item-clear': ClearFunc
}
// 实例化 mitt 的时候，作为泛型传递进去
export const emitter = mitt<Events>()
export default defineComponent({
  name: 'ValidateForm',
  emits: ['submitFrom'],
  setup(props, content) {
    let funcArr: ValidateFunc[] = []
    let clearArr: ClearFunc[] = []
    const submitFrom = () => {
      console.log(funcArr, clearArr)
      // const result = funcArr.map((func) => func()).every((result) => result)
      // 校验表单是否通过并且清空校验失败的input输入框
      const result = funcArr
        .map((func) => func())
        .every((result, i) => {
          !result && clearArr[i]()
          return result
        })

      // if (!result) {
      //   clearInputs()
      // }
      // 上一步执行完兄弟组件的方法抛给父组件
      content.emit('submitFrom', result)
    }
    const callback = (obj?: CallbackProps) => {
      if (obj !== undefined) {
        // obj.validator()
        // obj.clearInput()
        funcArr.push(obj.validator)
        clearArr.push(obj.clearInput)
      }
    }
    // 清空所有input输入框
    const clearInputs = () => {
      clearArr.forEach((func) => func())
    }

    // 接受事件ValidateInput组件的事件
    emitter.on('form-item-created', callback)
    // emitter.on('form-item-clear', clearInput)
    onUnmounted(() => {
      // 离开时销毁事件监听
      emitter.off('form-item-created', callback)
      funcArr = []
      clearArr = []
      // emitter.off('form-item-clear', clearInput)
    })

    return { submitFrom, clearInputs }
  }
})
</script>

<style></style>
