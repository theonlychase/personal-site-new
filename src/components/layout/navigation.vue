<script setup lang="ts">
import { nav } from '~/helpers/data'
</script>

<template>
  <div class="flex items-center space-x-4 -ml-3 sm-max:hidden">
    <NuxtLink
      v-for="item in nav"
      :key="item.text"
      :to="`${item.to}`"
      class="nav-link p-1 sm:px-3 sm:py-2"
    >
      {{ item.text }}
    </NuxtLink>
  </div>
</template>
