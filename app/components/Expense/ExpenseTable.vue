<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'
import type { Category, ExpenseWithCategory } from '~/types/expense'
import { getHeader } from '~/pages/expense-management/helpers'

const {
  categories,
  expenses,
  expensesStatus,
} = defineProps<{
  categories: Category[] | undefined
  expenses: ExpenseWithCategory[] | undefined
  expensesStatus: string
}>()

const emit = defineEmits<{
  'update:expense': [id: string]
  'delete:expense': [id: string]
}>()

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const columns: TableColumn<ExpenseWithCategory>[] = [
  {
    id: 'expand',
    cell: ({ row }) =>
      h(UButton, {
        'color': 'neutral',
        'variant': 'ghost',
        'icon': 'i-lucide-chevron-down',
        'square': true,
        'aria-label': 'Expand',
        'ui': {
          leadingIcon: [
            'transition-transform', row.getIsExpanded() ? 'duration-200 rotate-180' : '',
          ],
        },
        'onClick': () => row.toggleExpanded(),
      }),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => getHeader(column, 'Date', UButton),
    cell: ({ row }) => {
      return new Date(row.original.date).toLocaleDateString()
    },
  },
  {
    accessorKey: 'category_id',
    header: ({ column }) => getHeader(column, 'Category', UButton),
    cell: ({ row }) => {
      const category = categories?.find(c => c.id === row.original.category_id)

      if (!category || !category.name) {
        return h('div', { class: 'text-sm' }, '')
      }

      return h(UBadge, { color: category.color }, category.name)
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => getHeader(column, 'Amount', UButton),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.original.amount.toString())

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return h('div', { class: 'font-semibold capitalize' }, formatted)
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
  },
]
const table = useTemplateRef('table')
const expanded = ref({ 0: true })
const sorting = ref([
  {
    id: 'date',
    desc: false,
  },
])

const pagination = ref({
  pageIndex: 0,
  pageSize: 10,
})
</script>

<template>
  <UCard>
    <UTable
      ref="table"
      v-model:expanded="expanded"
      v-model:sorting="sorting"
      v-model:pagination="pagination"
      :data="expenses"
      :columns="columns"
      :loading="expensesStatus === 'pending'"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
    >
      <template #actions-cell="{ row }">
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-heroicons-pencil-square"
          @click="() => emit('update:expense', row.original.id)"
        />
        <UButton
          color="error"
          variant="ghost"
          icon="i-heroicons-trash"
          @click="() => emit('delete:expense', row.original.id)"
        />
      </template>

      <template #expanded="{ row }">
        <div class="flex gap-2">
          <div class="font-semibold">
            Description:
          </div>
          <div class="text-sm">
            {{ row.original.description }}
          </div>
        </div>
      </template>
    </UTable>

    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
        v-if="(expenses?.length ?? 0) > pagination.pageSize"
        :default-page="pagination.pageIndex + 1"
        :items-per-page="pagination.pageSize"
        :total="expenses?.length ?? 0"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
      />
    </div>
  </UCard>
</template>
