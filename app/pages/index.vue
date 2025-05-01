<script setup lang="ts">
useHead({
  templateParams: {
    title: 'Home',
    description:
      'Chase Isley is a software engineer highly skilled at modern front-end architecture, design systems, and solving problems at scale.',
  },
})

const { data } = await useLazyAsyncData('navigation', () => {
  return queryCollectionNavigation('blog', ['description', 'icon']).order('created', 'DESC')
})
</script>

<template>
  <UPageBody>
    <Motion
      v-bind="componentTransitions"
      :transition="{
        delay: 0.1,
      }"
    >
      <LazyUPageHeader
        class="pb-0"
        title="Hi, I'm Chase Isley"
        hydrate-never
      />
    </Motion>

    <Motion
      v-bind="componentTransitions"
      :transition="{
        delay: 0.2,
      }"
    >
      <p class="text-sm mb-4">
        Software Engineer
      </p>
    </Motion>

    <Motion
      v-bind="componentTransitions"
      :transition="{
        delay: 0.3,
      }"
    >
      <Typewriter
        :data="skills"
        class="mb-12"
      />
    </Motion>

    <Motion
      v-bind="componentTransitions"
      :transition="{
        delay: 0.4,
      }"
    >
      <h2 class="mb-6">
        Recent Playground Projects
      </h2>
    </Motion>

    <Motion
      v-bind="componentTransitions"
      :transition="{
        delay: 0.5,
      }"
    >
      <LazyUPageGrid hydrate-never>
        <LazyProjectCard
          v-for="(project) in projects"
          :key="project.title"
          :project="project"
          hydrate-never
        />
      </LazyUPageGrid>
    </Motion>

    <Motion
      v-bind="componentTransitions"
      :transition="{
        delay: 0.6,
      }"
    >
      <h2 class="mb-2">
        Latest Blog Posts
      </h2>
    </Motion>

    <LazyBlogListNavigation
      v-if="data"
      :data="data"
    />
  </UPageBody>
</template>
