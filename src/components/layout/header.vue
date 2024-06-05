<script setup lang="ts">
const user = useSupabaseUser()
const { auth } = useSupabaseClient()
const route = useRoute()
const { progress, stop } = useScrollProgress()

if (!route.meta.pageScroll) {
  stop()
}

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
          icon: 'i-heroicons-user',
          to: '/profile',
          class: 'hover:text-gray-800',
        }],
        [{
          label: 'Logout',
          icon: 'i-heroicons-arrow-right-start-on-rectangle',
          click: async () => {
            await auth.signOut()
          },
        }],
      ]
    : [
        [{
          label: 'Login',
          icon: 'i-heroicons-arrow-right-end-on-rectangle',
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
          class="h-7 w-7"
          :name="$colorMode.unknown ? 'i-mdi-sun-moon-stars' : $colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
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
          name="i-heroicons-user-circle"
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
        v-if="$route.meta.pageScroll"
        size="sm"
        :value="progress"
      />
    </template>
  </UHeader>
</template>
