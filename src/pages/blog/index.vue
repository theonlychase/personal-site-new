<script setup lang="ts">
useHead({
  templateParams: {
    title: 'Blog',
    description: 'Recent Blog Posts',
  },
})
</script>

<template>
  <ContentList path="/blog">
    <template #default="{ list }">
      <UPageHeader
        title="Blog"
      />
      <UBlogList orientation="vertical">
        <UBlogPost
          v-for="i in list"
          :key="i._path"
          :authors="[{ ...i.author }]"
          :date="i.created"
          :description="i.description"
          :image="i.image"
          orientation="horizontal"
          :title="i.short"
          :to="i._path"
        >
          <template v-if="i.tags" #badge>
            <UBadge
              v-for="tag in i.tags"
              :key="tag"
              :label="tag"
              variant="subtle"
              class="ml-2 first:ml-0"
            />
          </template>
        </UBlogPost>
      </UBlogList>
    </template>

    <template #not-found>
      No Content Found
    </template>
  </ContentList>
</template>
