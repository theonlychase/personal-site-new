<script setup lang="ts">
interface FormState {
  [key: string]: '';
}
const messages = {
  required: 'is required',
  email: 'Invalid Email',
  success: 'Your message was successfully sent!',
}
const config: any = useRuntimeConfig()

const scriptLoaded = ref(false)
const form = ref(null)
const formElement = ref<HTMLElement | null>(null)
const loading = ref(false)
const success = ref(false)
const emailJs: Ref<{
  init: (key: string) => void;
  sendForm: (
    serviceId: string,
    templateId: string,
    form: HTMLElement | null,
    publicKey: string,
  ) => Promise<{ status: number; text: string }>;
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
  if (!scriptLoaded.value) {
    scriptLoaded.value = await useInjectScript({
      src: 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js',
      id: 'emailjs',
    })
    if (scriptLoaded.value && !emailJs.value) {
      // @ts-ignore
      emailJs.value = window?.emailjs
    }
  }
}

function validate() {
  const errors = []
  for (const key in state) {
    // Required Validation
    if (state[key] === '') {
      errors.push({ path: key, message: `${key} ${messages.required}` })
    }
    // Email Validation
    if (key === 'email' && !validateEmail(state.email)) {
      errors.push({ path: 'email', message: messages.email })
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
    class="overflow-hidden rounded-lg bg-gray-200/50 dark:bg-white/[.04] py-16 px-6 lg:px-8 lg:py-24"
  >
    <div class="relative mx-auto max-w-xl">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shoot me a message
        </h2>
        <p class="mt-4 text-lg leading-6 text-gray-500">
          I'll get back to you as soon as I can
        </p>
      </div>
      <div class="mt-12">
        <UForm
          id="contact"
          ref="form"
          :state="state"
          :validate="validate"
          :validate-on="['submit']"
          class="grid gap-y-4 sm:grid-cols-2 sm:gap-x-8"
          @submit="onSubmit"
        >
          <UFormGroup label="Name" name="name" required>
            <UInput v-model="state.name" icon="i-lucide-contact" input-class="bg-white dark:bg-dark" placeholder="John Snow" size="xl" />
          </UFormGroup>

          <UFormGroup label="Email" name="email" required>
            <UInput v-model="state.email" icon="i-lucide-mail" input-class="bg-white dark:bg-dark" placeholder="you@example.com" size="xl" />
          </UFormGroup>
          <div class="sm:col-span-2">
            <UFormGroup label="Message" name="message" required>
              <UTextarea v-model="state.message" textarea-class="bg-white dark:bg-dark" placeholder="Leave a brief message..." size="xl" />
            </UFormGroup>
          </div>
          <div class="relative sm:col-span-2">
            <UButton type="submit" size="xl" :loading="loading" icon="i-lucide-send" trailing>
              Submit
            </UButton>
            <div v-if="success" class="animate-fadeIn absolute text-lg mt-4">
              {{ messages.success }}
            </div>
          </div>
        </UForm>
      </div>
    </div>
  </div>
</template>
