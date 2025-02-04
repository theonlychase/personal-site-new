<script setup lang="ts">
useHead({
  templateParams: {
    title: 'Blog',
    description: 'Recent Blog Posts',
  },
})

defineRouteRules({
  prerender: true,
})

const { path } = useRoute()

const { data } = await useAsyncData(path, () => {
  return queryCollection('blog').all()
})
</script>

<template>
  <UPageBody>
    <UPageHeader
      title="Blog"
      class="mb-8"
    />

    <UBlogPosts orientation="vertical">
      <UBlogPost
        v-for="(post, index) in data"
        :key="index"
        v-bind="post"
        :title="post.short"
        :to="post.path"
        orientation="horizontal"
      >
        <template
          v-if="post.tags"
          #badge
        >
          <UBadge
            v-for="tag in post.tags"
            :key="tag"
            :label="tag"
            variant="subtle"
            class="ml-1 first:ml-0"
          />
        </template>
      </UBlogPost>
    </UBlogPosts>
  </UPageBody>
</template>
