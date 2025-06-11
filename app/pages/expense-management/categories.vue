<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'
import {
  colorOptions, formatUSCurrency, getHeader,
} from './helpers'
import type { Category, Color } from '~/types/expense'

useHead({
  templateParams: {
    title: 'Expense Categories',
    description: 'Expense Categories Management',
  },
})

const columns: TableColumn<Category>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => getHeader(column, 'Name', UButton),
  },
  {
    accessorKey: 'budget',
    header: ({ column }) => getHeader(column, 'Budget', UButton),
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
  },
]
const table = useTemplateRef('table')
const UButton = resolveComponent('UButton')
const showModal = ref(false)
const modalType = ref<'add' | 'update'>('add')
const budgetInput = useTemplateRef('budgetInput')
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

const {
  category, loading, addCategory, deleteCategory, getCategories, resetCategory, updateCategory,
} = useCategories()

const {
  data: categories, refresh: refreshCategories, status: categoriesStatus,
} = await getCategories()

const handleAddCategory = async () => {
  modalType.value = 'add'
  await addCategory(category.value)
  showModal.value = false

  refreshCategories()
}

const handleUpdateCategory = async () => {
  await updateCategory(category.value.id as string, {
    name: category.value.name,
    color: category.value.color,
    budget: category.value.budget,
  })

  showModal.value = false

  refreshCategories()
}

const handleUpdateModal = async (id: string) => {
  modalType.value = 'update'
  showModal.value = true
  const currentCategory = categories.value?.find(cat => cat.id === id)

  if (!currentCategory) return

  category.value = {
    id: currentCategory.id,
    name: currentCategory.name,
    color: currentCategory.color as Color,
    budget: currentCategory.budget ?? 0,
  }

  nextTick(() => {
    if (budgetInput.value?.inputRef) {
      budgetInput.value.inputRef.value = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(category.value.budget)
    }
  })
}

const handleDeleteCategory = async (id: string) => {
  if (!confirm('Are you sure you want to delete this category?')) return

  await deleteCategory(id)

  refreshCategories()
}

function getChip(value: string) {
  return colorOptions.find(item => item.value === value)?.chip
}
</script>

<template>
  <UPageBody>
    <LazyUPageHeader
      title="Categories"
      class="mb-8"
      hydrate-never
    />

    <UButton
      class="mb-4"
      icon="i-heroicons-plus"
      @click="() => {
        showModal = true
        modalType = 'add'
      }"
    >
      Add Category
    </UButton>

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

        <template #budget-cell="{ row }">
          <div
            class="font-semibold capitalize"
          >
            {{ Number(row.original.budget).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
          </div>
        </template>

        <template #actions-cell="{ row }">
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-heroicons-pencil-square"
            @click="() => handleUpdateModal(row.original.id)"
          />
          <UButton
            color="error"
            variant="ghost"
            icon="i-heroicons-trash"
            @click="() => handleDeleteCategory(row.original.id)"
          />
        </template>
      </UTable>

      <div class="flex justify-center border-t border-default pt-4">
        <UPagination
          :default-page="pagination.pageIndex + 1"
          :items-per-page="pagination.pageSize"
          :total="categories?.length ?? 0"
          @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
        />
      </div>
    </UCard>

    <UModal
      v-model:open="showModal"
      :title="modalType === 'add' ? 'Add Category' : 'Update Category'"
      @after:leave="resetCategory"
    >
      <template #body>
        <UForm
          :loading-auto="loading"
          :state="category"
          @submit.prevent="() => {
            if (modalType === 'add') {
              handleAddCategory()
            }
            else {
              handleUpdateCategory()
            }
          }"
        >
          <div class="grid grid-cols-2 gap-4">
            <UFormField
              label="Name"
            >
              <UInput
                v-model="category.name"
                class="w-full"
                required
              />
            </UFormField>

            <UFormField label="Color">
              <USelect
                v-model="category.color"
                class="w-full"
                :items="colorOptions"
                required
              >
                <template #leading="{ modelValue }">
                  <UChip
                    v-if="modelValue"
                    :color="getChip(modelValue)?.color"
                    inset
                    standalone
                    size="xl"
                  />
                </template>
              </USelect>
            </UFormField>

            <UFormField
              label="Budget"
            >
              <UInput
                ref="budgetInput"
                type="text"
                placeholder="$0.00"
                class="w-full"
                @input="(e: Event) => {
                  const val = useInputFormat({
                    target: e.target as HTMLInputElement,
                    formatter: formatUSCurrency,
                  })

                  category.budget = parseFloat(val.replace(/[^\d.]/g, ''))
                }"
              />
            </UFormField>
          </div>

          <div class="mt-6 flex justify-end gap-3">
            <UButton
              color="neutral"
              variant="ghost"
              @click="showModal = false"
            >
              Cancel
            </UButton>
            <UButton
              trailing
              :loading="loading"
              type="submit"
              color="primary"
            >
              {{ modalType === 'add' ? 'Add Category' : 'Update Category' }}
            </UButton>
          </div>
        </UForm>
      </template>
    </UModal>
  </UPageBody>
</template>
