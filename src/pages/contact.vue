<script setup lang="ts">
useHead({
  templateParams: {
    title: 'Contact Me',
    description: 'Send Chase Isley a Message',
  },
})
</script>

<template>
  <UPageHeader
    title="Contact"
  />

  <ContactForm />
</template>
