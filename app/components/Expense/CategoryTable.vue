<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'
import type { Category, Color } from '~/types/expense'
import { getHeader } from '~/pages/expense-management/helpers'

const {
  categories,
  categoriesStatus,
} = defineProps<{
  categories: Category[] | undefined
  categoriesStatus: string
}>()

const emit = defineEmits<{
  'update:category': [id: string]
  'delete:category': [id: string]
}>()

const UButton = resolveComponent('UButton')
const columns: TableColumn<Category>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => getHeader(column, 'Name', UButton),
    meta: { class: { td: 'w-[300px] min-w-[200px] whitespace-normal break-all' } },
  },
  {
    accessorKey: 'budget',
    header: ({ column }) => getHeader(column, 'Budget', UButton),
    meta: { class: { td: 'w-[300px] min-w-[200px] whitespace-normal break-all' } },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('budget'))

      if (!amount || isNaN(amount)) {
        return h('div', { class: 'font-semibold capitalize' }, '')
      }

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return h('div', { class: 'font-semibold capitalize' }, formatted)
    },
  },
  {
    accessorKey: 'actions',
    meta: { class: { td: 'max-w-[100px]' } },
    header: 'Actions',
  },
]
const table = useTemplateRef('table')
const sorting = ref([
  {
    id: 'name',
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
      v-model:sorting="sorting"
      v-model:pagination="pagination"
      :data="categories"
      :columns="columns"
      :loading="categoriesStatus === 'pending'"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
    >
      <template #name-cell="{ row }">
        <div class="flex items-center gap-2">
          <UChip
            :color="row.original.color as Color"
            inset
            standalone
            size="xl"
          />
          <div class="capitalize">
            {{ row.original.name }}
          </div>
        </div>
      </template>

      <template #actions-cell="{ row }">
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-heroicons-pencil-square"
          @click="() => emit('update:category', row.original.id)"
        />
        <UButton
          color="error"
          variant="ghost"
          icon="i-heroicons-trash"
          @click="() => emit('delete:category', row.original.id)"
        />
      </template>
    </UTable>

    <div
      v-if="(categories?.length ?? 0) > pagination.pageSize"
      class="flex justify-center border-t border-default pt-4"
    >
      <UPagination
        :default-page="pagination.pageIndex + 1"
        :items-per-page="pagination.pageSize"
        :total="categories?.length ?? 0"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
      />
    </div>
  </UCard>
</template>
