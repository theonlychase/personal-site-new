<script setup lang="ts">
useHead({
  templateParams: {
    title: 'Login',
    description: 'Login To Your Account',
  },
})
definePageMeta({ middleware: 'auth' })
</script>

<template>
  <UPageBody>
    <LazyAuthForm
      class="mx-auto mt-16"
      hydrate-on-interaction="mouseover"
    />
  </UPageBody>
</template>
