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

    <h2 class="mb-6">
      Latest Projects
    </h2>

    <ULandingGrid>
      <ULandingCard
        v-for="project in projects"
        :key="project.title"
        class="col-span-6 row-span-2"
        target="_blank"
        :title="project.title"
        :to="project.url"
        :ui="{ icon: { wrapper: 'pointer-events-auto' } }"
      >
        <template #icon>
          <div class="flex items-center gap-x-3">
            <UIcon
              v-for="{ name, title } in project.icons"
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
            <li
              v-for="detail in project.details"
              :key="detail"
              class="flex items-start space-x-3"
            >
              <UIcon
                class="w-4 h-4 text-primary shrink-0"
                name="i-lucide-circle-check"
                title="Check"
              />
              <span>{{ detail }}</span>
            </li>
          </ul>
        </template>
      </ULandingCard>
    </ULandingGrid>
  </UPageBody>
</template>
