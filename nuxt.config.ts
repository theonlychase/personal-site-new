import UnheadVite from '@unhead/addons/vite'

export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@nuxt/image',
    '@nuxthq/studio',
    '@nuxt/eslint',
  ],
  $development: {
    runtimeConfig: {
      public: {
        baseUrl: 'http://localhost:8888',
      },
    },
    features: {
      devLogs: true,
    },
  },
  $production: {
    runtimeConfig: {
      public: {
        baseUrl: process.env.BASE_URL,
      },
    },
  },
  components: [
    {
      path: '~/components',
      extensions: ['.vue'],
      pathPrefix: false,
    },
  ],
  colorMode: {
    classSuffix: '',
  },
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
  runtimeConfig: {
    public: {
      emailId: '',
      emailKey: '',
      studioTokens: process.env.STUDIO_TOKENS,
      templateId: '',
    },
  },
  srcDir: 'src/',
  experimental: {
    headNext: true,
    scanPageMeta: true,
    sharedPrerenderData: true,
  },
  nitro: {
    netlify: {
      images: {
        remote_images: ['https://picsum.photos/.*', 'https://fastly.picsum.photos/.*', 'https://images.unsplash.com/.*', 'https://source.unsplash.com/.*'],
      },
    },
  },
  vite: {
    plugins: [
      UnheadVite(),
    ],
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  image: {
    provider: 'netlifyImageCdn',
    domains: ['picsum', 'picsum.photos', 'https://picsum.photos', 'fastly.picsum.photos', 'images.unsplash.com', 'source.unsplash.com'],
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: ['/profile(/*)?'],
    },
  },
  tailwindcss: {
    configPath: '~~/tailwind.config.ts',
    viewer: false,
  },
})
