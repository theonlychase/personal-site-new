<script setup lang="ts">
import { ref } from 'vue'
import { nav } from '~/helpers/data'

  interface MobileNavProps {
    show?: boolean;
  }

withDefaults(defineProps<MobileNavProps>(), {
  show: false,
})

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
      color="gray"
      variant="ghost"
      class="md:hidden"
      title="Mobile Menu"
      @click="toggleMenu"
    >
      <UIcon class="h-6 w-6" name="i-lucide-menu" dynamic />
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
        class="h-screen absolute flex flex-col left-0 w-full space-y-4 px-4 z-20 bg-background pt-8 mt-1"
      >
        <li
          v-for="item in nav"
          :key="item.text"
          class="flex transition-all ease duration-300 border-b border-gray-300 dark:border-gray-600 pb-4"
          :class="[childTransitions, item.delay]"
        >
          <NuxtLink
            class="nav-link w-full sm:px-3 sm:py-2 rounded-lg"
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
            class="text-lg text-gray-800 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-600 px-3 py-2 transition-colors"
            target="_blank"
            to="https://github.com/theonlychase"
            color="gray"
            variant="link"
            title="Github"
          >
            <UIcon class="h-6 w-6" name="i-lucide-github" dynamic />
          </UButton>
          <UButton
            :padded="false"
            class="text-lg text-gray-800 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-600 px-3 py-2 transition-colors"
            target="_blank"
            to="https://www.linkedin.com/in/chaseisley/"
            color="gray"
            variant="link"
            title="LinkedIn"
          >
            <UIcon class="h-6 w-6" name="i-lucide-linkedin" dynamic />
          </UButton>
        </li>
      </ul>
    </Transition>
  </div>
</template>
