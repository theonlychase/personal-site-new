<script setup lang="ts">
useHead({
  title: 'Chase Isley',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Chase Isley',
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator
      color="#ff7b00"
      :height="2"
    />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0%;
  filter: blur(1px);
}
</style>
