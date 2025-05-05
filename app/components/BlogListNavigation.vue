<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const { data } = defineProps<{ data: ContentNavigationItem[] }>()
</script>

<template>
  <UPageList divide>
    <UPageCard
      v-for="(item, index) in data[0]?.children"
      :key="index"
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
  </UPageList>
</template>
