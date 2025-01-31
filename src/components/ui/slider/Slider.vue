<script setup lang="ts">
const {
  columnGap = 12,
  slides = [],
} = defineProps<{
  columnGap?: number
  slides: Array<{ [key: string]: any }>
}>()

const activeIndex = ref(0)
const container: Ref = ref(null)
const childSlides: Ref<HTMLElement[]> = ref([])
const disableBtns = ref(true)
const endingIndex = ref(4)
const entriesIntersected: Ref<number[]> = ref([])
const observer: Ref<IntersectionObserver | null> = ref(null)
const showPrevBtn = ref(false)
const showNextBtn = ref(false)
const scrollToEnd = ref(false)
const scrollToStart = ref(false)
const transition = ref(0)
const totalChildWidth = computed(() => {
  return childSlides.value.reduce((acc, slide) => {
    const width = acc + slide.offsetWidth
    if (slide.offsetWidth && slide !== childSlides.value[childSlides.value.length - 2]) {
      return width + columnGap
    }
    return width
  }, 0)
})

const computedSlides = computed(() =>
  slides.slice(0, endingIndex.value),
)

onUpdated(() => {
  const children = [...container.value.children].filter(
    child => !childSlides.value.includes(child),
  )

  childSlides.value.push(...children)

  children.forEach(slide => observer.value?.observe(slide))
})

onBeforeUnmount(() => {
  observer.value?.disconnect()
})

watchEffect(
  () => {
    initObserver()
  },
  {
    flush: 'post',
  },
)

const initObserver = () => {
  if (!observer.value) {
    observer.value = new IntersectionObserver(handleIntersect, {
      root: container.value?.offsetParent,
    })
  }

  childSlides.value = [...container.value.children]

  childSlides.value.forEach((child) => {
    observer.value?.observe(child)
  })
}

const scrollNext = async () => {
  const { offsetWidth, offsetParent } = container.value
  const parentOffset = offsetWidth - offsetParent.offsetWidth

  if (transition.value < totalChildWidth.value - offsetParent.offsetWidth) {
    endingIndex.value += 1
  }

  if (scrollToEnd.value) {
    transition.value = parentOffset
  }
  else {
    transition.value += childSlides.value[1].offsetWidth + columnGap
  }

  container.value.style.transform = `translate3d(${-transition.value}px, 0, 0)`
}

const scrollPrev = () => {
  if (scrollToStart.value) {
    transition.value = 0
  }
  else {
    transition.value -= childSlides.value[1].offsetWidth + columnGap
  }

  container.value.style.transform = `translate3d(${-transition.value}px, 0, 0)`
}

const handleIntersect: IntersectionObserverCallback = (entries, observer) => {
  const entriesIntersecting = entries.filter(entry => entry.isIntersecting)
  const equalLength = entriesIntersecting.length === childSlides.value.length
  const allIntersecting = entriesIntersecting.every(
    entry => entry.isIntersecting,
  )

  if (equalLength && allIntersecting) {
    observer.disconnect()
  }
  else {
    disableBtns.value = false
    entries.forEach(({ target, isIntersecting }) => {
      const entryIndex: number = [...childSlides.value].indexOf(target as HTMLElement)

      if (target === childSlides.value[0]) {
        showPrevBtn.value = isIntersecting
      }

      if (target === childSlides.value[childSlides.value.length - 1]) {
        showNextBtn.value = isIntersecting
      }

      if (target === childSlides.value[2]) {
        scrollToStart.value = isIntersecting
      }

      if (target === childSlides.value[childSlides.value.length - 2]) {
        scrollToEnd.value = isIntersecting
      }

      if (
        isIntersecting
        && !entriesIntersected.value.includes(entryIndex)
      ) {
        entriesIntersected.value.push(entryIndex)
        activeIndex.value = entryIndex
        unobserveEntry({ target })
      }
    })
  }
}

const unobserveEntry = ({ target }: { target: IntersectionObserverEntry['target'] }) => {
  if (
    target !== childSlides.value[childSlides.value.length - 1]
    && target !== childSlides.value[0]
    && target !== childSlides.value[2]
    && target !== childSlides.value[childSlides.value.length - 2]
  ) {
    observer.value?.unobserve(target)
  }
}
</script>

<template>
  <div class="slider relative overflow-hidden">
    <UButton
      v-if="!showPrevBtn && !disableBtns"
      :ui="{ rounded: 'rounded-full' }"
      color="gray"
      rounded
      :padded="false"
      class="absolute left-4 right-auto top-1/2 z-10 -translate-y-1/2 cursor-pointer opacity-90 hidden md:flex justify-center w-8 h-8"
      title="Previous"
      @click.prevent="scrollPrev"
    >
      <UIcon
        class="h-6 w-6"
        name="i-lucide-chevron-left"
        dynamic
      />
    </UButton>

    <div
      ref="container"
      class="slider-container inline-flex w-full overflow-x-scroll md:overflow-x-hidden md:w-auto transition duration-200 ease-in-out sm-max:!transform-none"
    >
      <span class="slider-slide__first" />

      <div
        v-for="(slide, i) in computedSlides"
        :key="`slide-${i}`"
        :style="{ marginRight: i !== computedSlides.length -1 ? `${columnGap}px` : 0 }"
        class="slider-slide flex flex-col max-w-full shrink-0 w-64 last-of-type:mr-0 overflow-hidden p-1"
      >
        <slot
          :slide="slide"
          :index="i"
        />
      </div>

      <span class="slider-slide__last" />
    </div>

    <UButton
      v-if="!showNextBtn && !disableBtns"
      :ui="{ rounded: 'rounded-full' }"
      color="gray"
      :padded="false"
      rounded
      class="absolute right-4 left-auto top-1/2 z-10 -translate-y-1/2 cursor-pointer opacity-90 hidden md:flex justify-center w-8 h-8"
      title="Next"
      @click.prevent="scrollNext"
    >
      <UIcon
        class="h-6 w-6"
        name="i-lucide-chevron-right"
        dynamic
      />
    </UButton>
  </div>
</template>

<style scoped>
.slider,
.slider-container {
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
</style>
