import type { Color, ExpenseFormData } from '~/types/expense'

export const colorOptions: {
  label: string
  value: Color
  chip?: {
    color: Color
    size: 'xl'
  }
}[] = [
  {
    label: 'Gray',
    value: 'neutral',
    chip: {
      color: 'neutral',
      size: 'xl',
    },
  },
  {
    label: 'Red',
    value: 'error',
    chip: {
      color: 'error',
      size: 'xl',
    },
  },
  {
    label: 'Blue',
    value: 'primary',
    chip: {
      color: 'primary',
      size: 'xl',
    },
  },
  {
    label: 'Green',
    value: 'success',
    chip: {
      color: 'success',
      size: 'xl',
    },
  },
  {
    label: 'Yellow',
    value: 'warning',
    chip: {
      color: 'warning',
      size: 'xl',
    },
  },
  {
    label: 'Purple',
    value: 'secondary',
    chip: {
      color: 'secondary',
      size: 'xl',
    },
  },
  {
    label: 'Cyan',
    value: 'info',
    chip: {
      color: 'info',
      size: 'xl',
    },
  },
]

export const DEFAULT_EXPENSE: ExpenseFormData = {
  amount: 0,
  description: '',
  category_id: '',
  date: new Date().toISOString().split('T')[0] as string,
}
