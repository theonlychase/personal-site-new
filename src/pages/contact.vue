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
      title="Contact"
    />

    <ContactForm />
  </UPageBody>
</template>
