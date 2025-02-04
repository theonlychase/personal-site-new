<script setup lang="ts">
definePageMeta({
  pageScroll: true,
})

defineRouteRules({
  prerender: true,
})

const { path } = useRoute()
const { data, error } = await useAsyncData(path, () => {
  return queryCollection('blog').path(path).first()
})

if (error) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

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
    />

    <ContentRenderer
      v-if="data"
      :value="data"
    />
  </UPageBody>
</template>
