<script setup lang="ts">
useHead({
  templateParams: {
    title: 'User Profile',
    description: 'Profile for Authenticated Users',
  },
})
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <UPageHeader
    title="Profile"
  />
</template>
