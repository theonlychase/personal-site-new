import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await getAuthenticatedUser(event)
  const client = await serverSupabaseClient<Database>(event)
  const { id } = getRouterParams(event)
  const body = await readBody(event)

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Invalid expense ID',
    })
  }

  const { data, error } = await client
    .from('expenses')
    .update(body)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  return {
    data,
    error,
  }
})
