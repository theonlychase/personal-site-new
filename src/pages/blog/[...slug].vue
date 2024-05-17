<script setup lang="ts">
import { Typewriter } from '#components'

definePageMeta({
  pageScroll: true,
})
const { path } = useRoute()

const { data }: any = await useAsyncData(`${path}`, async () => await $fetch(`/api/content${path}`, {
  headers: useRequestHeaders(['cookie']),
}))
</script>

<template>
  <article class="prose dark:prose-invert">
    <ContentDoc>
      <template #default="{ doc }">
        <UPageHeader
          class="pb-0"
          :title="doc?.short"
          :description="`${data.view[0].viewCount} Views`"
          :ui="{
            description: 'text-xs mt-2',
            title: 'mb-0',
          }"
        />
        <ContentRendererMarkdown
          :value="doc"
          :components="{ 'typewriter-md': Typewriter }"
        />
      </template>

      <template #not-found>
        No Content Found
      </template>
    </ContentDoc>
  </article>
</template>
