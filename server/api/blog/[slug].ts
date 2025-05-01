import type { Database } from '#shared/types/views'
import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const { slug } = getRouterParams(event)
  const client = await serverSupabaseClient<Database>(event)

  if (slug === 'all') {
    return await queryCollection(event, 'blog').order('created', 'DESC').all()
  }

  let views = null
  const [content, surround] = await Promise.all([
    queryCollection(event, 'blog').path(`/blog/${slug}`).first(),
    queryCollectionItemSurroundings(event, 'blog', `/blog/${slug}`, { fields: ['description'] }),
  ])

  if (content?.path.includes(slug)) {
    let { data: view } = await client.from('Views').select().eq('slug', slug)

    if (!view || !view.length) {
      const { data } = await client.from('Views').insert({
        slug,
        viewCount: 1,
        updatedAt: new Date().toISOString(),
      }).select()
      view = data
    } else {
      const { data } = await client.from('Views').update({ viewCount: view[0].viewCount + 1 }).eq('slug', slug).select()
      view = data
    }

    views = view
  }

  if (content) {
    const date = new Date(content.created)
    content.created = date.toLocaleDateString('default', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })
  }

  return {
    content,
    surround,
    views: views ? views[0]?.viewCount : null,
  }
})
