import type { PostgrestError } from '@supabase/supabase-js'
import type { CategoryFormData, Color } from '~/types/expense'

export const useCategories = () => {
  const category = ref<CategoryFormData>({
    budget: 0,
    color: 'success',
    name: '',
  })
  const loading = ref(false)
  const toast = useToast()

  const handleErrors = (error: PostgrestError) => {
    const errorMessage: {
      title: string
      description: string
      color: Color
    } = {
      title: 'Error',
      description: 'Error Updating Category',
      color: 'error',
    }
    // Handle specific database errors
    if (error.code === '23505') {
      errorMessage.description = 'Category already exists'
    }

    if (error.code === '22P02') {
      errorMessage.description = 'Budget must be a number'
    }

    toast.add({ ...errorMessage })
    console.error(error)
  }

  const resetCategory = () => {
    loading.value = false

    category.value = {
      budget: 0,
      color: 'success',
      name: '',
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
    budget: number
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
    updates: {
      budget: number
      color: Color
      name: string
    },
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
    const { error } = await $fetch(`/api/categories/${id}`, {
      method: 'DELETE',
      headers: useRequestHeaders(['cookie']),
    })

    if (error) {
      handleErrors(error)
    }

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
