<script setup lang="ts">
import { nav } from '~/helpers/const'
</script>

<template>
  <UFooter>
    <template #top>
      <hr class="w-full border-t border-gray-300 dark:border-gray-600 mb-4">

      <div class="flex max-sm:flex-col gap-2 w-full text-lg w-full">
        <div class="flex justify-center gap-x-6 w-full max-sm:order-2">
          <NuxtLink
            v-for="item in nav"
            :key="item.text"
            :to="item.to"
            :title="item.text"
            class="py-2"
          >
            {{ item.text }}
          </NuxtLink>
        </div>
        <div class="flex gap-x-4 justify-center items-center w-full max-sm:order-1">
          <UButton
            :padded="false"
            class="transition-colors"
            target="_blank"
            to="https://github.com/theonlychase"
            color="neutral"
            variant="link"
            title="Github"
          >
            <UIcon
              class="h-6 w-6"
              name="i-line-md:github"
              dynamic
            />
          </UButton>
          <UButton
            :padded="false"
            class="transition-colors"
            target="_blank"
            to="https://www.linkedin.com/in/chaseisley/"
            color="neutral"
            variant="link"
            title="LinkedIn"
          >
            <UIcon
              class="h-6 w-6"
              name="i-line-md:linkedin"
              dynamic
            />
          </UButton>
          <UButton
            :padded="false"
            class="transition-colors"
            target="_blank"
            to="https://www.instagram.com/theonlychase/"
            color="neutral"
            variant="link"
            title="Instagram"
          >
            <UIcon
              class="h-6 w-6"
              name="i-line-md:instagram"
              dynamic
            />
          </UButton>
        </div>
      </div>
    </template>
  </UFooter>
</template>
