<template>
  <UApp>
    <UHeader />

    <UError :error="error" />

    <UFooter />
  </UApp>
</template>

<script setup>
const error = useError()
</script>
