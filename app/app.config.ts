export default defineAppConfig({
  ui: {
    blogPost: { slots: { header: 'h-full' } },
    blogPosts: { base: 'gap-6 lg:gap-6' },
    button: {
      slots: { base: 'cursor-pointer' },
      compoundVariants: [
        {
          color: 'primary',
          variant: 'solid',
          class: 'bg-green-500 hover:bg-green-600 text-white',
        },
      ],
    },
    contentSurround: { slots: { root: 'mt-8' } },
    footer: {
      slots: {
        root: 'mt-auto',
        top: 'max-w-2xl mx-auto !px-4 md:!px-0 !p b-4 pt-12 lg:pt-12',
        container: '!hidden',
      },
    },
    formField: { slots: { error: 'capitalize' } },
    header: { slots: { container: 'max-w-2xl mx-auto px-4 md:px-0 sm:px-0 lg:px-0' } },
    input: { slots: { base: 'input-autofill' } },
    main: { base: 'min-h-full flex-1' },
    pageBody: { base: 'max-w-2xl py-0 px-4 md:px-0 mx-auto animate-fade-in' },
    pageGrid: { base: 'sm:grid-cols-12 lg:grid-cols-12' },
    pageHeader: {
      slots: {
        root: 'pt-0',
        // root: 'py-0 mb-0 border-b-0',
        // description: 'text-sm',
      },
      variants: { title: { true: { description: 'mt-1' } } },
    },
    textarea: { slots: { base: 'input-autofill' } },
  },
})
