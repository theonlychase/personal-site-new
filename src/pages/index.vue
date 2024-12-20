<script setup lang="ts">
import { projects, skills } from '~/helpers/const'

useHead({
  templateParams: {
    title: 'Home',
    description: 'Chase Isley is a software engineer highly skilled at modern front-end architecture, design systems, and solving problems at scale.',
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

    <!--    <Slider :slides="projects[0].icons"> -->
    <!--      <template #default> -->
    <!--        <UCard :ui="{ body: { padding: '' } }"> -->
    <!--          <USkeleton class="h-40" /> -->
    <!--        </UCard> -->
    <!--      </template> -->
    <!--    </Slider> -->

    <h2 class="mb-6">
      Recent Playground Projects
    </h2>

    <ULandingGrid>
      <ProjectCard
        v-for="project in projects"
        :key="project.title"
        :project="project"
      />
    </ULandingGrid>
  </UPageBody>
</template>
