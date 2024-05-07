import type { Database } from '~/types/views'
import { serverQueryContent } from '#content/server'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') ?? ''
  const client = await serverSupabaseClient<Database>(event)
  const docs = await serverQueryContent(event).find()

  if (docs.some(doc => doc._path?.includes(slug))) {
    let { data: view } = await client.from('Views').select('*').eq('slug', slug)

    if (!view || !view.length) {
      // @ts-expect-error - insert should be able to take a type
      const { data } = await client.from('Views').insert({ slug, viewCount: 1 }).select()
      view = data
    } else {
      const { data } = await client.from('Views').update({ viewCount: view[0].viewCount + 1 }).eq('slug', slug).select()
      view = data
    }

    return {
      view,
    }
  }
})
