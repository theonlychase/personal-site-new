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
    meta: { class: { td: 'w-12' } },
    cell: ({ row }) => row.original.description
      ? h(UButton, {
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
        })
      : null,
  },
  {
    accessorKey: 'date',
    meta: { class: { td: 'w-[120px]' } },
    header: ({ column }) => getHeader(column, 'Date', UButton),
    cell: ({ row }) => {
      return new Date(row.original.date).toLocaleDateString()
    },
  },
  {
    accessorKey: 'amount',
    meta: { class: { td: 'w-[170px]' } },
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
    accessorKey: 'category',
    meta: { class: { td: 'w-[170px]' } },
    header: ({ column }) => getHeader(column, 'Category', UButton),
  },
  {
    accessorKey: 'actions',
    meta: { class: { td: 'max-w-[100px]' } },
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

const getCategory = (id: string) => {
  return categories?.find(c => c.id === id)
}
</script>

<template>
  <UCard>
    <UTable
      ref="table"
      v-model:expanded="expanded"
      v-model:sorting="sorting"
      v-model:pagination="pagination"
      :data="expenses"
      :ui="{ tr: 'data-[expanded=true]:bg-elevated/50' }"
      :columns="columns"
      :loading="expensesStatus === 'pending'"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
    >
      <template #category-cell="{ row: { original: { category_id } } }">
        <UBadge
          v-if="category_id && getCategory(category_id)?.name"
          :color="getCategory(category_id)?.color"
        >
          {{ getCategory(category_id)?.name }}
        </UBadge>
      </template>

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

    <div
      v-if="(expenses?.length ?? 0) > pagination.pageSize"
      class="flex justify-center border-t border-default pt-4"
    >
      <UPagination
        :default-page="pagination.pageIndex + 1"
        :items-per-page="pagination.pageSize"
        :total="expenses?.length ?? 0"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
      />
    </div>
  </UCard>
</template>
