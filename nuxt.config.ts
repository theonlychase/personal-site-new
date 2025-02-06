import UnheadVite from '@unhead/addons/vite'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui-pro',
    '@nuxtjs/seo',
    '@nuxt/content',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxthub/core',
    '@nuxtjs/supabase',
  ],

  $development: {
    runtimeConfig: {
      public: {
        baseUrl: 'http://localhost:8888',
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

  components: [
    {
      path: '~/components',
      extensions: ['.vue'],
      pathPrefix: false,
    },
  ],

  css: ['~/assets/css/tailwind.css'],

  site: {
    url: 'https://chaseisley.dev',
    name: 'Chase Isley',
  },

  colorMode: {
    classSuffix: '',
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'night-owl',
          langs: ['css', 'js', 'ts', 'vue'],
        },
      },
    },
    preview: {
      api: 'https://api.nuxt.studio',
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

  future: {
    compatibilityVersion: 4,
  },

  features: {
    devLogs: true,
  },

  experimental: {
    inlineRouteRules: true,
  },

  compatibilityDate: '2025-02-05',

  nitro: {
    experimental: {
      // Enable Server API documentation within NuxtHub
      openAPI: true,
    },
  },

  hub: {
    database: true,
    kv: true,
    blob: true,
    cache: true,
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

  icon: {
    serverBundle: {
      collections: ['devicon', 'lucide', 'line-md', 'simple-icons'],
    },
  },

  robots: {
    disallow: ['/confirm', '/profile'],
  },

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: ['/profile(/*)?'],
    },
  },

  uiPro: {
    license: process.env.NUXT_UI_PRO_LICENSE,
  },
})
