<script setup lang="ts">
import type { Color } from '~/types/expense'

useHead({
  templateParams: {
    title: 'Expense Management Dashboard',
    description: 'Overview of Expense Management',
  },
})

const { getExpenses } = useExpenses()
const { data: expenses } = await getExpenses()

const { getCategories } = useCategories()
const { data: categories } = await getCategories()

const totalExpenses = computed(() => {
  return expenses.value?.reduce((sum, expense) => sum + expense.amount, 0) || 0
})

const expensesByCategory = computed(() => {
  const categoryTotals: Record<string, number> = {}
  expenses.value?.forEach((expense) => {
    const categoryId = expense.category_id
    if (categoryId && !categoryTotals[categoryId]) {
      categoryTotals[categoryId] = 0
    }
    if (categoryId && categoryTotals[categoryId] !== undefined) {
      categoryTotals[categoryId] += expense.amount
    }
  })
  return categoryTotals
})

const highestExpenseCategory = computed(() => {
  if (!expenses.value?.length || !categories.value?.length) return null

  const categoryTotals = expensesByCategory.value
  const categoryIds = Object.keys(categoryTotals)
  if (!categoryIds.length) return null

  const highestCategoryId = categoryIds.reduce((max, categoryId) => {
    return (categoryTotals[categoryId] ?? 0) > (categoryTotals[max] ?? 0) ? categoryId : max
  })

  const category = categories.value.find(category => category.id === highestCategoryId)
  if (!category) return null

  return {
    name: category.name,
    color: category.color,
    amount: categoryTotals[highestCategoryId] ?? 0,
  }
})

// const recentExpenses = computed(() => {
//   return expenses?.value?.slice(0, 5) || []
// })
</script>

<template>
  <UPageBody>
    <LazyUPageHeader
      title="Dashboard"
      class="mb-8"
      hydrate-never
    />

    <div class="grid gap-6 md:grid-cols-2">
      <UPageCard>
        <template #header>
          <div class="flex flex-col">
            <div class="text-lg font-medium leading-6 mb-4">
              Total Expenses
            </div>

            <div class="text-3xl font-bold">
              {{ new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(totalExpenses ?? 0.00) }}
            </div>
          </div>
        </template>
      </UPageCard>

      <UPageCard>
        <template #header>
          <div class="flex flex-col">
            <div class="text-lg font-medium leading-6 mb-4">
              Highest Expense Category
            </div>

            <div class="flex items-center gap-3 text-3xl font-bold">
              <UBadge
                size="xl"
                :color="highestExpenseCategory?.color as Color"
              >
                {{ highestExpenseCategory?.name || 'No expenses' }}
              </UBadge>

              <div class="text-xl">
                {{ highestExpenseCategory ? new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(highestExpenseCategory.amount) : '' }}
              </div>
            </div>
          </div>
        </template>
      </UPageCard>
    </div>
  </UPageBody>
</template>
