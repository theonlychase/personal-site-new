<script setup lang="ts">
// TODO - Finish Auth Form Functionality
definePageMeta({
  redirect: '/',
})
useHead({
  templateParams: {
    title: 'Login',
    description: 'Login Yo Your Account',
  },
})
</script>

<template>
  <AuthForm class="mx-auto" />
</template>
