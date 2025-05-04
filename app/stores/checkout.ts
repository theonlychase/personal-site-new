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
