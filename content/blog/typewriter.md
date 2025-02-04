---
author: 
  avatar:
    src: 'https://github.com/theonlychase.png'
    target: '_blank'
  name: 'Chase Isley'
  to: 'https://chaseisley.dev/'
title: 'Chase Isley - Vue 3 Typewriter Component'
description: 'Create a reusable Typewriter component using Vue 3, TypeScript, & Tailwind'
head:
  templateParams:
    title: 'Chase Isley - Vue 3 Typewriter Component'
    description: 'Create a reusable Typewriter component using Vue 3, TypeScript, & Tailwind'
image:
  src: 'https://picsum.photos/640/360?random=1'
  alt: 'Typewriter Component'
seo: 
  title: 'Chase Isley - Vue 3 Typewriter Component'
  description: 'Create a reusable Typewriter component using Vue 3, TypeScript, & Tailwind'
sitemap:
  loc: '/blog/create-a-typewriter-component-in-vue-3'
short: 'Vue 3 Typewriter Component'
tags: ['Vue', 'Typescript', 'Tailwind']
path: '/blog/create-a-typewriter-component-in-vue-3'
created: 'Feb 5, 2023'
---

> Create the Typewriter component

::typewriter
---
data: ['Typewriter Component', 'Built with Vue 3, TypeScript, & Tailwind']
---
::

```vue [Typewriter.vue] meta-info=val
<script setup lang="ts">
  // Vue 3.5+ - Reactive Prop Destructure 
  const { 
    data = [],
    start = 1000,
    enter = 60,
    end = 1500,
    leave = 30
  } = defineProps<{
    data: Array<string>;
    start?: number;
    enter?: number;
    end?: number;
    leave?: number;
  }>();

  const state = reactive({ text: '', complete: false, index: 0 });

  addText();

  function addText() {
    if (state.text.length < data[state.index].length && !state.complete) {
      state.text += data[state.index].charAt(state.text.length);
      useTimeoutFn(addText, enter);
    }
    if (state.text.length === data[state.index].length) {
      state.complete = true;
      useTimeoutFn(removeText, end);
    }
  }

  function removeText() {
    if (state.text.length > 0) {
      const t = state.text.split('');
      t.pop();
      state.text = t.join('');
      useTimeoutFn(removeText, leave);
    }
    if (state.text.length === 0 && state.complete) {
      state.complete = false;
      if (state.index === data.length - 1) {
        state.index = 0;
      } else {
        state.index++;
      }

      useTimeoutFn(addText, start);
    }
  }
</script>

<template>
  <p
    class="flex items-center text-lg h-5 animate-blink 
    border-r-2 border-transparent w-fit font-semibold dark:text-gray-200"
  >
    {{ state.text }}
  </p>
</template>
```

> Add blink animation to tailwind stylesheet

```css [tailwind.css] meta-info=val
/* tailwind 4+ */
@theme {
  --animate-blink: blink 1s infinite;

  @keyframes blink {
    0% {
      border-color: transparent;
    }

    45% {
      border-color: transparent;
    }

    50% {
      border-color: var(--color-gray-400);
    }

    100% {
      border-color: var(--color-gray-400);
    }
  }
}
```

> Usage

```vue [component.vue] meta-info=val
<script>
const data = [
  'Typewriter Component',
  'Built with Vue 3, TypeScript, & Tailwind'
];
</script>

<template>
  <Typewriter :data="data" />
</template>
```

> Result

::typewriter
---
data: ['Typewriter Component', 'Built with Vue 3, TypeScript, & Tailwind']
---
::
