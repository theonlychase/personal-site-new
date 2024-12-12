<script setup lang="ts">
import { nav } from '~/helpers/const'
</script>

<template>
  <UFooter>
    <template #top>
      <hr class="w-full border-t border-gray-300 dark:border-gray-600 mb-8">

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full text-lg">
        <div class="flex flex-col">
          <NuxtLink
            v-for="item in nav"
            :key="item.text"
            :to="item.to"
            :title="item.text"
            class="link-secondary px-3 py-2"
          >
            {{ item.text }}
          </NuxtLink>
        </div>
        <div class="flex flex-col">
          <NuxtLink
            href="https://github.com/theonlychase"
            target="_blank"
            title="Github"
            class="link-secondary px-3 py-2"
          >
            Github
          </NuxtLink>
          <NuxtLink
            href="https://www.linkedin.com/in/chaseisley/"
            target="_blank"
            title="LinkedIn"
            class="link-secondary px-3 py-2"
          >
            LinkedIn
          </NuxtLink>
        </div>
      </div>
    </template>
  </UFooter>
</template>
