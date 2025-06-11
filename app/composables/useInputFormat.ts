export function useInputFormat({ target, formatter }: {
  target: HTMLInputElement
  formatter: (args: {
    value: string
    input: HTMLInputElement
  }) => string
}): string {
  const node = target // input element
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
