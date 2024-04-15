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
  experimental: {
    scanPageMeta: true,
    sharedPrerenderData: true,
  },
  extends: ['@nuxt/ui-pro'],
  modules: [
    [
      '@nuxt/content',
      {
        markdown: {
          anchorLinks: false,
        },
        highlight: {
          theme: {
            default: 'material-theme-darker',
          },
          preload: ['vue'],
        },
        yaml: false,
      },
    ],
    '@nuxt/ui',
    ['@vueuse/nuxt', { ssrHandlers: true }],
    '@vueuse/motion/nuxt',
  ],
  runtimeConfig: {
    public: {
      emailId: '',
      emailKey: '',
      templateId: '',
    },
  },
  srcDir: 'src/',
  tailwindcss: {
    configPath: '~~/tailwind.config.ts',
  },
})
