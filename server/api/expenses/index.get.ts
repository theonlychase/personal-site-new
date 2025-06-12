import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await getAuthenticatedUser(event)
  const client = await serverSupabaseClient<Database>(event)

  const { data, error } = await client
    .from('expenses')
    .select(`
      *,
      categories (
        id,
        budget,
        name,
        color
      )
    `)
    .eq('user_id', user.id)
    .order('date', { ascending: false })

  if (error) {
    throw createError({
      statusCode: 500,
      message: error.message,
    })
  }

  return data
})
