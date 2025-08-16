export default eventHandler(async (event) => {
  const { slug } = getRouterParams(event)

  if (slug === 'all') {
    return await queryCollection(event, 'blog').order('created', 'DESC').all()
  }

  const [
    content, surround,
  ] = await Promise.all([
    queryCollection(event, 'blog').path(`/blog/${slug}`).first(), queryCollectionItemSurroundings(event, 'blog', `/blog/${slug}`, { fields: ['description'] }),
  ])

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
  }
})
