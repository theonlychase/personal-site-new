<script setup lang="ts">
useHead({
  templateParams: {
    title: 'Login',
    description: 'Login To Your Account',
  },
})
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <UPageBody>
    <AuthForm class="mx-auto mt-16" />
  </UPageBody>
</template>
