<template>
  <UApp>
    <Header />

    <UPageBody>
      <UError :error="error" />
    </UPageBody>

    <Footer />
  </UApp>
</template>

<script setup>
const error = useError()
</script>
