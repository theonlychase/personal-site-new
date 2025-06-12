<script setup lang="ts">
import { colorOptions, formatUSCurrency } from '~/pages/expense-management/helpers'
import type { Color, Category } from '~/types/expense'

const {
  categories,
  categoriesStatus,
  refreshCategories,
} = defineProps<{
  categories: Category[] | undefined
  categoriesStatus: string
  refreshCategories: () => void
}>()

const showModal = ref(false)
const modalType = ref<'add' | 'update'>('add')
const budgetInput = useTemplateRef('budgetInput')

const {
  category, loading, addCategory, deleteCategory, resetCategory, updateCategory,
} = useCategories()

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
  const currentCategory = categories?.find(cat => cat.id === id)

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
  <UPageBody class="mt-0">
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

    <CategoryTable
      :categories="categories"
      :categories-status="categoriesStatus"
      @update:category="handleUpdateModal"
      @delete:category="handleDeleteCategory"
    />

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
                placeholder="e.g. Food"
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
