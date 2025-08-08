import {
  defineContentConfig, defineCollection, z,
} from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection(
      {
        source: '**',
        type: 'page',
      },
    ),
    blog: defineCollection(
      {
        source: 'blog/**/*.md',
        type: 'page',
        schema: z.object({
          id: z.string(),
          author: z.object({
            avatar: z.object({
              src: z.string(),
              target: z.string(),
            }),
            name: z.string(),
            to: z.string(),
          }),
          title: z.string(),
          description: z.string(),
          head: z.object({
            templateParams: z.object({
              title: z.string(),
              description: z.string(),
            }),
          }),
          image: z.object({
            src: z.string(),
            alt: z.string(),
          }),
          sitemap: z.object({ loc: z.string() }),
          short: z.string(),
          icon: z.string(),
          tags: z.array(z.string()),
          path: z.string(),
          slug: z.string(),
          created: z.string(),
        }),
      },
    ),
  },
})
