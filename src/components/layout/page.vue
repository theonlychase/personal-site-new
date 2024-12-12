<script setup lang="ts">
withDefaults(defineProps<{ full?: boolean }>(), {
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
