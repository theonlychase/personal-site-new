import type { ExpenseWithCategory, Category } from '~/types/expense'

export const useExpenseManagement = () => {
  const { getExpenses } = useExpenses()
  const { getCategories } = useCategories()

  const expenses = ref<ExpenseWithCategory[]>([])
  const categories = ref<Category[]>([])
  const loading = ref(true)

  const loadData = async () => {
    try {
      loading.value = true
      const [
        expensesData, categoriesData,
      ] = await Promise.all([
        getExpenses(), getCategories(),
      ])
      if (expensesData) expenses.value = expensesData
      if (categoriesData) categories.value = categoriesData
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      loading.value = false
    }
  }

  // Load data on composable initialization
  loadData()

  return {
    expenses,
    categories,
    loading,
    loadData,
  }
}
