const acceptedCards = {
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  mastercard:
    /^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$/,
  amex: /^3[47][0-9]{13}$/,
  // discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  dinersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  jcb: /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/,
}

export function validateEmailUtil(email: string) {
  const regex
    // eslint-disable-next-line
    = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return regex.test(email)
}

export function formatCard({ value, input }: {
  value: string
  input: HTMLInputElement
}) {
  // remove all non digit characters
  const v = value.replace(/\D/g, '')
  let formattedValue = ''
  let maxLength = 19
  // american express, 15 digits
  if (acceptedCards?.amex?.test(v)) {
    formattedValue = v
      .replace(/(\d{4})/, '$1-')
      .replace(/(\d{4})-(\d{6})/, '$1-$2-')
    maxLength = 17
  } else if (acceptedCards?.dinersClub?.test(v)) {
    formattedValue = v
      .replace(/(\d{4})/, '$1-')
      .replace(/(\d{4})-(\d{6})/, '$1-$2-')
    maxLength = 16
  } else if (/^\d{0,16}$/.test(v)) {
    formattedValue = v
      .replace(/(\d{4})/, '$1-')
      .replace(/(\d{4})-(\d{4})/, '$1-$2-')
      .replace(/(\d{4})-(\d{4})-(\d{4})/, '$1-$2-$3-')
    maxLength = 19
  }

  input.setAttribute('maxlength', String(maxLength))

  return formattedValue
}

export function handleInputFormat({ target, formatter }: {
  target: HTMLInputElement
  formatter: (args: {
    value: string
    input: HTMLInputElement
  }) => string
}) {
  const node = target // vanilla javascript element
  let cursor = node.selectionStart ?? 0 // store cursor position
  const lastValue = target.value // get value before formatting

  const formattedValue = formatter({
    value: lastValue,
    input: node,
  })
  target.value = formattedValue // set value to formatted

  // keep the cursor at the end on addition of spaces
  if (cursor === lastValue.length) {
    cursor = formattedValue.length
    // decrement cursor when backspacing
    // i.e. "4444 |" => backspace => "4444|"
    if (
      target.getAttribute('data-last-value')
      && target.getAttribute('data-last-value')?.charAt(cursor - 1) === '-'
    ) {
      cursor--
    }
  }

  if (lastValue !== formattedValue) {
    // increment cursor when inserting character before a space
    // i.e. "1234| 6" => "5" typed => "1234 5|6"
    if (
      lastValue.charAt(cursor) === '-'
      && formattedValue.charAt(cursor - 1) === '-'
    ) {
      cursor++
    }
  }

  // set cursor position
  node.selectionStart = cursor
  node.selectionEnd = cursor
  // store last value
  target.setAttribute('data-last-value', formattedValue)
  return formattedValue
}

export const luhnCheck = (num: number | string) => {
  const arr = (num + '')
    .split('')
    .reverse()
    .map(x => parseInt(x))
  const lastDigit = arr.shift()
  let sum = arr.reduce(
    (acc, val, i) =>
      i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val),
    0,
  )
  if (lastDigit) {
    sum += lastDigit
  }

  return sum % 10 === 0
}

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
