<script setup lang="ts">
const {
  data,
  start = 1000,
  enter = 60,
  end = 1500,
  leave = 30,
} = defineProps<{
  data: Array<string>
  start?: number
  enter?: number
  end?: number
  leave?: number
}>()

const state = reactive({
  text: '',
  complete: false,
  index: 0,
})

addText({ initial: true })

function addText({ initial = false } = {}) {
  if (state.text.length < (data[state?.index]?.length ?? 0) && !state.complete) {
    if (!initial) {
      state.text += data[state?.index]?.charAt(state.text.length)
    }
    useTimeoutFn(addText, enter)
  }
  if (state.text.length === data[state?.index]?.length) {
    state.complete = true
    useTimeoutFn(removeText, end)
  }
}

function removeText() {
  if (state.text.length > 0) {
    const t = state.text.split('')
    t.pop()
    state.text = t.join('')
    useTimeoutFn(removeText, leave)
  }
  if (state.text.length === 0 && state.complete) {
    state.complete = false
    if (state.index === data.length - 1) {
      state.index = 0
    } else {
      state.index++
    }
    useTimeoutFn(addText, start)
  }
}
</script>

<template>
  <p
    class="flex items-center text-lg h-5 animate-blink border-r-2 border-transparent w-fit font-semibold dark:text-gray-200"
  >
    {{ state.text }}
  </p>
</template>
