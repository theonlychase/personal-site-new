<script setup lang="ts">
useSeoMeta(
  {
    title: () => '%title',
    description: () => '%description',
    ogDescription: () => '%description',
    ogTitle: () => '%title',
    twitterTitle: () => '%title',
    twitterDescription: () => '%title',
  },
  { mode: 'server' },
)

useHead({
  htmlAttrs: { lang: 'en' },
  meta: [
    { charset: 'utf-8' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
  ],
})
</script>

<template>
  <UApp :toaster="{ position: 'top-right' }">
    <NuxtLayout>
      <NuxtLoadingIndicator
        color="#00C16A"
        :height="2"
      />

      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0%;
  filter: blur(1rem);
}
</style>
