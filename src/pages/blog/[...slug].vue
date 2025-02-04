<script setup lang="ts">
definePageMeta({
  pageScroll: true,
})

defineRouteRules({
  prerender: true,
})

const { path } = useRoute()
const { data } = await useAsyncData(path, () => {
  return queryCollection('blog').path(path).first()
})

useSeoMeta({
  title: data.value?.seo.title,
  ogTitle: data.value?.seo.title,
  description: data.value?.seo.description,
  ogDescription: data.value?.seo.description,
})
</script>

<template>
  <UPageBody>
    <UPageHeader
      :title="data?.short"
      :description="data?.created"
    />

    <ContentRenderer
      v-if="data"
      :value="data"
    />
  </UPageBody>
</template>
