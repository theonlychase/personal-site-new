export default eventHandler(async (event) => {
  return await queryCollection(event, 'blog').order('created', 'DESC').all()
})
