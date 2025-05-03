<script setup lang="ts">
useHead({
  templateParams: {
    title: 'Home',
    description:
      'Chase Isley is a software engineer highly skilled at modern front-end architecture, design systems, and solving problems at scale.',
  },
})

const { data } = await useLazyAsyncData('navigation', () => {
  return queryCollectionNavigation('blog', [
    'description', 'icon',
  ]).order('created', 'DESC')
})
</script>

<template>
  <UPageBody>
    <LazyUPageHeader
      class="pb-0"
      title="Hi, I'm Chase Isley"
      hydrate-never
    />

    <p class="text-sm mb-4">
      Software Engineer
    </p>

    <Typewriter
      :data="skills"
      class="mb-12"
    />

    <h2 class="mb-6">
      Recent Playground Projects
    </h2>

    <LazyUPageGrid hydrate-never>
      <LazyProjectCard
        v-for="(project) in projects"
        :key="project.title"
        :project="project"
        hydrate-never
      />
    </LazyUPageGrid>

    <h2 class="mb-2">
      Latest Blog Posts
    </h2>

    <LazyBlogListNavigation
      v-if="data"
      :data="data"
    />
  </UPageBody>
</template>
