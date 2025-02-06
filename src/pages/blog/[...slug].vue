<script setup lang="ts">
definePageMeta({
  pageScroll: true,
})

// defineRouteRules({
//   prerender: true,
// })

const { path, params } = useRoute()

const { data } = await useAsyncData(`${path}`, async () => await $fetch(`/api/blog/content/${params.slug[0]}`, {
  headers: useRequestHeaders(['cookie']),
}))

if (!data.value?.content) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

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
      :description="`${data?.content.created}${data?.views ? ` (${data?.views} views)` : ''}`"
    />

    <ContentRenderer
      v-if="data?.content"
      :value="data.content"
    />

    <UContentSurround :surround="data?.surround" />
  </UPageBody>
</template>
