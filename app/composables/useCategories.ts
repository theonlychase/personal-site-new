import type { PostgrestError } from '@supabase/supabase-js'
import type { CategoryFormData } from '~/types/expense'

export const useCategories = () => {
  const category = ref<CategoryFormData>({
    name: '',
    color: 'neutral',
    budget: 0,
  })
  const loading = ref(false)
  const toast = useToast()

  const handleErrors = (error: PostgrestError) => {
    // Handle specific database errors
    if (error.code === '23505') {
      toast.add({
        title: 'Error',
        description: 'Category already exists',
        color: 'error',
      })
    }

    // Generic database error
    throw createError({
      statusCode: 500,
      message: error.message,
      data: {
        code: error.code,
        details: error.details,
        hint: error.hint,
      },
    })
    console.error(error)
  }

  const resetCategory = () => {
    loading.value = false
    category.value = {
      name: '',
      color: 'neutral',
    }
  }

  const getCategories = async () => {
    const {
      data, status, refresh,
    } = await useFetch('/api/categories', { headers: useRequestHeaders(['cookie']) })

    return {
      data,
      status,
      refresh,
    }
  }

  const addCategory = async (category: {
    name: string
    color: string
  }) => {
    loading.value = true
    const { data, error } = await $fetch('/api/categories', {
      method: 'POST',
      body: category,
      headers: useRequestHeaders(['cookie']),
    })

    if (error) {
      handleErrors(error)
    }

    resetCategory()

    return { data }
  }

  const updateCategory = async (
    id: string,
    updates: Partial<{
      budget: number
      name: string
      color: string
    }>,
  ) => {
    loading.value = true
    const { data, error } = await $fetch(`/api/categories/${id}`, {
      method: 'PUT',
      body: updates,
      headers: useRequestHeaders(['cookie']),
    })

    if (error) {
      handleErrors(error)
    }

    resetCategory()

    return { data }
  }

  const deleteCategory = async (id: string) => {
    loading.value = true
    await $fetch(`/api/categories/${id}`, {
      method: 'DELETE',
      headers: useRequestHeaders(['cookie']),
    })

    resetCategory()
  }

  return {
    addCategory,
    category,
    deleteCategory,
    getCategories,
    loading,
    resetCategory,
    updateCategory,
  }
}
