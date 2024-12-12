<script setup lang="ts">
import { nav } from '~/helpers/const'
</script>

<template>
  <div class="flex items-center space-x-4 -ml-3 sm-max:hidden text-lg">
    <NuxtLink
      v-for="item in nav"
      :key="item.text"
      :to="`${item.to}`"
      :class="['link-secondary p-1 sm:px-3 sm:py-2', { 'router-link-active': $route.path.includes(item.name) }]"
    >
      {{ item.text }}
    </NuxtLink>
  </div>
</template>
