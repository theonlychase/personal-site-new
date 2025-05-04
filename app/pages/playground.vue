<script setup lang="ts">
useHead({
  templateParams: {
    title: 'Playground',
    description: 'DEV Playground',
  },
})
</script>

<template>
  <UPageBody>
    <LazyUPageHeader
      title="Playground"
      class="mb-8"
      hydrate-never
    />

    <CheckoutForm />
  </UPageBody>
</template>
