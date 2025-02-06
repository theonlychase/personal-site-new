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
    // '@nuxtjs/partytown',
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
    database: {
      type: 'postgres',
      url: process.env.DATABASE_URL,
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
    netlify: {
      images: {
        remote_images: ['https://picsum.photos/.*', 'https://fastly.picsum.photos/.*', 'https://images.unsplash.com/.*', 'https://source.unsplash.com/.*', 'https://github.com/.*'],
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

  icon: {
    serverBundle: {
      collections: ['devicon', 'lucide', 'line-md', 'simple-icons'],
    },
  },

  image: {
    provider: 'netlifyImageCdn',
    domains: ['picsum', 'picsum.photos', 'https://picsum.photos', 'fastly.picsum.photos', 'images.unsplash.com', 'source.unsplash.com', 'github.com'],
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
