import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    const client = await serverSupabaseClient(event)
    const { data } = await client.auth.getUser()

    if (data.user) {
      event.context.user = data.user
    }
  }
  catch (error: unknown) {
    event.context.user = null
    console.error(error)
    // Handle unauthenticated case
  }
})
