<script setup lang="ts">
const title = 'Home - Chase Isley'
const description = 'Chase Isley is a software engineer highly skilled at modern front-end architecture, design systems, and solving problems at scale.'

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
})

const { data } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('blog', [
    'description', 'icon',
  ]).order('created', 'DESC')
})
</script>

<template>
  <UPageBody>
    <LazyUPageHeader
      class="pb-0 border-b-0 mb-0"
      title="Chase Isley"
      hydrate-never
    />

    <p class="text-sm mb-4">
      Web Engineer
    </p>

    <Typewriter
      :data="skills"
      class="mb-12"
    />

    <h2 class="mb-2">
      Blog
    </h2>

    <LazyBlogListNavigation
      v-if="data"
      :data="data"
    />

    <!--    <h2 class="mb-6"> -->
    <!--      Side Projects -->
    <!--    </h2> -->

    <!--    <LazyUPageGrid hydrate-never> -->
    <!--      <LazyProjectCard -->
    <!--        v-for="(project) in projects" -->
    <!--        :key="project.title" -->
    <!--        :project="project" -->
    <!--        hydrate-never -->
    <!--      /> -->
    <!--    </LazyUPageGrid> -->
  </UPageBody>
</template>
