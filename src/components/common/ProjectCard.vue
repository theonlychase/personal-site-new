<script setup lang="ts">
import type { Project } from '~/helpers/const'

const { project } = defineProps<{ project: Project }>()
</script>

<template>
  <ULandingCard
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
        {{ project.description }}
      </div>

      <ul class="space-y-2 text-sm">
        <li
          v-for="detail in project.details"
          :key="detail"
          class="flex items-start space-x-3"
        >
          <UIcon
            class="w-4 h-4 text-primary shrink-0 mt-0.5"
            name="i-lucide-circle-check"
            title="Check"
          />
          <span>{{ detail }}</span>
        </li>
      </ul>
    </template>
  </ULandingCard>
</template>
