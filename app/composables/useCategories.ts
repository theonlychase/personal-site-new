export const useCategories = () => {
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
    const {
      data, status, refresh,
    } = await useFetch('/api/categories', {
      method: 'POST',
      body: category,
      headers: useRequestHeaders(['cookie']),
    })

    return {
      data,
      status,
      refresh,
    }
  }

  const updateCategory = async (
    id: string,
    updates: Partial<{
      name: string
      color: string
    }>,
  ) => {
    const { data } = await useFetch(`/api/categories/${id}`, {
      method: 'PUT',
      body: updates,
      headers: useRequestHeaders(['cookie']),
    })
    return data.value
  }

  const deleteCategory = async (id: string) => {
    await useFetch(`/api/categories/${id}`, {
      method: 'DELETE',
      headers: useRequestHeaders(['cookie']),
    })
  }

  return {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  }
}
