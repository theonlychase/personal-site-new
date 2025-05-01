export const nav = [
  {
    text: 'Home',
    name: 'index',
    to: '/',
    delay: '',
  },
  {
    text: 'Blog',
    name: 'blog',
    to: '/blog',
    delay: 'delay-75',
  },
  {
    text: 'Contact',
    name: 'contact',
    to: '/contact',
    delay: 'delay-150',
  },
]

export const projects: Array<Project> = [
  {
    url: 'https://storybook-from-scratch.netlify.app',
    title: 'Storybook From Scratch',
    description: 'Custom, lightweight alternative to Storybook for building Vue components in isolation.',
    icons: [
      {
        name: 'i-devicon-vuejs',
        title: 'VueJS',
      },
      {
        name: 'i-simple-icons-primevue',
        title: 'PrimeVue',
      },
      {
        name: 'i-devicon-vitejs',
        title: 'ViteJS',
      },
      {
        name: 'i-devicon-tailwindcss',
        title: 'TailwindCSS',
      },
      {
        name: 'i-devicon-typescript',
        title: 'Typescript',
      },
    ],
    details: [
      'Develop, test & document UI components',
      'Auto generated routes for pages, components & stories',
      'Reactive, auto generated controls for modifying component state',
    ],
  },
]

export const skills = [
  'Modern Frontend Architecture',
  'User Interface/User Experience',
  'Design Systems',
  'Progressive Enhancement',
  'Core Web Vitals Performance',
  'Solving Problems at Scale',
]

export const componentTransitions = {
  animate: {
    transform: 'translateY(10px)',
    opacity: 0,
  },
  asChild: true,
  initial: false,
  inViewOptions: { once: true },
  whileInView: {
    opacity: 1,
    transform: 'translateY(0)',
  },
}
