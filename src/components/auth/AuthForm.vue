<script setup lang="ts">
import type { FormError } from '#ui/types'

const config = useRuntimeConfig()
const { auth } = useSupabaseClient()

const fields = [{
  name: 'email',
  type: 'text',
  label: 'Email',
  placeholder: 'Enter your email',
}]
const loading = ref(false)
const success = ref(false)
const formState = ref({})

const validate = (state: any) => {
  const errors: FormError[] = []
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' })
  return errors
}

const providers = [{
  label: 'Continue with GitHub',
  icon: 'i-line-md:github',
  color: 'black',
  click: async () => {
    await auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: config.public.baseUrl,
      },
    })
  },
}]

async function handleLogin(data: any) {
  try {
    loading.value = true
    const { error } = await auth.signInWithOtp({ email: data.email, options: {
      emailRedirectTo: config.public.baseUrl,
    } })
    if (error) throw error
  }
  catch (error) {
    alert(error.error_description || error.message)
  }
  finally {
    formState.value.state.email = ''
    loading.value = false
    success.value = true
  }
}
</script>

<template>
  <UCard class="max-w-sm w-full">
    <UAuthForm
      ref="formState"
      :fields="fields"
      :validate="validate"
      :providers="providers"
      title="Welcome back"
      align="top"
      icon="i-heroicons-lock-closed"
      :submit-button="{ label: 'Sign in', color: 'primary', loading }"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      @submit="handleLogin"
    >
      <template #description>
        Please enter your email to sign in.
      </template>

      <template
        v-if="success"
        #validation
      >
        <UAlert
          color="green"
          icon="i-heroicons-check-circle-20-solid"
          title="Check your email for the login link"
          variant="soft"
        />
      </template>
    </UAuthForm>
  </UCard>
</template>
