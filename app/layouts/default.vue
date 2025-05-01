<script setup lang="ts">
</script>

<template>
  <div id="app">
    <Header :key="$route.meta.pageScroll" />

    <Page>
      <slot />
    </Page>

    <LazyFooter hydrate-on-visible />
  </div>
</template>
