import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@vueuse/nuxt',
  ],

  $development: {
    runtimeConfig: { public: { baseUrl: 'http://localhost:8888' } },
    vite: {
      optimizeDeps: {
        include: [
          '@vue/devtools-core',
          '@vue/devtools-kit',
          '@nuxt/content/utils',
          '@tanstack/vue-table',
        ],
      },
    },
  },

  $production: { runtimeConfig: { public: { baseUrl: process.env.BASE_URL } } },

  components: [
    {
      path: '~/components',
      extensions: ['.vue'],
      pathPrefix: false,
    },
  ],

  css: ['~/assets/css/tailwind.css'],

  colorMode: { classSuffix: '' },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'night-owl',
          langs: [
            'css',
            'js',
            'ts',
            'tsx',
            'vue',
          ],
        },
      },
    },
    experimental: { nativeSqlite: true },
  },

  ui: { fonts: false },

  runtimeConfig: {
    public: {
      emailId: '',
      emailKey: '',
      studioTokens: process.env.STUDIO_TOKENS,
      templateId: '',
    },
  },

  features: { devLogs: true },

  experimental: { inlineRouteRules: true },

  compatibilityDate: '2025-08-08',

  nitro: {
    netlify: {
      images: {
        remote_images: [
          'https://picsum.photos/.*',
          'https://fastly.picsum.photos/.*',
          'https://images.unsplash.com/.*',
          'https://source.unsplash.com/.*',
          'https://github.com/.*',
        ],
      },
    },
    prerender: { autoSubfolderIndex: false },
  },

  eslint: { config: { stylistic: true } },

  icon: {
    serverBundle: {
      collections: [
        'devicon',
        'lucide',
        'line-md',
        'simple-icons',
      ],
    },
  },

  image: {
    provider: 'netlifyImageCdn',
    domains: [
      'picsum',
      'picsum.photos',
      'https://picsum.photos',
      'fastly.picsum.photos',
      'images.unsplash.com',
      'source.unsplash.com',
      'github.com',
    ],
  },

  uiPro: { license: process.env.NUXT_UI_PRO_LICENSE },
})
