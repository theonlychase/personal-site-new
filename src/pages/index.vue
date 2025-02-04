<script setup lang="ts">
import { projects, skills } from '~/helpers/const'

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

    <!--    <Slider :slides="[...projects[0].icons, ...projects[0].icons]"> -->
    <!--      <template #default="{ slide }"> -->
    <!--        <UCard :ui="{ body: { base: 'h-40 flex justify-center items-center', padding: '' } }"> -->
    <!--          <UIcon -->
    <!--            class="w-10 h-10 text-primary shrink-0" -->
    <!--            :name="slide.name" -->
    <!--            :title="slide.title" -->
    <!--          /> -->
    <!--        </UCard> -->
    <!--      </template> -->
    <!--    </Slider> -->

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
  </UPageBody>
</template>
