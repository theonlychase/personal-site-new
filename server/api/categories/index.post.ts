import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await getAuthenticatedUser(event)
  const client = await serverSupabaseClient<Database>(event)
  const body = await readBody(event)

  const { data, error } = await client
    .from('categories')
    .insert([
      {
        ...body,
        user_id: user.id,
      },
    ])
    .select()
    .single()

  return {
    data,
    error,
  }
})
