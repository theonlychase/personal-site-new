import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await getAuthenticatedUser(event)
  const client = await serverSupabaseClient<Database>(event)

  const { data, error } = await client
    .from('categories')
    .select('*')
    .eq('user_id', user.id)
    .order('name')

  if (error) {
    throw createError({
      statusCode: 500,
      message: error.message,
    })
  }

  return data
})
