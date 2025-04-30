<script setup lang="ts">
definePageMeta({ pageScroll: true })

const {
  path, params,
} = useRoute()
const { data } = await useAsyncData(`${path}`, async () => await $fetch(`/api/blog/${params?.slug[0]}`, { headers: useRequestHeaders(['cookie']) }))

if (!data.value?.content) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

useHead(data.value?.content.head || {})
useSeoMeta(data.value?.content.seo || {})
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
