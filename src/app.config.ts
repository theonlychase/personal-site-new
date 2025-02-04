export default defineAppConfig({
  ui: {
    button: {
      compoundVariants: [
        {
          color: 'primary',
          variant: 'solid',
          class: 'bg-green-500 hover:bg-green-600 text-white',
        },
      ],
    },
    formField: {
      slots: {
        error: 'capitalize',
      },
    },
    input: {
      slots: {
        base: 'input-autofill',
      },
    },
    textarea: {
      slots: {
        base: 'input-autofill',
      },
    },
  },
  uiPro: {
    blogPost: {
      slots: {
        header: 'h-full',
      },
    },
    blog: {
      post: {
        image: {
          wrapper: 'dark:ring-gray-600',
        },
      },
    },
    footer: {
      slots: {
        root: 'mt-auto',
        top: 'max-w-2xl mx-auto !px-4 md:!px-0',
        container: '!hidden',
      },
    },
    header: {
      slots: {
        container: 'max-w-2xl mx-auto px-4 md:px-0 sm:px-0 lg:px-0',
      },
    },
    icons: {
      dynamic: true,
    },
    landing: {
      card: {
        wrapper: 'dark:ring-gray-600',
        background: 'bg-gray-100 dark:bg-[#2d2d2d]',
      },
    },
    main: {
      base: 'min-h-full flex-1',
    },
    pageBody: {
      base: 'max-w-2xl py-8 px-4 md:px-0 mx-auto',
    },
    pageGrid: {
      base: 'sm:grid-cols-12 lg:grid-cols-12',
    },
    pageHeader: {
      slots: {
        root: 'py-0 mb-0 border-b-0',
      },
    },
    page: {
      error: {
        name: 'text-center',
      },
    },
    textarea: {
      base: 'input-autofill',
      color: {
        white: {
          outline: 'bg-white dark:bg-dark',
        },
      },
    },
  },
})
