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
  $development: {
    runtimeConfig: {
      public: {
        baseUrl: 'http://localhost:8888',
      },
    },
  },
  eslint: {
    config: {
      stylistic: true,
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
    domains: ['picsum.photos', 'fastly.picsum.photos', 'images.unsplash.com', 'source.unsplash.com'],
  },
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@nuxt/image',
    '@nuxthq/studio',
    '@nuxt/eslint',
  ],
  nitro: {
    netlify: {
      images: {
        remote_images: ['https://picsum.photos/.*', 'https://fastly.picsum.photos/.*', 'https://images.unsplash.com/.*', 'https://source.unsplash.com/.*'],
      },
    },
  },
  $production: {
    runtimeConfig: {
      public: {
        baseUrl: process.env.BASE_URL,
      },
    },
  },
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
      login: '/login',
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
