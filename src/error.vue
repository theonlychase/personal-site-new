<template>
  <NuxtLayout>
    <UPageError :error="error" />
  </NuxtLayout>
</template>

<script setup>
const error = useError()
</script>
