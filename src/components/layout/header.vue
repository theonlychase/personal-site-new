<script setup lang="ts">
import MobileNavigation from '~/components/layout/MobileNavigation.vue'
</script>

<template>
  <UHeader>
    <template #left>
      <Navigation />

      <MobileNavigation />
    </template>

    <template #right>
      <UButton
        class="text-gray-800 dark:text-gray-200 hover:scale-110 focus-visible:ring-0 transition-all p-1"
        color="gray"
        variant="link"
        title="Toggle Dark Mode"
        :ui="{ rounded: 'rounded-full' }"
        @click="$colorMode.preference = $colorMode.preference === 'dark' ? 'light' : 'dark'"
      >
        <UIcon class="h-7 w-7" :name="$colorMode.unknown ? 'i-mdi-sun-moon-stars' : $colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'" dynamic />
      </UButton>
    </template>
  </UHeader>
</template>
