<template>
  <UApp>
    <Header />

    <UPageBody>
      <UError :error="error" />
    </UPageBody>

    <Footer />
  </UApp>
</template>

<script setup lang="ts">
const error = useError()
</script>
