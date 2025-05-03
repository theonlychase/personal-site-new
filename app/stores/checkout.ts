import type { FormError } from '@nuxt/ui'
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

export type CheckoutErrorStore = { [Property in keyof CheckoutStore]?: { message: string } }

// Checkout Form Value State
export const $checkout = map<CheckoutStore>({
  acceptedTerms: false,
  cc: '',
  cvv: '',
  email: '',
  firstName: '',
  lastName: '',
  month: '01',
  year: '25',
})

// Checkout Form Error State
export const $errors = map<CheckoutErrorStore>({})
