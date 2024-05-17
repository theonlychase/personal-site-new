import { serverSupabaseUser, serverSupabaseSession } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const session = await serverSupabaseSession(event)
  event.context.user = user
  event.context.session = session
})
