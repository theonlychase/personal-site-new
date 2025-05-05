---
id: 'dynamic-script-injection-in-nuxt-3'
author: 
  avatar:
    src: 'https://github.com/theonlychase.png'
    target: '_blank'
  name: 'Chase Isley'
  to: 'https://chaseisley.dev'
title: 'Dynamic Script Injection in Nuxt 3'
description: 'Load Scripts Dynamically with useInjectScript Composable'
head:
  templateParams:
    title: 'Dynamic Script Injection in Nuxt 3'
    ogTitle: 'Dynamic Script Injection in Nuxt 3'
    twitterTitle: 'Dynamic Script Injection in Nuxt 3'
    description: 'Load Scripts Dynamically with useInjectScript Composable'
    ogDescription: 'Load Scripts Dynamically with useInjectScript Composable'
    twitterDescription: 'Load Scripts Dynamically with useInjectScript Composable'
image:
  src: 'https://picsum.photos/640/360'
  alt: 'useInjectScript Composable'
seo: 
  title: 'Dynamic Script Injection in Nuxt 3'
  ogTitle: 'Dynamic Script Injection in Nuxt 3'
  twitterTitle: 'Dynamic Script Injection in Nuxt 3'
  description: 'Load Scripts Dynamically with useInjectScript Composable'
  ogDescription: 'Load Scripts Dynamically with useInjectScript Composable'
  twitterDescription: 'Load Scripts Dynamically with useInjectScript Composable'
sitemap:
  loc: '/blog/dynamic-script-injection-in-nuxt-3'
short: 'Dynamic Script Injection in Nuxt 3'
icon: 'i-simple-icons-nuxt'
tags: ['Vue', 'Nuxt', 'Typescript']
path: '/blog/dynamic-script-injection-in-nuxt-3'
slug: 'dynamic-script-injection-in-nuxt-3'
created: '2025-02-05'
---

A few years ago when I created this site, I setup <a href="https://www.emailjs.com/" target="_blank">EmailJS</a> for handling the contact form. It's pretty simple to setup and use.
For performance reasons, I didn't want to install the package, so I decided to create a composable to load it dynamically on submit. 

### useInjectScript Composable

It's pretty simple to use. You pass in the `src` and `id` of the script you want to load. The `async` parameter is optional and defaults to `true`.
It checks for the script by the `id` and resolves if it's already loaded. If not, it creates a new script element, appends it to the body, and resolves when the script is loaded.

```ts [useInjectScript.ts]
export function useInjectScript({
  src,
  id,
  async = true,
}: {
  src: string
  id: string
  async?: boolean
}): Promise<boolean> {
  const scriptEl = document.getElementById(id)

  return new Promise((resolve, reject) => {
    if (id && scriptEl) {
      return resolve(true)
    }
    const script = document.createElement('script')
    script.src = src
    script.type = 'text/javascript'
    script.async = async
    script.id = id

    document.body.appendChild(script)

    script.onload = () => resolve(true)
    script.onerror = e => reject(e)
  })
}
```

> Usage

```vue [component.vue] meta-info=val
<script setup lang="ts">
  import { type Ref } from "vue";

  const emailJs: Ref<{
    init: (key: string) => void
    sendForm: (
      serviceId: string,
      templateId: string,
      form: HTMLElement | null,
      publicKey: string,
    ) => Promise<{ status: number, text: string }>
  } | null> = ref(null)

  async function initEmailJs() {
    const loaded = await useInjectScript({
      src: 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js',
      id: 'emailjs',
    })
    if (loaded && !emailJs.value) {
      emailJs.value = window?.emailjs
    }
  }
</script>

<template>
  <button @click="initEmailJs">
    Load EmailJS
  </button>
</template>
```
