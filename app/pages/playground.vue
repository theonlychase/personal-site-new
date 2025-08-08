<script setup lang="ts">
useSeoMeta({
  robots: 'noindex, nofollow',
  title: 'Playground',
  description: 'Playground Page',
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
