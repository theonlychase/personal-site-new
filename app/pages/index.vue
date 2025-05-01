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
      :initial="{
        scale: 1.1,
        opacity: 0,
        filter: 'blur(20px)',
      }"
      :animate="{
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
      }"
      :transition="{
        duration: 0.6,
        delay: 0.05,
      }"
    >
      <UPageHeader
        class="pb-0"
        title="Hi, I'm Chase Isley"
      />

      <p class="text-sm mb-4">
        Software Engineer
      </p>
    </Motion>

    <Motion
      :initial="{
        scale: 1.1,
        opacity: 0,
        filter: 'blur(20px)',
      }"
      :animate="{
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
      }"
      :transition="{
        duration: 0.6,
        delay: 0.15,
      }"
    >
      <Typewriter
        :data="skills"
        class="mb-12"
      />

      <h2 class="mb-6">
        Recent Playground Projects
      </h2>
    </Motion>

    <Motion
      :initial="{
        scale: 1.1,
        opacity: 0,
        filter: 'blur(20px)',
      }"
      :animate="{
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
      }"
      :transition="{
        duration: 0.6,
        delay: 0.3,
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

    <!--    <Slider :slides="Array.from({ length: 5 }).map((_, index) => ({ src: `https://picsum.photos/640/360?random=${index}` }))"> -->
    <!--      <template #default="{ slide }"> -->
    <!--        <img -->
    <!--          :src="slide.src" -->
    <!--        > -->
    <!--      </template> -->
    <!--    </Slider> -->

    <Motion
      :initial="{
        scale: 1.1,
        opacity: 0,
        filter: 'blur(20px)',
      }"
      :animate="{
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
      }"
      :transition="{
        duration: 0.6,
        delay: 0.45,
      }"
    >
      <h2 class="mb-2">
        Latest Blog Posts
      </h2>

      <BlogListNavigation />
    </Motion>
  </UPageBody>
</template>
