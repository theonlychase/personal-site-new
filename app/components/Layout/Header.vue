<script setup lang="ts">
const { meta } = useRoute()
const { progress, stop } = useScrollProgress()

if (!meta.pageScroll) {
  stop()
}

const colorModeIcon = ref('i-line-md:light-dark')
</script>

<template>
  <UHeader :toggle="false">
    <template #left>
      <LazyNavigation hydrate-on-media-query="(min-width: 768px)" />

      <LazyMobileNavigation hydrate-on-media-query="(max-width: 768px)" />
    </template>

    <template #right>
      <UButton
        class="hover:scale-110 focus-visible:ring-0 transition-all p-1"
        color="neutral"
        variant="link"
        title="Toggle Dark Mode"
        :ui="{ base: 'rounded-full' }"
        @click="
          () => {
            $colorMode.preference
              = $colorMode.preference === 'dark' ? 'light' : 'dark';
            colorModeIcon
              = $colorMode.preference === 'dark'
                ? 'i-line-md:sunny-outline'
                : 'i-line-md:moon-simple';
          }
        "
      >
        <UIcon
          :key="colorModeIcon"
          class="h-7 w-7"
          :name="colorModeIcon"
          dynamic
        />
      </UButton>
    </template>

    <template #bottom>
      <UProgress
        v-if="meta.pageScroll"
        v-model="progress"
        size="sm"
      />
    </template>
  </UHeader>
</template>
