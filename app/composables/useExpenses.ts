import { useFetch } from '#imports'

export const useExpenses = () => {
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
    const { data } = await useFetch('/api/expenses', {
      method: 'POST',
      body: expense,
      headers: useRequestHeaders(['cookie']),
    })
    return data.value
  }

  const updateExpense = async (
    id: string,
    updates: Partial<{
      amount: number
      description: string
      category_id: string
      date: string
    }>,
  ) => {
    const { data } = await useFetch(`/api/expenses/${id}`, {
      method: 'PUT',
      body: updates,
      headers: useRequestHeaders(['cookie']),
    })
    return data.value
  }

  const deleteExpense = async (id: string) => {
    await useFetch(`/api/expenses/${id}`, {
      method: 'DELETE',
      headers: useRequestHeaders(['cookie']),
    })
  }

  return {
    getExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
  }
}
