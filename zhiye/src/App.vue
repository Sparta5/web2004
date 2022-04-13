<template>
  <!-- 头部 -->
  <GlobalHeader :user="user" />
  <!-- 列表组件 -->
  <!-- <ColumnList :list="list" /> -->
  <ValidateForm @submitFrom="onSubmitFrom">
    <div class="mb-3">
      <label class="form-label">邮箱地址</label>
      <!-- 表单组件 -->
      <ValidateInput
        ref="inputRef"
        type="text"
        placeholder="请输入邮箱地址"
        :rules="emailRules"
        v-model="emailVal"
        class="hello text"
      />
      <div>{{ emailVal }}</div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">密码</label>
      <ValidateInput
        type="password"
        placeholder="请输入密码"
        :rules="passwordRules"
        v-model="passwordVal"
      />
    </div>
    <!-- <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
      <input
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        v-model="emailRef.val"
        @blur="validateEmail"
      />
      <div class="form-text" v-if="emailRef.error">{{ emailRef.message }}</div>
    </div> -->
  </ValidateForm>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import ValidateForm from './components/ValidateForm.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: ''
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar:
      'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
]
const currentProps: UserProps = {
  isLogin: true,
  name: 'viking'
}

interface FormInputInterface {
  FormInputInterface: () => void
}

export default defineComponent({
  name: 'App',
  components: {
    // ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup() {
    // input子组件双向绑定的值
    const emailVal = ref('123@test.com')
    const passwordVal = ref('123')
    const inputRef = ref<null | FormInputInterface>(null)

    const emailRef: any = reactive({
      emailRef: {
        val: '',
        error: false,
        message: ''
      }
    })
    const validateEmail = () => {
      const emailReg =
        /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (emailRef.val.trim() === '') {
        emailRef.error = true
        emailRef.message = 'can not be empty'
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true
        emailRef.message = 'should be valid email'
      } else {
        emailRef.message = 'ok'
      }
    }

    const emailRules: RulesProp = [
      {
        type: 'required',
        message: '电子邮件不能为空'
      },
      {
        type: 'email',
        message: '请输入正确的电子邮箱格式'
      }
    ]
    const passwordRules: RulesProp = [
      {
        type: 'required',
        message: '密码不能为空'
      },
      {
        type: 'min',
        message: '正则密码不能小于6位，不能包含空格'
      }
    ]
    const onSubmitFrom = (result: boolean) => {
      // console.log('ref', inputRef.value.validateInput())
      console.log('submit', result)
    }
    return {
      list: testData,
      user: currentProps,
      emailRef,
      validateEmail,
      emailRules,
      emailVal,
      passwordRules,
      passwordVal,
      onSubmitFrom,
      inputRef
    }
  }
})
</script>

<style></style>
