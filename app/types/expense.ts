export type Color = 'amber' | 'fuchsia' | 'orange' | 'purple' | 'sky' | 'teal' | 'neutral' | 'error' | 'primary' | 'success' | 'warning' | 'secondary' | 'info'

export interface Category {
  id: string
  name: string
  color: string | null
  user_id: string | null
  created_at: string
  budget: number | null
}

export interface CategoryFormData {
  budget: number
  color: Color
  id?: string
  name: string
}

export interface Expense {
  amount: number
  category_id: string | null
  created_at: string
  date: string
  description: string | null
  id: string
  user_id: string | null
}

export interface ExpenseWithCategory extends Expense {
  categories: {
    id: string
    name: string
    color: string | null
  } | null
}

export interface ExpenseFormData {
  amount: number
  id?: string
  description: string
  category_id: string
  date: string
}
