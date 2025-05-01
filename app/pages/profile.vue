<script setup lang="ts">
useHead({
  templateParams: {
    title: 'User Profile',
    description: 'Profile for Authenticated Users',
  },
})
definePageMeta({ middleware: 'auth' })
</script>

<template>
  <UPageBody>
    <UPageHeader
      title="Profile"
      class="mb-8"
    />

    Work in progress...
  </UPageBody>
</template>
