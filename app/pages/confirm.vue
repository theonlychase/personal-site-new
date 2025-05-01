<script setup lang="ts">
const user = useSupabaseUser()
const { query } = useRoute()

watch(
  user,
  () => {
    if (user.value) {
      const to = (query.redirectTo as string) ?? '/'
      return navigateTo(to, { replace: true })
    }
  },
  { immediate: true },
)
</script>

<template>
  <UPageBody>
    <div>Waiting for login...</div>
  </UPageBody>
</template>
