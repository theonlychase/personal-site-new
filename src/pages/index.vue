<script setup lang="ts">
import { skills } from '~/helpers/data'
useHead({
  templateParams: {
    title: 'Home',
    description: 'Chase Isley is a software engineer highly skilled at modern front-end architecture, design systems, and solving problems at scale.',
  },
})
</script>

<template>
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
</template>
