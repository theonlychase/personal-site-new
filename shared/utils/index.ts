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

export const MONTHS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
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
    opacity: 1,
    transform: 'translateY(0)',
  },
  asChild: true,
  initial: {
    transform: 'translateY(10px)',
    opacity: 0,
  },
  inViewOptions: { once: true },
}

export function getYears(count = 7) {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: count + 1 }, (_, i) => String(currentYear + i).slice(-2))
}

export function removeDuplicatesByProp(arr: Array<{ [key: string]: unknown }>, key = 'name') {
  const values = new Set()

  return arr.filter((item: { [key: string]: unknown }) => {
    if (!(key in item)) {
      return true
    }

    const value = item[key]
    if (values.has(value)) {
      return false
    }
    values.add(value)
    return true
  })
}
