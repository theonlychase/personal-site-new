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
  displayText: '',
  complete: false,
  index: 0,
  currentPosition: 0,
})

function parseHTML(html: string) {
  const units: string[] = []
  let i = 0

  while (i < html.length) {
    if (html[i] === '<') {
      // Find the end of the tag
      const tagEnd = html.indexOf('>', i)
      if (tagEnd !== -1) {
        // Add the complete tag as one unit
        units.push(html.substring(i, tagEnd + 1))
        i = tagEnd + 1
      } else {
        // Malformed tag, treat as text
        units.push(html[i] ?? '')
        i++
      }
    } else {
      // Regular character
      units.push(html[i] ?? '')
      i++
    }
  }

  return units
}

const currentUnits = computed(() => {
  return data[state.index] ? parseHTML(data[state.index] ?? '') : []
})

addText({ initial: true })

function addText({ initial = false } = {}) {
  const units = currentUnits.value

  if (state.currentPosition < units.length && !state.complete) {
    if (!initial) {
      // Add the next unit (character or complete HTML tag)
      state.displayText += units[state.currentPosition]
      state.currentPosition++
    }
    useTimeoutFn(addText, enter)
  }

  if (state.currentPosition >= units.length) {
    state.complete = true
    useTimeoutFn(removeText, end)
  }
}

function removeText() {
  const units = currentUnits.value

  if (state.currentPosition > 0) {
    state.currentPosition--
    // Rebuild the display text up to the current position
    state.displayText = units.slice(0, state.currentPosition).join('')
    useTimeoutFn(removeText, leave)
  }

  if (state.currentPosition === 0 && state.complete) {
    state.complete = false
    state.displayText = ''

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
    class="flex items-center text-lg h-5 animate-blink border-r-2 border-transparent w-fit dark:text-gray-200"
    v-html="state.displayText"
  />
</template>
