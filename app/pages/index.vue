<script setup lang="ts">
import {
  projects, skills,
} from '~/helpers/const'

useHead({
  templateParams: {
    title: 'Home',
    description:
      'Chase Isley is a software engineer highly skilled at modern front-end architecture, design systems, and solving problems at scale.',
  },
})
</script>

<template>
  <UPageBody>
    <Motion
      as-child
      :initial="false"
      :animate="{
        transform: 'translateY(10px)',
        opacity: 0,
      }"
      :in-view-options="{ once: true }"
      :while-in-view="{
        opacity: 1,
        transform: 'translateY(0)',
      }"
      :transition="{
        delay: 0.1,
      }"
    >
      <UPageHeader
        class="pb-0"
        title="Hi, I'm Chase Isley"
      />
    </Motion>

    <Motion
      as-child
      :initial="false"
      :animate="{
        transform: 'translateY(10px)',
        opacity: 0,
      }"
      :in-view-options="{ once: true }"
      :while-in-view="{
        opacity: 1,
        transform: 'translateY(0)',
      }"
      :transition="{
        delay: 0.2,
      }"
    >
      <p class="text-sm mb-4">
        Software Engineer
      </p>
    </Motion>

    <Motion
      as-child
      :initial="false"
      :animate="{
        transform: 'translateY(10px)',
        opacity: 0,
      }"
      :in-view-options="{ once: true }"
      :while-in-view="{
        opacity: 1,
        transform: 'translateY(0)',
      }"
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
      as-child
      :initial="false"
      :animate="{
        transform: 'translateY(10px)',
        opacity: 0,
      }"
      :in-view-options="{ once: true }"
      :while-in-view="{
        opacity: 1,
        transform: 'translateY(0)',
      }"
      :transition="{
        delay: 0.4,
      }"
    >
      <h2 class="mb-6">
        Recent Playground Projects
      </h2>
    </Motion>

    <Motion
      :initial="false"
      as-child
      :animate="{
        transform: 'translateY(10px)',
        opacity: 0,
      }"
      :in-view-options="{ once: true }"
      :while-in-view="{
        opacity: 1,
        transform: 'translateY(0)',
      }"
      :transition="{
        delay: 0.5,
      }"
    >
      <UPageGrid>
        <ProjectCard
          v-for="(project) in projects"
          :key="project.title"
          :project="project"
        />
      </UPageGrid>
    </Motion>

    <Motion
      :initial="false"
      as-child
      :animate="{
        transform: 'translateY(10px)',
        opacity: 0,
      }"
      :in-view-options="{ once: true }"
      :while-in-view="{
        opacity: 1,
        transform: 'translateY(0)',
      }"
      :transition="{
        delay: 0.6,
      }"
    >
      <h2 class="mb-2">
        Latest Blog Posts
      </h2>
    </Motion>

    <BlogListNavigation />
  </UPageBody>
</template>
