import type { H3Event } from 'h3'
import { serverSupabaseUser } from '#supabase/server'

export const getAuthenticatedUser = async (event: H3Event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  return user
}
