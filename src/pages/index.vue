<script setup lang="ts">
import { projectIcons, skills } from '~/helpers/const'

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

    <h2 class="mb-6">
      Latest Projects
    </h2>

    <ULandingGrid>
      <ULandingCard
        class="col-span-6 row-span-2"
        target="_blank"
        title="Storybook From Scratch"
        to="https://storybook-from-scratch.netlify.app"
        :ui="{ icon: { wrapper: 'pointer-events-auto' } }"
      >
        <template #icon>
          <div class="flex items-center gap-x-3">
            <UIcon
              v-for="{ name, title } in projectIcons"
              :key="name"
              class="w-8 h-8 z-10"
              :name="name"
              :title="title"
            />
          </div>
        </template>

        <template #description>
          <div class="mb-4">
            Custom, lightweight alternative to Storybook for building Vue components in isolation.
          </div>

          <ul class="space-y-2 text-sm">
            <li class="flex items-start space-x-3">
              <UIcon
                class="w-4 h-4 text-primary shrink-0 mt-1"
                name="i-lucide-circle-check"
                title="Check"
              />
              <span>Develop, test & document UI components</span>
            </li>
            <li class="flex items-start space-x-3">
              <UIcon
                class="w-4 h-4 text-primary shrink-0 mt-1"
                name="i-lucide-circle-check"
                title="Check"
              />
              <span>Auto generated routes for pages, components & stories</span>
            </li>
            <li class="flex items-start space-x-3">
              <UIcon
                class="w-4 h-4 text-primary shrink-0 mt-1"
                name="i-lucide-circle-check"
                title="Check"
              />
              <span>Reactive, auto generated controls for modifying component state</span>
            </li>
          </ul>
        </template>
      </ULandingCard>
    </ULandingGrid>
  </UPageBody>
</template>
