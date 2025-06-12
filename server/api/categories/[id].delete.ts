import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await getAuthenticatedUser(event)
  const client = await serverSupabaseClient<Database>(event)
  const { id } = getRouterParams(event)

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Invalid category ID',
    })
  }

  // First check if the category belongs to the user
  const { data: existingCategory, error: fetchError } = await client
    .from('categories')
    .select('id')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (fetchError || !existingCategory) {
    throw createError({
      statusCode: 404,
      message: 'Category not found or unauthorized',
    })
  }

  const { error } = await client
    .from('categories')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  return {
    success: true,
    error,
  }
})
