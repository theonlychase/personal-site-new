<script setup lang="ts">
import type { BlogCollectionItem } from '@nuxt/content'

// defineRouteRules({ prerender: true })

const route = useRoute()
const { data }: { data: Ref<BlogCollectionItem[]> } = await useAsyncData(route.path, () => $fetch(`/api/blog/all`, { headers: useRequestHeaders(['cookie']) }))
// prerenderRoutes(data.value?.map(post => post.path) ?? [])

useHead({
  templateParams: {
    title: 'Blog',
    description: 'Recent Blog Posts',
  },
})
</script>

<template>
  <UPageBody>
    <LazyUPageHeader
      title="Blog"
      class="mb-8"
      hydrate-never
    />

    <UBlogPosts orientation="vertical">
      <UBlogPost
        v-for="(post, index) in data"
        :key="index"
        :authors="[post.author]"
        :title="post.short"
        :description="post.description"
        :to="post.path"
        orientation="horizontal"
      >
        <template
          v-if="post.tags"
          #badge
        >
          <LazyUBadge
            v-for="tag in post.tags"
            :key="tag"
            :label="tag"
            variant="subtle"
            class="ml-1 first:ml-0"
            hydrate-never
          />
        </template>

        <template #header>
          <NuxtImg
            v-slot="{ src, isLoaded, imgAttrs }"
            class="object-cover object-top w-full h-full transform transition-transform duration-200 group-hover/blog-post:scale-110"
            :src="`${post.image?.src}?random=${index}`"
            :alt="post.image?.alt"
            :custom="true"
          >
            <img
              v-if="isLoaded"
              v-bind="imgAttrs"
              :src="src"
            >

            <LazyUSkeleton
              v-else
              class="h-full w-full aspect-[16/9] flex items-center justify-center bg-[var(--ui-bg)]"
            >
              <svg
                class="w-20 h-20 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </LazyUSkeleton>
          </NuxtImg>
        </template>
      </UBlogPost>
    </UBlogPosts>
  </UPageBody>
</template>
