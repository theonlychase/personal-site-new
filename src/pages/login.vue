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
    <UPageHeader
      title="Login"
      class="mb-8"
    />

    <AuthForm class="mx-auto" />
  </UPageBody>
</template>
