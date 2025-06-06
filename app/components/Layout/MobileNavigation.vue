<script setup lang="ts">
defineProps<{ show?: boolean }>()

const childTransitions = ref('w-0 opacity-0 -translate-x-4')
const showMenu = ref(false)

const toggleMenu = () => {
  document.body.classList.toggle('overflow-hidden')
  showMenu.value = !showMenu.value
}

const onAfterEnter = () => {
  childTransitions.value = 'w-full opacity-100 translate-x-0'
}

const onAfterLeave = () => {
  childTransitions.value = 'w-0 opacity-0 -translate-x-4'
  document.body.classList.remove('overflow-hidden')
}
</script>

<template>
  <div class="md:hidden">
    <UButton
      :padded="false"
      color="neutral"
      variant="ghost"
      class="md:hidden !bg-transparent"
      title="Mobile Menu"
      @click="toggleMenu"
    >
      <UIcon
        class="h-6 w-6"
        name="i-lucide-menu"
        dynamic
      />
    </UButton>

    <Transition
      enter-active-class="transition-all ease duration-100"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all ease duration-300"
      leave-to-class="opacity-0"
      leave-from-class="opacity-100"
      @after-enter="onAfterEnter"
      @after-leave="onAfterLeave"
    >
      <ul
        v-if="showMenu"
        class="h-screen absolute flex flex-col left-0 w-full px-4 z-20 bg-[var(--ui-bg)] top-[var(--ui-header-height)] pt-6 text-lg"
      >
        <li
          v-for="item in nav"
          :key="item.text"
          class="flex transition-all ease duration-300 border-b border-gray-300 dark:border-gray-600 pb-4 mb-4 last:mb-0"
          :class="[childTransitions, item.delay]"
        >
          <NuxtLink
            :class="[
              'w-full sm:px-3 sm:py-2 rounded-lg',
              { 'router-link-active': $route.path.includes(item.name) },
            ]"
            :to="item.to"
            @click="showMenu = false"
          >
            {{ item.text }}
          </NuxtLink>
        </li>
        <li
          class="flex transition-all ease duration-300 delay-300"
          :class="[childTransitions]"
        >
          <UButton
            :padded="false"
            class="px-3 py-2 transition-colors"
            target="_blank"
            to="https://github.com/theonlychase"
            color="neutral"
            variant="link"
            title="Github"
          >
            <UIcon
              class="h-6 w-6"
              name="i-line-md:github"
              dynamic
            />
          </UButton>
          <UButton
            :padded="false"
            class="px-3 py-2 transition-colors"
            target="_blank"
            to="https://www.linkedin.com/in/chaseisley/"
            color="neutral"
            variant="link"
            title="LinkedIn"
          >
            <UIcon
              class="h-6 w-6"
              name="i-line-md:linkedin"
              dynamic
            />
          </UButton>
          <UButton
            :padded="false"
            class="px-3 py-2 transition-colors"
            target="_blank"
            to="https://www.instagram.com/theonlychase/"
            color="neutral"
            variant="link"
            title="Instagram"
          >
            <UIcon
              class="h-6 w-6"
              name="i-line-md:instagram"
              dynamic
            />
          </UButton>
        </li>
      </ul>
    </Transition>
  </div>
</template>
