import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await getAuthenticatedUser(event)
  const client = await serverSupabaseClient<Database>(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Invalid expense ID',
    })
  }

  // First check if the expense belongs to the user
  const { data: existingExpense, error: fetchError } = await client
    .from('expenses')
    .select('id')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (fetchError || !existingExpense) {
    throw createError({
      statusCode: 404,
      message: 'Expense not found or unauthorized',
    })
  }

  const { error } = await client
    .from('expenses')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  return {
    success: true,
    error,
  }
})
