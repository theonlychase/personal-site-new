<script setup lang="ts">
  interface PageProps {
    full?: boolean;
  }

withDefaults(defineProps<PageProps>(), {
  full: false,
})
</script>

<template>
  <UMain class="animate-fadeIn">
    <UPage>
      <slot />
    </UPage>
  </UMain>
</template>
