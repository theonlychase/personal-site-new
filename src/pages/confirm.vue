<script setup lang="ts">
// TODO - Finish Auth Form Functionality
definePageMeta({
  redirect: '/',
})
const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    return navigateTo('/')
  }
}, { immediate: true })
</script>

<template>
  <div>Waiting for login...</div>
</template>
