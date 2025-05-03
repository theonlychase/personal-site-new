import type { FormSubmitEvent } from '@nuxt/ui'
import type { PreinitializedMapStore } from 'nanostores'
import { useStore } from '@nanostores/vue'
import {
  $checkout, $errors, type CheckoutStore, type CheckoutErrorStore,
} from '~/stores/checkout'

export function useCheckout(): {
  $checkout: PreinitializedMapStore<CheckoutStore>
  $errors: PreinitializedMapStore<CheckoutErrorStore>
  errorStore: Readonly<Ref<Readonly<CheckoutErrorStore>>>
  months: Ref<string[]>
  store: Readonly<Ref<CheckoutStore>>
  years: Ref<string[]>
} {
  // Readonly
  const store = useStore($checkout)
  const errorStore = useStore($errors)

  const months = shallowRef(MONTHS)
  const years = shallowRef(getYears())

  return {
    $checkout,
    $errors,
    errorStore,
    months,
    store,
    years,
  }
}

export const setErrors = (errs: CheckoutErrorStore) => {
  $errors.set(errs)
}

export const validate = (state: Partial<CheckoutStore>): CheckoutErrorStore => {
  const errors: CheckoutErrorStore = {}

  if (!state.acceptedTerms) {
    errors.acceptedTerms = { message: 'You must agree to the terms.' }
  }

  if (!state.email) {
    errors.email = { message: 'Email Required' }
  }

  if (!state.cc) {
    errors.cc = { message: 'Credit Card Number Required' }
  }

  if (!state.firstName) {
    errors.firstName = { message: 'First Name Required' }
  }

  if (!state.lastName) {
    errors.lastName = { message: 'Last Name Required' }
  }

  if (!state.cvv) {
    errors.cvv = { message: 'CVV Required' }
  }

  setErrors(errors)
  return errors
}

export async function onSubmit(event: FormSubmitEvent<CheckoutStore>) {
  event.preventDefault()
  const errors = validate($checkout.get())
  if (Object.keys(errors).length > 0) {
    return
  }
  console.log('submitted', event.data)
}
