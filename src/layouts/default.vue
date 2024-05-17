<script setup lang="ts">
const { data, error } = await useAsyncData('users', () => {
  const event = useRequestEvent()
  return event?.context.session
})
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
