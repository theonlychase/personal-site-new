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

const recentExpenses = computed(() => {
  return expenses.value?.slice(0, 5) || []
})
</script>

<template>
  <UPageBody>
    <LazyUPageHeader
      title="Dashboard"
      class="mb-8"
      hydrate-never
    />

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6">
              Total Expenses
            </h3>
          </div>
        </template>

        <div class="text-3xl font-bold">
          ${{ totalExpenses.toFixed(2) }}
        </div>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6">
              Expenses by Category
            </h3>
          </div>
        </template>

        <div class="space-y-4">
          <div
            v-for="category in categories"
            :key="category.id"
            class="flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <UBadge :color="category.color as Color">
                {{ category.name }}
              </UBadge>
            </div>
            <div class="font-medium">
              ${{ (expensesByCategory[category.id] || 0).toFixed(2) }}
            </div>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6">
              Recent Expenses
            </h3>
          </div>
        </template>

        <div class="space-y-4">
          <div
            v-for="expense in recentExpenses"
            :key="expense.id"
            class="flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <UBadge :color="expense.categories?.color as Color">
                {{ expense.categories?.name }}
              </UBadge>
              <span class="text-sm text-gray-500">
                {{ expense.description }}
              </span>
            </div>
            <div class="font-medium">
              ${{ expense.amount.toFixed(2) }}
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </UPageBody>
</template>
