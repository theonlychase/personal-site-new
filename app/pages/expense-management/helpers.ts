import type { Column } from '@tanstack/vue-table'
import type {
  CategoryFormData, Color, ExpenseFormData,
} from '~/types/expense'

export const colorOptions: {
  label: string
  value: Color
  chip?: {
    color: Color
    size: 'xl'
  }
}[] = [
  {
    label: 'Amber',
    value: 'amber',
    chip: {
      color: 'amber',
      size: 'xl',
    },
  },
  {
    label: 'Blue',
    value: 'secondary',
    chip: {
      color: 'secondary',
      size: 'xl',
    },
  },
  {
    label: 'Fuchsia',
    value: 'fuchsia',
    chip: {
      color: 'fuchsia',
      size: 'xl',
    },
  },
  {
    label: 'Gray',
    value: 'neutral',
    chip: {
      color: 'neutral',
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
    label: 'Orange',
    value: 'orange',
    chip: {
      color: 'orange',
      size: 'xl',
    },
  },
  {
    label: 'Purple',
    value: 'purple',
    chip: {
      color: 'purple',
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
    label: 'Sky',
    value: 'sky',
    chip: {
      color: 'sky',
      size: 'xl',
    },
  },
  {
    label: 'Teal',
    value: 'teal',
    chip: {
      color: 'teal',
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
]

export const DEFAULT_CATEGORY: CategoryFormData = {
  name: '',
  color: 'neutral',
}

export const DEFAULT_EXPENSE: ExpenseFormData = {
  amount: 0,
  description: '',
  category_id: '',
  date: new Date().toISOString().split('T')[0] as string,
}

export function getHeader<T>(column: Column<T>, label: string, component: ReturnType<typeof resolveComponent>) {
  const isSorted = column.getIsSorted()

  return h(component, {
    color: 'neutral',
    variant: 'ghost',
    label,
    icon: isSorted
      ? isSorted === 'asc'
        ? 'i-lucide-arrow-up-narrow-wide'
        : 'i-lucide-arrow-down-wide-narrow'
      : 'i-lucide-arrow-up-down',
    class: '-mx-2.5',
    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
  })
}
