<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { colorOptions, getHeader } from './helpers'
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
const UButton = resolveComponent('UButton')
const showModal = ref(false)
const modalType = ref<'add' | 'update'>('add')
const sorting = ref([
  {
    id: 'name',
    desc: false,
  },
])

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
  const currentCategory = categories.value?.find(category => category.id === id)

  if (!currentCategory) return

  category.value = {
    id: currentCategory.id,
    name: currentCategory.name,
    color: currentCategory.color as Color,
    budget: currentCategory.budget ?? 0,
  }
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
        v-model:sorting="sorting"
        :data="categories"
        :columns="columns"
        :loading="categoriesStatus === 'pending'"
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

        <template #color-cell="{ row }">
          <div
            class="font-semibold capitalize"
          >
            {{ row.original.budget }}
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
          <div class="grid grid-cols-2 gap-x-4">
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
                v-model="category.budget"
                class="w-full"
                required
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
