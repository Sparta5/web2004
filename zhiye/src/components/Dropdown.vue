<template>
  <div class="dropdown" ref="dropdownRef">
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click.prevent="toggleOpen"
    >
      {{ title }}
    </a>
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'
export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      redirect: true
    }
  },

  setup() {
    const isOpen = ref(false)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    // 拿到dom节点 主要:要断言一下不然只能拿到null用不了HTMLElement的方法
    const dropdownRef = ref<null | HTMLElement>(null)
    // 使用抽离的工具函数
    const isClickOutside = useClickOutside(dropdownRef)

    watch(isClickOutside, () => {
      // 当前窗口打开并且是点击框以外的
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })
    // const handler = (e: MouseEvent) => {
    //   if (dropdownRef.value) {
    //     // 判断是否包含当前dom节点，控制下拉展示隐藏 注意:不一定所以情况下e.target都是HTMLElement下的会报错所以要断言一下
    //     if (
    //       !dropdownRef.value?.contains(e.target as HTMLElement) &&
    //       isOpen.value
    //     ) {
    //       console.log(dropdownRef.value)
    //       isOpen.value = false
    //     }
    //   }
    // }
    // onMounted(() => {
    //   document.addEventListener('click', handler)
    // })
    // onUnmounted(() => {
    //   document.removeEventListener('click', handler)
    // })
    return {
      isOpen,
      toggleOpen,
      // 和 ref 同名的响应式对象 可以拿到 dom 节点
      dropdownRef
    }
  }
})
</script>

<style></style>
