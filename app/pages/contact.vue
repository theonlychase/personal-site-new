<script setup lang="ts">
useHead({
  templateParams: {
    title: 'Contact Me',
    description: 'Send Chase Isley a Message',
  },
})
</script>

<template>
  <UPageBody>
    <LazyUPageHeader
      class="mb-8"
      title="Contact"
      hydrate-never
    />

    <LazyContactForm hydrate-on-interaction="pointerenter" />
  </UPageBody>
</template>
