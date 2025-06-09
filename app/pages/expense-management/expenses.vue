<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { DEFAULT_EXPENSE } from './helpers'
import type {
  Color, ExpenseWithCategory, ExpenseFormData,
} from '~/types/expense'

useHead({
  templateParams: {
    title: 'Expenses',
    description: 'Expenses Management',
  },
})

const {
  addExpense, deleteExpense, getExpenses,
} = useExpenses()
const showAddModal = ref(false)
const modalLoading = ref(false)

const {
  data: expenses, refresh: refreshExpenses, status: expensesStatus,
} = await getExpenses()
const { getCategories } = useCategories()
const { data: categories } = await getCategories()

const newExpense = ref<ExpenseFormData>(DEFAULT_EXPENSE)

const columns: TableColumn<ExpenseWithCategory>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      return new Date(row.original.date).toLocaleDateString()
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
  },
]

const handleAddExpense = async () => {
  try {
    modalLoading.value = true
    await addExpense(newExpense.value)
    modalLoading.value = false
    showAddModal.value = false
    newExpense.value = DEFAULT_EXPENSE

    refreshExpenses()
  } catch (error) {
    console.error('Error adding expense:', error)
  }
}

const handleDeleteExpense = async (id: string) => {
  if (!confirm('Are you sure you want to delete this expense?')) return

  try {
    modalLoading.value = true
    await deleteExpense(id)
    modalLoading.value = false

    refreshExpenses()
  } catch (error) {
    console.error('Error deleting expense:', error)
  }
}
</script>

<template>
  <UPageBody>
    <LazyUPageHeader
      title="Expenses"
      class="mb-8"
      hydrate-never
    />

    <UButton
      icon="i-heroicons-plus"
      @click="showAddModal = true"
    >
      Add Expense
    </UButton>

    <UCard>
      <UTable
        :data="expenses"
        :columns="columns"
        :loading="expensesStatus === 'pending'"
      >
        <template #amount-cell="{ row }">
          ${{ (row.original.amount as number)?.toFixed(2) }}
        </template>

        <template #category-cell="{ row }: any">
          <UBadge
            :color="row.original.category?.color || 'neutral'"
          >
            {{ row.original.categories?.name }}
          </UBadge>
        </template>

        <template #actions-cell="{ row }">
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-heroicons-pencil-square"
            @click="() => {}"
          />
          <UButton
            color="error"
            variant="ghost"
            icon="i-heroicons-trash"
            @click="() => handleDeleteExpense(row.original.id)"
          />
        </template>
      </UTable>
    </UCard>

    <UModal
      v-model:open="showAddModal"
      title="Add Expense"
    >
      <template #body>
        <UForm
          class="space-y-4"
          :loading-auto="modalLoading"
          :state="newExpense"
          @submit.prevent="handleAddExpense"
        >
          <div class="grid grid-cols-2 gap-x-4">
            <UFormField label="Amount">
              <UInput
                v-model="newExpense.amount"
                class="w-full"
                type="number"
                step="0.01"
                required
              />
            </UFormField>

            <UFormField label="Category">
              <USelect
                v-model="newExpense.category_id"
                class="w-full"
                :items="categories?.map(({ color, name, id }) => ({ label: name, value: id, color }))"
                placeholder="Select a category"
                required
              >
                <template #leading="{ modelValue }">
                  <UChip
                    v-if="modelValue"
                    :color="categories?.find(category => category.id === modelValue)?.color as Color"
                    inset
                    standalone
                    size="xl"
                  />
                </template>

                <template #item-leading="{ item }">
                  <UChip
                    v-if="item"
                    :color="categories?.find(category => category.id === item.value as Color)?.color as Color"
                    inset
                    standalone
                    size="xl"
                  />
                </template>
              </USelect>
            </UFormField>
          </div>

          <div class="grid grid-cols-2 gap-x-4">
            <UFormField label="Description">
              <UInput
                v-model="newExpense.description"
                class="w-full"
                required
              />
            </UFormField>

            <UFormField label="Date">
              <UInput
                v-model="newExpense.date"
                class="w-full"
                type="date"
                required
              />
            </UFormField>
          </div>

          <div class="mt-6 flex justify-end gap-3">
            <UButton
              color="neutral"
              variant="ghost"
              @click="showAddModal = false"
            >
              Cancel
            </UButton>
            <UButton
              trailing
              :loading="modalLoading"
              type="submit"
              color="primary"
            >
              Add Expense
            </UButton>
          </div>
        </UForm>
      </template>
    </UModal>
  </UPageBody>
</template>
