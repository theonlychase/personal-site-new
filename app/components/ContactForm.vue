<script setup lang="ts">
import type { RuntimeConfig } from 'nuxt/schema'

interface FormState { [key: string]: '' }
const messages = {
  required: 'is required',
  email: 'Invalid Email',
  success: 'Your message was successfully sent!',
}
const config: RuntimeConfig = useRuntimeConfig()

const form = ref(null)
const formElement = ref<HTMLElement | null>(null)
const loading = ref(false)
const success = ref(false)
const emailJs: Ref<{
  init: (key: string) => void
  sendForm: (
    serviceId: string,
    templateId: string,
    form: HTMLElement | null,
    publicKey: string,
  ) => Promise<{
    status: number
    text: string
  }>
} | null> = ref(null)

const state: FormState = reactive({
  name: '',
  email: '',
  message: '',
})

async function onSubmit() {
  success.value = false
  loading.value = true
  formElement.value = document.getElementById('contact')
  await initEmailJs()

  if (emailJs.value) {
    try {
      const resp = await emailJs.value?.sendForm(
        config.public.emailId,
        config.public.templateId,
        formElement.value,
        config.public.emailKey,
      )

      if (resp.status === 200) {
        success.value = true
        resetForm()
      }
    } catch (e) {
      loading.value = false
      console.error(e)
    }
  }
}

async function initEmailJs() {
  const loaded = await useInjectScript({
    src: 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js',
    id: 'emailjs',
  })
  if (loaded && !emailJs.value) {
    // @ts-expect-error - emailjs on window
    emailJs.value = window?.emailjs
  }
}

function validate() {
  const errors = []
  for (const key in state) {
    // Required Validation
    if (state[key] === '') {
      errors.push({
        name: key,
        message: `${key} ${messages.required}`,
      })
    }
    // Email Validation
    if (key === 'email' && !validateEmail(state.email)) {
      errors.push({
        name: 'email',
        message: messages.email,
      })
    }
  }
  return errors
}

function resetForm() {
  loading.value = false
  for (const key in state) {
    state[key] = ''
  }
  form?.value?.clear()
}
</script>

<template>
  <div
    class="overflow-hidden rounded-lg bg-[var(--ui-bg-muted)] py-16 px-6 lg:px-8 border border-[var(--ui-border)]"
  >
    <div class="relative mx-auto max-w-xl">
      <div class="text-center">
        <h2 class="header-1">
          Shoot me a message
        </h2>
        <p class="mt-4 text-lg leading-6">
          I'll get back to you as soon as I can
        </p>
      </div>
      <div class="mt-12">
        <UForm
          id="contact"
          ref="form"
          :state="state"
          :validate="validate"
          :validate-on="['input', 'change']"
          class="grid gap-y-4 sm:grid-cols-2 sm:gap-x-8"
          @submit="onSubmit"
        >
          <UFormField
            label="Name"
            name="name"
            required
          >
            <UInput
              v-model="state.name"
              class="w-full"
              icon="i-lucide-contact"
              placeholder="John Snow"
              size="xl"
            />
          </UFormField>

          <UFormField
            label="Email"
            name="email"
            required
          >
            <UInput
              v-model="state.email"
              class="w-full"
              icon="i-lucide-mail"
              placeholder="you@example.com"
              size="xl"
            />
          </UFormField>
          <div class="sm:col-span-2">
            <UFormField
              label="Message"
              name="message"
              required
            >
              <UTextarea
                v-model="state.message"
                class="w-full"
                placeholder="Leave a brief message..."
                size="xl"
              />
            </UFormField>
          </div>
          <div class="relative sm:col-span-2">
            <UButton
              type="submit"
              size="xl"
              :loading="loading"
              icon="i-lucide-send"
              trailing
            >
              Submit
            </UButton>
            <div
              v-if="success"
              class="animate-fadeIn absolute text-lg mt-4"
            >
              {{ messages.success }}
            </div>
          </div>
        </UForm>
      </div>
    </div>
  </div>
</template>
