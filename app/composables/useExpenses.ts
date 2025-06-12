import type { PostgrestError } from '@supabase/supabase-js'
import type { Color, ExpenseFormData } from '~/types/expense'

export const useExpenses = () => {
  const expense = ref<ExpenseFormData>({
    amount: 0,
    description: '',
    category_id: '',
    date: new Date().toISOString().split('T')[0] as string,
  })
  const loading = ref(false)
  const toast = useToast()

  const handleErrors = (error: PostgrestError) => {
    const errorMessage: {
      title: string
      description: string
      color: Color
    } = {
      title: 'Error',
      description: 'Error Updating Expense',
      color: 'error',
    }

    if (error.code === '22P02') {
      errorMessage.description = 'amount must be a number'
    }

    toast.add({ ...errorMessage })
    console.error(error)
  }

  const resetExpense = () => {
    loading.value = false

    expense.value = {
      amount: 0,
      description: '',
      category_id: '',
      date: new Date().toISOString().split('T')[0] as string,
    }
  }

  const getExpenses = async () => {
    const {
      data, status, refresh,
    } = await useFetch('/api/expenses', { headers: useRequestHeaders(['cookie']) })

    return {
      data,
      status,
      refresh,
    }
  }

  const addExpense = async (expense: {
    amount: number
    description: string
    category_id: string
    date: string
  }) => {
    loading.value = true
    const { data, error } = await $fetch('/api/expenses', {
      method: 'POST',
      body: expense,
      headers: useRequestHeaders(['cookie']),
    })

    if (error) {
      handleErrors(error)
    }

    resetExpense()

    return { data }
  }

  const updateExpense = async (
    id: string,
    updates: {
      amount: number
      description: string
      category_id: string
      date: string
    },
  ) => {
    loading.value = true

    const { data, error } = await $fetch(`/api/expenses/${id}`, {
      method: 'PUT',
      body: updates,
      headers: useRequestHeaders(['cookie']),
    })

    if (error) {
      handleErrors(error)
    }

    resetExpense()

    return { data }
  }

  const deleteExpense = async (id: string) => {
    loading.value = true
    const { error } = await $fetch(`/api/expenses/${id}`, {
      method: 'DELETE',
      headers: useRequestHeaders(['cookie']),
    })

    if (error) {
      handleErrors(error)
    }

    resetExpense()
  }

  return {
    addExpense,
    deleteExpense,
    expense,
    getExpenses,
    loading,
    resetExpense,
    updateExpense,
  }
}
