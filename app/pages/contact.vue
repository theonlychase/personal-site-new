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
    <UPageHeader
      class="mb-8"
      title="Contact"
    />

    <ContactForm />
  </UPageBody>
</template>
