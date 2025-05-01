<script setup lang="ts">
defineProps<{ full?: boolean }>()
</script>

<template>
  <UMain>
    <UPage>
      <slot />
    </UPage>
  </UMain>
</template>
