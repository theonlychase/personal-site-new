import UnheadVite from '@unhead/addons/vite'

export default defineNuxtConfig({
  //   app: {
  //     head: {
  //       script: [
  //         {
  //           type: 'text/partytown',
  //           async: true,
  //           children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  // new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  // j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  // 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  // })(window,document,'script','dataLayer','GTM-5HRV2GV');`,
  //         },
  //       ],
  //       noscript: [
  //         {
  //           body: true,
  //           children: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5HRV2GV" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
  //         },
  //       ],
  //     },
  //   },
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

  css: ['~/assets/css/tailwind.css'],

  site: {
    url: 'https://chaseisley.dev/',
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
    renderer: {
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

  routeRules: {
    '/': { prerender: true },
    '/blog': { prerender: true },
    '/blog/**': { prerender: true },
  },

  experimental: {
    headNext: true,
    scanPageMeta: true,
    sharedPrerenderData: true,
  },

  // compatibilityDate: '2025-02-03',

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

  icon: {
    serverBundle: {
      collections: ['devicon', 'lucide', 'line-md', 'simple-icons'],
    },
  },

  image: {
    provider: 'netlifyImageCdn',
    domains: ['picsum', 'picsum.photos', 'https://picsum.photos', 'fastly.picsum.photos', 'images.unsplash.com', 'source.unsplash.com'],
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

  // partytown: {
  //   forward: ['dataLayer.push'],
  // },
  uiPro: {
    license: process.env.NUXT_UI_PRO_LICENSE,
  },
})
