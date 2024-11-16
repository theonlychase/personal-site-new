import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    const user = await serverSupabaseUser(event);
    if (!user) {
      event.context.user = null;
      // Handle unauthenticated case
      return
    }

    event.context.user = user;
  } catch (error) {
    event.context.user = null;
    // Handle unauthenticated case
  }
})
