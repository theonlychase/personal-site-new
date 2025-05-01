<script setup lang="ts">
const { project } = defineProps<{ project: Project }>()
</script>

<template>
  <UPageCard
    class="col-span-6 row-span-2"
    target="_blank"
    :title="project.title"
    :to="project.url"
  >
    <template #header>
      <div class="flex items-center gap-x-3">
        <UIcon
          v-for="{ name, title } in project.icons"
          :key="name"
          class="w-8 h-8 z-10 pointer-events-auto"
          :name="name"
          :title="title"
        />
      </div>
    </template>

    <template #description>
      <div class="mb-4">
        {{ project.description }}
      </div>

      <ul class="flex flex-col gap-y-2 text-sm">
        <li
          v-for="detail in project.details"
          :key="detail"
          class="flex items-start gap-x-3"
        >
          <UIcon
            class="w-4 h-4 text-green-500 shrink-0 mt-0.5"
            name="i-lucide-circle-check"
            title="Check"
          />
          <span>{{ detail }}</span>
        </li>
      </ul>
    </template>
  </UPageCard>
</template>
