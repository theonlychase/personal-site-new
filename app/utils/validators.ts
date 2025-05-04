export const validateFirstName = (value: string): { message: string } | undefined => {
  if (!value) {
    return { message: 'First Name is required.' }
  }
  return undefined
}

export const validateLastName = (value: string): { message: string } | undefined => {
  if (!value) {
    return { message: 'Last Name is required.' }
  }
  return undefined
}

export const validateCC = (value: string): { message: string } | undefined => {
  if (!value) {
    return { message: 'Credit Card Number is required.' }
  }
  const v = value.replace(/\D/g, '')
  const valid = luhnCheck(v)
  if (!valid) {
    return { message: 'Invalid Card Number.' }
  }
  return undefined
}

export const validateEmail = (value: string): { message: string } | undefined => {
  if (!value) {
    return { message: 'Email is required.' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return { message: 'Invalid email address.' }
  }
  return undefined
}

export const validateCVV = (value: string): { message: string } | undefined => {
  if (!value) {
    return { message: 'CVV is required.' }
  }
  return undefined
}

export const validateAcceptedTerms = (value: boolean): { message: string } | undefined => {
  if (!value) {
    return { message: 'You must agree to the terms.' }
  }
  return undefined
}
