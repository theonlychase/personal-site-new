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
import {
  validateFirstName,
  validateLastName,
  validateCC,
  validateEmail,
  validateCVV,
  validateAcceptedTerms,
} from '~/utils/validators'

interface UseCheckout {
  $checkout: PreinitializedMapStore<CheckoutStore>
  $errors: PreinitializedMapStore<CheckoutErrorStore>
  errorStore: Readonly<Ref<Readonly<CheckoutErrorStore>>>
  months: Ref<string[]>
  store: Readonly<Ref<CheckoutStore>>
  years: Ref<string[]>
}

export function useCheckout(): UseCheckout {
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

export const resetForm = () => {
  $checkout.set(initialCheckoutStore)
  $errors.set({})
}

export const setFieldError = (field: keyof CheckoutErrorStore, message: string) => {
  const currentErrors = $errors.get()
  $errors.set({
    ...currentErrors,
    [field]: { message },
  })
}

export const validate = (
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

export async function onSubmit(event: FormSubmitEvent<CheckoutStore>) {
  event.preventDefault()
  const errors = validate($checkout.get())
  if (Object.keys(errors).length > 0) {
    return
  }

  const toast = useToast()
  toast.add({
    title: 'Success',
    description: 'Your checkout form has been submitted successfully.',
    color: 'success',
  })

  resetForm()
}
