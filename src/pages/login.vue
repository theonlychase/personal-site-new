<script setup lang="ts">
useHead({
  templateParams: {
    title: 'Login',
    description: 'Login Yo Your Account',
  },
})
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <AuthForm class="mx-auto" />
</template>
