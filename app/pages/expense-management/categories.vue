<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Column } from '@tanstack/vue-table'
import { colorOptions } from './helpers'
import type {
  Category, CategoryFormData, Color,
} from '~/types/expense'

useHead({
  templateParams: {
    title: 'Expense Categories',
    description: 'Expense Categories Management',
  },
})

const UButton = resolveComponent('UButton')

const {
  addCategory, deleteCategory, getCategories, updateCategory,
} = useCategories()
const showAddModal = ref(false)
const modalLoading = ref(false)
const modalType = ref<'add' | 'update'>('add')
const sorting = ref([
  {
    id: 'name',
    desc: false,
  },
])

const {
  data: categories, refresh: refreshCategories, status: categoriesStatus,
} = await getCategories()

const newCategory = ref<CategoryFormData>({
  name: '',
  color: 'neutral',
})

const columns: TableColumn<Category>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => getHeader(column, 'Name'),
  },
  {
    accessorKey: 'color',
    header: ({ column }) => getHeader(column, 'Color'),
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
  },
]

const handleAddCategory = async () => {
  try {
    modalLoading.value = true
    await addCategory(newCategory.value)
    modalLoading.value = false
    showAddModal.value = false
    newCategory.value = {
      name: '',
      color: 'neutral',
    }

    refreshCategories()
  } catch (error) {
    console.error('Error adding category:', error)
  }
}

const handleUpdateCategory = async () => {
  try {
    modalLoading.value = true
    await updateCategory(newCategory.value.id as string, {
      name: newCategory.value.name,
      color: newCategory.value.color,
    })
    modalLoading.value = false
    showAddModal.value = false
    newCategory.value = {
      name: '',
      color: 'neutral',
    }

    refreshCategories()
  } catch (error) {
    console.error('Error adding category:', error)
  }
}

const handleUpdateModal = async (id: string) => {
  modalType.value = 'update'
  showAddModal.value = true
  const category = categories.value?.find(category => category.id === id)

  if (!category) return

  newCategory.value = {
    id: category.id,
    name: category.name,
    color: category.color as Color,
  }
}

const handleDeleteCategory = async (id: string) => {
  if (!confirm('Are you sure you want to delete this category?')) return

  try {
    modalLoading.value = true
    await deleteCategory(id)
    modalLoading.value = false

    refreshCategories()
  } catch (error) {
    console.error('Error deleting category:', error)
  }
}

function getHeader(column: Column<Category>, label: string) {
  const isSorted = column.getIsSorted()

  return h(UButton, {
    color: 'neutral',
    variant: 'ghost',
    label,
    icon: isSorted
      ? isSorted === 'asc'
        ? 'i-lucide-arrow-up-narrow-wide'
        : 'i-lucide-arrow-down-wide-narrow'
      : 'i-lucide-arrow-up-down',
    class: '-mx-2.5',
    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
  })
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
        showAddModal = true
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
          <div class="capitalize">
            {{ row.original.name }}
          </div>
        </template>

        <template #color-cell="{ row }">
          <UBadge
            class="font-semibold capitalize"
            :color="row.original.color as Color"
          >
            {{ row.original.color }}
          </UBadge>
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
      v-model:open="showAddModal"
      :title="modalType === 'add' ? 'Add Category' : 'Update Category'"
    >
      <template #body>
        <UForm
          :loading-auto="modalLoading"
          :state="newCategory"
          @submit.prevent="(payload) => {
            if (modalType === 'add') {
              handleAddCategory()
            }
            else {
              handleUpdateCategory(payload)
            }
          }"
        >
          <div class="grid grid-cols-2 gap-x-4">
            <UFormField label="Name">
              <UInput
                v-model="newCategory.name"
                class="w-full"
                required
              />
            </UFormField>

            <UFormField label="Color">
              <USelect
                v-model="newCategory.color"
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
              {{ modalType === 'add' ? 'Add Category' : 'Update Category' }}
            </UButton>
          </div>
        </UForm>
      </template>
    </UModal>
  </UPageBody>
</template>
