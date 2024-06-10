<script setup lang="ts">
const user = useSupabaseUser()
const { auth } = useSupabaseClient()
const { meta, path, query } = useRoute()
const { progress, stop } = useScrollProgress()

if (!meta.pageScroll) {
  stop()
}

watch(
  user,
  () => {
    if (!user.value && path !== '/profile') {
      const to = (query.redirectTo as string) ?? '/login'
      return navigateTo(to, {
        replace: true,
      })
    }
  },
)

const computedItems = computed(() => {
  return user.value
    ? [
        [{
          label: user.value.email,
          slot: 'account',
          disabled: true,
        }],
        [{
          label: 'Your Profile',
          icon: 'i-line-md:account',
          to: '/profile',
          class: 'hover:text-gray-800',
        }],
        [{
          label: 'Logout',
          icon: 'i-line-md:logout',
          click: async () => {
            await auth.signOut()
          },
        }],
      ]
    : [
        [{
          label: 'Login',
          icon: 'i-line-md:login',
          to: '/login',
          class: 'hover:text-gray-800',
        }],
      ]
})
</script>

<template>
  <UHeader>
    <template #left>
      <Navigation />

      <MobileNavigation />
    </template>

    <template #right>
      <UButton
        class="text-gray-800 dark:text-gray-400 hover:scale-110 focus-visible:ring-0 transition-all p-1"
        color="gray"
        variant="link"
        title="Toggle Dark Mode"
        :ui="{ rounded: 'rounded-full' }"
        @click="$colorMode.preference = $colorMode.preference === 'dark' ? 'light' : 'dark'"
      >
        <UIcon
          :key="$colorMode.preference"
          class="h-7 w-7"
          :name="$colorMode.unknown ? 'i-line-md:light-dark' : $colorMode.value === 'dark' ? 'i-line-md:sunny-outline' : 'i-line-md:moon-simple'"
          dynamic
        />
      </UButton>

      <UDropdown
        :items="computedItems"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
      >
        <UIcon
          class="h-7 w-7 text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:scale-110 transition-all"
          name="i-line-md:account"
          dynamic
        />

        <template #account="{ item }">
          <div class="text-left">
            <p>
              Signed in as
            </p>
            <p class="truncate font-medium text-gray-800 dark:text-gray-200">
              {{ item.label }}
            </p>
          </div>
        </template>
      </UDropdown>
    </template>

    <template #bottom>
      <UMeter
        v-if="meta.pageScroll"
        size="sm"
        :value="progress"
      />
    </template>
  </UHeader>
</template>
