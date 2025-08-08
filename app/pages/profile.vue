<script setup lang="ts">
useSeoMeta({
  robots: 'noindex, nofollow',
  title: 'User Profile',
  description: 'Profile for Authenticated Users',
})

definePageMeta({ middleware: 'auth' })
</script>

<template>
  <UPageBody>
    <LazyUPageHeader
      title="Profile"
      class="mb-8"
      hydrate-never
    />

    Work in progress...
  </UPageBody>
</template>
