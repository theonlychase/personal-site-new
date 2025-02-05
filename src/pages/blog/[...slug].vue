<script setup lang="ts">
definePageMeta({
  pageScroll: true,
})

defineRouteRules({
  prerender: true,
})

const { path } = useRoute()
const { data } = await useAsyncData(path, async () => {
  const [content, surround] = await Promise.all([
    queryCollection('blog').path(path).first(),
    queryCollectionItemSurroundings('blog', path, {
      fields: ['description'],
    }),
  ])
  return { content, surround }
})

useSeoMeta({
  title: data.value?.content.seo.title,
  ogTitle: data.value?.content.seo.title,
  description: data.value?.content.seo.description,
  ogDescription: data.value?.content.seo.description,
})
</script>

<template>
  <UPageBody>
    <UPageHeader
      :title="data?.content.short"
      :description="data?.content.created"
    />

    <ContentRenderer
      v-if="data?.content"
      :value="data.content"
    />

    <UContentSurround :surround="data?.surround" />
  </UPageBody>
</template>
