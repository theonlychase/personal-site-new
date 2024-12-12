import UnheadVite from '@unhead/addons/vite'

export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxtjs/partytown',
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
  app: {
    head: {
      script: [
        {
          type: 'text/partytown',
          async: true,
          children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5HRV2GV');`,
        },
      ],
      noscript: [
        {
          body: true,
          children: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5HRV2GV" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        },
      ],
    },
  },
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
  partytown: {
    forward: ['dataLayer.push'],
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
