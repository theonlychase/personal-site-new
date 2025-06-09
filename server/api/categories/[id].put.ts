import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await getAuthenticatedUser(event)
  const client = await serverSupabaseClient<Database>(event)
  const body = await readBody(event)
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
    .update(body)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (fetchError || !existingCategory) {
    throw createError({
      statusCode: 404,
      message: 'Category not found or unauthorized',
    })
  }

  const { data, error } = await client
    .from('categories')
    .update(body)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    throw createError({
      statusCode: 500,
      message: error.message,
    })
  }

  return data
})
