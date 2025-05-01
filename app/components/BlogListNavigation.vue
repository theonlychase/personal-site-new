<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const { data } = defineProps<{ data: ContentNavigationItem[] }>()
</script>

<template>
  <LazyUPageList divide>
    <Motion
      v-for="(item, index) in data[0]?.children"
      :key="index"
      v-bind="componentTransitions"
      :as-child="false"
      :transition="{
        delay: 0.6 + index * 0.1,
      }"
    >
      <LazyUPageCard
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
  </LazyUPageList>
</template>
