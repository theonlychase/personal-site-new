import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // Only protect expense management routes
  if (!event.path.startsWith('/api/expenses') && !event.path.startsWith('/api/categories')) {
    return
  }

  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }
})
