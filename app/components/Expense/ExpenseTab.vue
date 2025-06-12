<script setup lang="ts">
import { formatUSCurrency } from '~/pages/expense-management/helpers'
import type {
  Color, Category, ExpenseWithCategory,
} from '~/types/expense'

const {
  categories,
  expenses,
  expensesStatus,
  refreshExpenses,
} = defineProps<{
  categories: Category[] | undefined
  expenses: ExpenseWithCategory[] | undefined
  expensesStatus: string
  refreshExpenses: () => void
}>()

const showAddModal = ref(false)
const modalType = ref<'add' | 'update'>('add')
const amountInput = useTemplateRef('amountInput')

const {
  addExpense, deleteExpense, expense, updateExpense, loading,
} = useExpenses()

const handleAddExpense = async () => {
  modalType.value = 'add'
  await addExpense(expense.value)
  showAddModal.value = false

  refreshExpenses()
}

const handleUpdateExpense = async () => {
  await updateExpense(expense.value.id as string, {
    amount: expense.value.amount,
    description: expense.value.description,
    category_id: expense.value.category_id,
    date: expense.value.date,
  })

  showAddModal.value = false

  refreshExpenses()
}

const handleUpdateModal = async (id: string) => {
  modalType.value = 'update'
  showAddModal.value = true
  const currentExpense = expenses?.find(exp => exp.id === id)

  if (!currentExpense) return

  expense.value = {
    id: currentExpense.id,
    amount: currentExpense.amount,
    description: currentExpense.description ?? '',
    category_id: currentExpense.category_id ?? '',
    date: currentExpense.date ?? '',
  }

  nextTick(() => {
    if (amountInput.value?.inputRef) {
      amountInput.value.inputRef.value = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(expense.value.amount)
    }
  })
}

const handleDeleteExpense = async (id: string) => {
  if (!confirm('Are you sure you want to delete this expense?')) return

  await deleteExpense(id)

  refreshExpenses()
}
</script>

<template>
  <UPageBody class="mt-0">
    <UButton
      class="mb-4"
      icon="i-heroicons-plus"
      @click="() => {
        showAddModal = true
        modalType = 'add'
      }"
    >
      Add Expense
    </UButton>

    <ExpenseTable
      :categories="categories"
      :expenses="expenses"
      :expenses-status="expensesStatus"
      @update:expense="handleUpdateModal"
      @delete:expense="handleDeleteExpense"
    />

    <UModal
      v-model:open="showAddModal"
      :title="modalType === 'add' ? 'Add Expense' : 'Update Expense'"
    >
      <template #body>
        <UForm
          :loading-auto="loading"
          :state="expense"
          @submit.prevent="() => {
            if (modalType === 'add') {
              handleAddExpense()
            }
            else {
              handleUpdateExpense()
            }
          }"
        >
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Amount">
              <UInput
                ref="amountInput"
                placeholder="$0.00"
                class="w-full"
                required
                @input="(e: Event) => {
                  const val = useInputFormat({
                    target: e.target as HTMLInputElement,
                    formatter: formatUSCurrency,
                  })

                  expense.amount = parseFloat(val.replace(/[^\d.]/g, ''))
                }"
              />
            </UFormField>

            <UFormField
              label="Category"
              :help="!categories?.length ? 'Please add a category first' : ''"
            >
              <USelect
                v-model="expense.category_id"
                class="w-full"
                :class="{
                  '[&_>_span:first-child]:hidden !ps-2': !expense.category_id,
                }"
                :disabled="!categories?.length"
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

            <UFormField label="Description">
              <UInput
                v-model="expense.description"
                class="w-full"
              />
            </UFormField>

            <UFormField label="Date">
              <UInput
                v-model="expense.date"
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
              :loading="loading"
              type="submit"
              color="primary"
            >
              {{ modalType === 'add' ? 'Add Expense' : 'Update Expense' }}
            </UButton>
          </div>
        </UForm>
      </template>
    </UModal>
  </UPageBody>
</template>
