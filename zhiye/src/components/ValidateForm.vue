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
import { defineComponent, onMounted } from 'vue'
import mitt from 'mitt'
type ValidateFunc = () => boolean
type ClearFunc = () => void
type Events = {
  'form-item-created': ValidateFunc
  'form-item-clear': ClearFunc
}
// interface CallbackProps {
//   validator: ValidateFunc
//   clearInput: ClearFunc
//   formName: string
// }
export const emitter = mitt<Events>()

export default defineComponent({
  name: 'ValidateForm',
  emits: ['submitFrom'],
  setup(props, content) {
    const funcArr: ValidateFunc[] = []
    const clearArr: ClearFunc[] = []
    const submitFrom = () => {
      const result = funcArr.map((func) => func()).every((result) => result)
      if (!result) {
        clearArr.forEach((func) => func())
      }
      // 上一步执行完兄弟组件的方法抛给父组件
      content.emit('submitFrom', result)
    }
    const callback = (func: ValidateFunc) => {
      funcArr.push(func)
    }
    const clearInput = (func: ClearFunc) => {
      clearArr.push(func)
    }
    // 接受事件ValidateInput组件的事件
    emitter.on('form-item-created', callback)
    emitter.on('form-item-clear', clearInput)
    onMounted(() => {
      // 离开时销毁事件监听
      emitter.off('form-item-created', callback)
      emitter.off('form-item-clear', clearInput)
    })
    return { submitFrom }
  }
})
</script>

<style></style>
