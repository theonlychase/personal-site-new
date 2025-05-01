<script setup lang="ts">
const { data } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('blog', ['description', 'icon']).order('created', 'DESC')
})
</script>

<template>
  <UPageList
    v-if="data"
    divide
  >
    <Motion
      v-for="(item, index) in data[0]?.children"
      :key="index"
      :initial="false"
      :animate="{
        transform: 'translateY(10px)',
        opacity: 0,
      }"
      :in-view-options="{ once: true }"
      :while-in-view="{
        opacity: 1,
        transform: 'translateY(0)',
      }"
      :transition="{
        delay: 0.6 + index * 0.1,
      }"
    >
      <UPageCard
        as="li"
        class="px-0"
        :to="item.path"
        :title="item.title"
        :description="item.description"
        :icon="item.icon"
        orientation="vertical"
        variant="ghost"
        :ui="{ container: '!py-4' }"
      />
    </Motion>
  </UPageList>
</template>
