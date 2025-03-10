<script setup lang="ts">
const user = useSupabaseUser()
const { auth } = useSupabaseClient()
const { meta, path, query } = useRoute()
const { progress, stop } = useScrollProgress()

if (!meta.pageScroll) {
  stop()
}

const colorModeIcon = ref('i-line-md:light-dark')

const computedItems = computed(() => {
  return user.value
    ? [
        [
          {
            label: user.value.email,
            slot: 'account',
            disabled: true,
          },
        ],
        [
          {
            label: 'Your Profile',
            icon: 'i-line-md:account',
            to: '/profile',
            class: 'custom-link',
          },
        ],
        [
          {
            label: 'Logout',
            icon: 'i-line-md:logout',
            onSelect: async () => {
              await auth.signOut()
            },
          },
        ],
      ]
    : [
        [
          {
            label: 'Login',
            icon: 'i-line-md:login',
            to: '/login',
            class: 'custom-link',
          },
        ],
      ]
})

watch(user, () => {
  if (!user.value && path !== '/profile') {
    const to = (query.redirectTo as string) ?? '/login'
    return navigateTo(to, {
      replace: true,
    })
  }
})
</script>

<template>
  <UHeader :toggle="false">
    <template #left>
      <Navigation />

      <MobileNavigation />
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

      <UDropdownMenu
        :items="computedItems"
        :ui="{ item: 'data-disabled:cursor-text data-disabled:select-text' }"
        :popper="{ placement: 'bottom-start' }"
      >
        <UIcon
          class="h-7 w-7 hover:scale-110 transition-all"
          name="i-line-md:account"
          dynamic
        />

        <template #account="{ item }">
          <div class="text-left">
            <p>Signed in as</p>
            <p class="truncate font-medium">
              {{ item.label }}
            </p>
          </div>
        </template>
      </UDropdownMenu>
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
