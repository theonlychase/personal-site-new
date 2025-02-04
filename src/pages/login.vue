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
    <AuthForm class="mx-auto" />
  </UPageBody>
</template>
