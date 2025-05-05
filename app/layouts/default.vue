<script setup lang="ts">
</script>

<template>
  <div id="app">
    <Header :key="$route.meta.pageScroll" />

    <Page>
      <slot />
    </Page>

    <Footer />
  </div>
</template>
