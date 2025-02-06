<script setup lang="ts">
defineProps<{ full?: boolean }>()
</script>

<template>
  <UMain class="animate-fadeIn">
    <UPage>
      <slot />
    </UPage>
  </UMain>
</template>
