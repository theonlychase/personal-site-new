<script setup lang="ts">

</script>

<template>
  <div class="flex items-center gap-x-4 -ml-3 max-md:hidden text-lg">
    <NuxtLink
      v-for="item in nav"
      :key="item.text"
      :to="`${item.to}`"
      :class="['p-1 sm:px-3 sm:py-2', { 'router-link-active': $route.path.includes(item.name) }]"
    >
      {{ item.text }}
    </NuxtLink>
  </div>
</template>
