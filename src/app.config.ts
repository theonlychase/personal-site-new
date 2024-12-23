export default defineAppConfig({
  ui: {
    blog: {
      post: {
        image: {
          wrapper: 'dark:ring-gray-600',
        },
      },
    },
    button: {
      color: {
        primary: {
          solid: 'bg-green-500 hover:bg-green-600 text-white',
        },
      },
    },
    card: {
      ring: 'ring-gray-300 dark:ring-gray-600',
      background: 'bg-white dark:bg-dark',
    },
    dropdown: {
      background: 'dark:bg-[#2d2d2d]',
      item: {
        active: 'bg-gray-100 dark:bg-dark text-gray-800',
      },
    },
    footer: {
      wrapper: 'mt-auto',
      top: {
        container: 'max-w-2xl mx-auto !px-4 md:!px-0',
      },
      bottom: {
        wrapper: 'hidden',
      },
    },
    formGroup: {
      error: 'capitalize',
    },
    input: {
      base: 'input-autofill',
      color: {
        white: {
          outline: 'bg-white dark:bg-dark',
        },
      },
    },
    header: {
      container: 'max-w-2xl mx-auto !px-4 md:!px-0',
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
      wrapper: 'min-h-full flex-1',
    },
    page: {
      wrapper: 'max-w-2xl py-8 px-4 md:px-0 mx-auto',
      body: {
        wrapper: '',
      },
      header: {
        wrapper: 'pt-0 border-b-0',
      },
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
    variables: {
      dark: {
        background: 'var(--color-dark)',
        foreground: 'var(--color-gray-400)',
      },
      light: {
        background: 'var(--color-gray-50)',
        foreground: 'var(--color-gray-700)',
      },
    },
  },
})
