<script setup lang="ts">
import type { BlogCollectionItem, ContentNavigationItem } from '@nuxt/content'

definePageMeta({ pageScroll: true })

const { path, params } = useRoute()

const { data }: {
  data: Ref<{
    content: BlogCollectionItem
    surround: ContentNavigationItem[]
    views: number | null
  }>
} = await useAsyncData(path, () => $fetch(`/api/blog/${params?.slug ? params?.slug[0] : ''}`, { headers: useRequestHeaders(['cookie']) }))

if (!data.value?.content) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

const {
  description = '', image = null, title = '',
} = data.value?.content ?? {}

useSeoMeta({
  title,
  ogTitle: title,
  ogImage: image?.src,
  description,
  ogDescription: description,
})
</script>

<template>
  <UPageBody>
    <UPageHeader
      :title="data?.content.short"
    />

    <ContentRenderer
      v-if="data?.content"
      :value="data.content"
    />

    <UContentSurround :surround="data?.surround" />
  </UPageBody>
</template>
