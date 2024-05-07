import UnheadVite from '@unhead/addons/vite'

export default defineNuxtConfig({
  colorMode: {
    classSuffix: '',
  },
  components: [
    {
      path: '~/components',
      extensions: ['.vue'],
      pathPrefix: false,
    },
  ],
  content: {
    api: {
      baseURL: '/api/content',
    },
    highlight: {
      theme: 'night-owl',
      langs: ['css', 'js', 'ts', 'vue'],
    },
    markdown: {
      anchorLinks: false,
    },
  },
  experimental: {
    headNext: true,
    scanPageMeta: true,
    sharedPrerenderData: true,
  },
  extends: ['@nuxt/ui-pro'],
  image: {
    provider: 'netlifyImageCdn',
    domains: ['picsum.photos', 'fastly.picsum.photos'],
  },
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    ['@vueuse/nuxt', { ssrHandlers: true }],
    '@nuxtjs/supabase',
    '@nuxt/image',
    '@nuxthq/studio',
  ],
  runtimeConfig: {
    public: {
      emailId: '',
      emailKey: '',
      studioTokens: process.env.STUDIO_TOKENS,
      templateId: '',
    },
  },
  srcDir: 'src/',
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/confirm',
      include: ['/admin(/*)?'],
    },
  },
  tailwindcss: {
    configPath: '~~/tailwind.config.ts',
    viewer: false,
  },
  vite: {
    plugins: [
      UnheadVite(),
    ],
  },
})
