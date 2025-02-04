export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: 'cursor-pointer',
      },
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
  },
})
