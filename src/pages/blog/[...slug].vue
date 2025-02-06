<script setup lang="ts">
definePageMeta({
  pageScroll: true,
})

// defineRouteRules({
//   prerender: true,
// })

const client = useSupabaseClient()
const { path, params } = useRoute()
const { data } = await useAsyncData(path, async () => {
  const slug = params.slug[0]
  let views = null
  const [content, surround] = await Promise.all([
    queryCollection('blog').path(path).first(),
    queryCollectionItemSurroundings('blog', path, {
      fields: ['description'],
    }),
  ])

  if (content.path.includes(slug)) {
    let { data: view } = await client.from('Views').select().eq('slug', slug)

    if (!view || !view.length) {
      // @ts-expect-error - insert should be able to take a type
      const { data } = await client.from('Views').insert({ slug, viewCount: 1, updatedAt: new Date().toISOString() }).select()
      view = data
    }
    else {
      // @ts-expect-error - insert should be able to take a type
      const { data } = await client.from('Views').update({ viewCount: view[0].viewCount + 1 }).eq('slug', slug).select()
      view = data
    }

    views = view
  }

  if (content) {
    const date = new Date(content.created)
    content.created = date.toLocaleDateString('default', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })
  }
  return { content, surround, views: views ? views[0]?.viewCount : null }
})

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
