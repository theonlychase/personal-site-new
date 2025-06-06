import { TemplateParamsPlugin, AliasSortingPlugin } from '@unhead/vue/plugins'

export default defineNuxtPlugin({
  setup() {
    const unhead = injectHead()
    unhead.use(TemplateParamsPlugin)
    unhead.use(AliasSortingPlugin)
  },
})
