<script setup lang="ts">
import { projects, skills } from '~/helpers/const'

useHead({
  templateParams: {
    title: 'Home',
    description:
      'Chase Isley is a software engineer highly skilled at modern front-end architecture, design systems, and solving problems at scale.',
  },
})

const { data } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('blog', ['description', 'icon']).order('created', 'DESC')
})
</script>

<template>
  <UPageBody>
    <UPageHeader
      class="pb-0"
      title="Hi, I'm Chase Isley"
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

    <UPageGrid>
      <ProjectCard
        v-for="project in projects"
        :key="project.title"
        :project="project"
      />
    </UPageGrid>

    <!--    <Slider :slides="Array.from({ length: 5 }).map((_, index) => ({ src: `https://picsum.photos/640/360?random=${index}` }))"> -->
    <!--      <template #default="{ slide }"> -->
    <!--        <img -->
    <!--          :src="slide.src" -->
    <!--        > -->
    <!--      </template> -->
    <!--    </Slider> -->

    <h2 class="mb-2">
      Latest Blog Posts
    </h2>

    <UPageList
      v-if="data"
      divide
    >
      <UPageCard
        v-for="(item, index) in data[0].children"
        :key="index"
        as="li"
        class="px-0"
        :to="item.path"
        :title="item.title"
        :description="item.description"
        :icon="item.icon"
        orientation="vertical"
        variant="ghost"
        :ui="{ container: '!py-4' }"
      />
    </UPageList>
  </UPageBody>
</template>
