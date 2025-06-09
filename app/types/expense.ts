export type Color = 'neutral' | 'error' | 'primary' | 'success' | 'warning' | 'secondary' | 'info'

export interface Category {
  id: string
  name: string
  color: string | null
  user_id: string | null
  created_at: string
  icon: string | null
}

export interface CategoryFormData {
  id?: string
  name: string
  color: Color
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
  description: string
  category_id: string
  date: string
}
