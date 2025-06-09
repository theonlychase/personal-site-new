---
id: 'handle-form-state-with-nanostore-in-nuxt-3'
author: 
  avatar:
    src: 'https://github.com/theonlychase.png'
    target: '_blank'
  name: 'Chase Isley'
  to: 'https://chaseisley.dev'
title: 'Handle Form State with NanoStore in Nuxt 3'
description: 'Create a Composable to Handle Form State with NanoStore in Nuxt 3'
head:
  templateParams:
    title: 'Handle Form State with NanoStore in Nuxt 3'
    ogTitle: 'Handle Form State with NanoStore in Nuxt 3'
    twitterTitle: 'Handle Form State with NanoStore in Nuxt 3'
    description: 'Create a Composable to Handle Form State with NanoStore in Nuxt 3'
    ogDescription: 'Create a Composable to Handle Form State with NanoStore in Nuxt 3'
    twitterDescription: 'Create a Composable to Handle Form State with NanoStore in Nuxt 3'
image:
  src: 'https://picsum.photos/640/360'
  alt: 'Handle Form State with NanoStore in Nuxt 3'
seo: 
  title: 'Handle Form State with NanoStore in Nuxt 3'
  ogTitle: 'Handle Form State with NanoStore in Nuxt 3'
  twitterTitle: 'Handle Form State with NanoStore in Nuxt 3'
  description: 'Create a Composable to Handle Form State with NanoStore in Nuxt 3'
  ogDescription: 'Create a Composable to Handle Form State with NanoStore in Nuxt 3'
  twitterDescription: 'Create a Composable to Handle Form State with NanoStore in Nuxt 3'
sitemap:
  loc: '/blog/handle-form-state-with-nanostore-in-nuxt-3'
short: 'Handle Form State with NanoStore in Nuxt 3'
icon: 'i-simple-icons-nuxt'
tags: ['Vue', 'Nuxt', 'Typescript']
path: '/blog/handle-form-state-with-nanostore-in-nuxt-3'
slug: 'handle-form-state-with-nanostore-in-nuxt-3'
created: '2025-04-03'
---

I stumbled upon <a href="https://github.com/nanostores/nanostores" target="_blank">Nanostores</a> while playing around with <a href="https://github.com/stackblitz/alien-signals" target="_blank">alien signals</a>. 

Small. Performant. Can be used with any framework.

### Example

::checkout-form
::

### Create Nanostore

```ts [checkout.ts]
import { map } from 'nanostores'

export interface CheckoutStore {
  acceptedTerms: boolean
  cc: string
  cvv: string
  email: string
  firstName: string
  lastName: string
  month: string
  year: string
}

export const initialCheckoutStore: CheckoutStore = {
  acceptedTerms: false,
  cc: '',
  cvv: '',
  email: '',
  firstName: '',
  lastName: '',
  month: '01',
  year: '25',
}

export type CheckoutErrorStore = { [Property in keyof CheckoutStore]?: { message: string } }

// Checkout Form Value Store
export const $checkout = map<CheckoutStore>(initialCheckoutStore)

// Checkout Form Error Store
export const $errors = map<CheckoutErrorStore>({})

export const requiredFields: { [key in keyof Partial<CheckoutStore>]: string } = {
  acceptedTerms: 'You must agree to the terms.',
  email: 'Email is required.',
  cc: 'Credit Card Number is required.',
  firstName: 'First Name is required.',
  lastName: 'Last Name is required.',
  cvv: 'CVV is required.',
}
```

### useCheckout Composable

Used to handle all of the form reactivity, from state, errors, and validation.

```ts [useCheckout.ts]
import type { FormSubmitEvent } from '@nuxt/ui'
import type { PreinitializedMapStore } from 'nanostores'
import { useStore } from '@nanostores/vue'
import {
  type CheckoutStore,
  type CheckoutErrorStore,
  $checkout,
  $errors,
  initialCheckoutStore,
  requiredFields,
} from '~/stores/checkout'

interface UseCheckout {
  $checkout: PreinitializedMapStore<CheckoutStore>
  $errors: PreinitializedMapStore<CheckoutErrorStore>
  errorStore: Readonly<Ref<Readonly<CheckoutErrorStore>>>
  months: Ref<string[]>
  store: Readonly<Ref<CheckoutStore>>
  years: Ref<string[]>
  onSubmit: (event: FormSubmitEvent<CheckoutStore>) => Promise<void>
  setFieldError: (field: keyof CheckoutErrorStore, message: string) => void
}

export function useCheckout(): UseCheckout {
  // Readonly
  const store = useStore($checkout)
  const errorStore = useStore($errors)
  // Ref necessary for USelect Component
  const months = shallowRef(MONTHS)
  const years = shallowRef(getYears())
  // For successful submission
  const toast = useToast()

  // Set Error Store
  const setErrors = (errs: CheckoutErrorStore) => {
    $errors.set(errs)
  }

  // Reset Checkout Form State
  const resetForm = () => {
    $checkout.set(initialCheckoutStore)
    $errors.set({})
  }

  // Set Error for a specific field
  const setFieldError = (field: keyof CheckoutErrorStore, message: string) => {
    const currentErrors = $errors.get()
    $errors.set({
      ...currentErrors,
      [field]: { message },
    })
  }

  // Validate All Fields
  const validate = (
    state: Partial<CheckoutStore>,
    customMessages?: Partial<Record<keyof CheckoutStore, string>>,
  ): CheckoutErrorStore => {
    const errors: CheckoutErrorStore = {}

    for (const field of Object.keys(requiredFields) as (keyof CheckoutStore)[]) {
      let error
      switch (field) {
        case 'firstName':
          error = validateFirstName(state.firstName || '')
          break
        case 'lastName':
          error = validateLastName(state.lastName || '')
          break
        case 'cc':
          error = validateCC(state.cc || '')
          break
        case 'email':
          error = validateEmail(state.email || '')
          break
        case 'cvv':
          error = validateCVV(state.cvv || '')
          break
        case 'acceptedTerms':
          error = validateAcceptedTerms(state.acceptedTerms || false)
          break
      }

      if (error) {
        errors[field] = { message: customMessages?.[field] || error.message }
      }
    }

    setErrors(errors)
    return errors
  }

  // Handle Form Submission
  async function onSubmit(event: FormSubmitEvent<CheckoutStore>) {
    event.preventDefault()
    const errors = validate($checkout.get())
    if (Object.keys(errors).length > 0) {
      return
    }

    toast.add({
      title: 'Success',
      description: 'Your checkout form has been submitted successfully.',
      color: 'success',
    })

    resetForm()
  }

  return {
    $checkout,
    $errors,
    errorStore,
    months,
    store,
    years,
    onSubmit,
    setFieldError,
  }
}
```

```vue [CheckoutForm.vue] meta-info=val
<script setup lang="ts">
  const {
    $checkout, $errors, months, store, errorStore, years, onSubmit, setFieldError,
  } = useCheckout()
</script>

<template>
  <section
    aria-labelledby="payment-heading"
    class="flex-auto overflow-y-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0 lg:pb-24"
  >
    <h2
      id="payment-heading"
      class="sr-only"
    >
      Payment and shipping details
    </h2>

    <div class="mx-auto max-w-lg lg:pt-16">
      <UForm
        id="checkoutForm"
        class="mt-6"
        :state="store"
        @submit="onSubmit"
      >
        <div class="grid grid-cols-12 gap-x-4 gap-y-6">
          <div class="col-span-full sm:col-span-6">
            <UFormField
              :error="errorStore.firstName?.message"
              label="First Name"
              name="cc-given-name"
              required
            >
              <UInput
                id="firstName"
                autocomplete="cc-given-name"
                class="w-full"
                :model-value="store.firstName"
                size="xl"
                type="text"
                @update:model-value="(val) => $checkout.setKey('firstName', val as string)"
              />
            </UFormField>
          </div>

          <div class="col-span-full sm:col-span-6">
            <UFormField
              :error="errorStore.lastName?.message"
              label="Last Name"
              name="cc-family-name"
              required
            >
              <UInput
                id="lastName"
                autocomplete="cc-family-name"
                class="w-full"
                :model-value="store.lastName"
                type="text"
                size="xl"
                @update:model-value="(val) => $checkout.setKey('lastName', val as string)"
              />
            </UFormField>
          </div>

          <div class="col-span-full">
            <UFormField
              :error="errorStore.cc?.message"
              label="Credit Card"
              name="cc-number"
              required
            >
              <UInput
                id="cc"
                autocomplete="cc-number"
                class="w-full"
                type="text"
                size="xl"
                :model-value="store.cc"
                @input="(e: Event) => {
                  const val = handleInputFormat({
                    target: e.target as HTMLInputElement,
                    formatter: formatCard,
                  });

                  $errors.setKey('cc', undefined)
                  $checkout.setKey('cc', val as string)
                }"
                @blur="(e: Event) => {
                  const err = validateCC((e.target as HTMLInputElement).value || '')
                  if (err) {
                    setFieldError('cc', err.message)
                  }
                }"
              />
            </UFormField>
          </div>

          <div class="col-span-4">
            <UFormField
              :error="errorStore.month?.message"
              label="Month"
              name="cc-exp-month"
              type="item"
              required
            >
              <USelect
                class="w-full"
                autocomplete="cc-exp-month"
                :default-value="store.month"
                :model-value="store.month"
                :items="months"
                size="xl"
                @update:model-value="(val) => $checkout.setKey('month', val)"
              />
            </UFormField>
          </div>

          <div class="col-span-4">
            <UFormField
              :error="errorStore.year?.message"
              label="Year"
              name="cc-exp-year"
              required
            >
              <USelect
                autocomplete="cc-exp-year"
                class="w-full"
                :default-value="store.year"
                :model-value="store.year"
                :items="years"
                size="xl"
                @update:model-value="(val) => $checkout.setKey('year', val)"
              />
            </UFormField>
          </div>

          <div class="col-span-4">
            <UFormField
              :error="errorStore.cvv?.message"
              label="CVV"
              name="cc-csc"
              required
            >
              <UInput
                id="cvv"
                autocomplete="cc-csc"
                class="w-full"
                :model-value="store.cvv"
                type="text"
                size="xl"
                @update:model-value="(val) => $checkout.setKey('cvv', val as string)"
              />
            </UFormField>
          </div>

          <div class="col-span-full">
            <UFormField
              :error="errorStore.email?.message"
              label="Email"
              name="email"
              required
            >
              <UInput
                id="email"
                class="w-full"
                type="text"
                :model-value="store.email"
                placeholder="you@example.com"
                size="xl"
                @update:model-value="(val) => $checkout.setKey('email', val as string)"
              />
            </UFormField>
          </div>
        </div>

        <div class="mt-6">
          <UFormField
            :error="errorStore.acceptedTerms?.message"
            name="terms"
            required
          >
            <UCheckbox
              id="terms"
              :default-value="store.acceptedTerms"
              :model-value="store.acceptedTerms"
              label="I agree to the terms"
              size="xl"
              @update:model-value="(val) => $checkout.setKey('acceptedTerms', val as boolean)"
            />
          </UFormField>
        </div>

        <UButton
          class="mt-6"
          type="submit"
          size="xl"
          title="Submit"
        >
          Submit
        </UButton>
      </UForm>
    </div>
  </section>
</template>
```
