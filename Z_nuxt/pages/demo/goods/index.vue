<template>
  <div class="goods">
    <h3>商品</h3>
    <nuxt-link to="/demo/goods/comment?1&b=2">评论01</nuxt-link>
    <nuxt-link
      :to="{ name: 'demo-goods-id', params: { id: 2 }, query: { a: 3, b: 6 } }"
      >商品02</nuxt-link
    >
    <nuxt-link to="/demo/goods/comment">评论</nuxt-link>
    <!-- 动态 对应 goods/_id.vue-->
    <nuxt-link
      :to="{
        name: 'demo-goods-id',
        params: { id: 3 },
        query: { a: 111, b: 222 }
      }"
      >商品03</nuxt-link
    >

    <!-- 约定展示区内容才能显示 -->
    <Nuxt />
  </div>
</template>
