import type { Project } from '../types/const'

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
    target: '_blank',
    title: 'Kettlebell Pro',
    description: 'Work in progress app for Kettlebell exercises & workouts.',
    label: 'Coming Soon:',
    icons: [
      {
        name: 'i-devicon-nuxt',
        title: 'Nuxt 4',
      },
      {
        name: 'i-devicon-vuejs',
        title: 'VueJS',
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
      'Professional kettlebell training videos with step by step instructions',
      'Complete workouts with proper dieting',
      'Progress tracking',
    ],
  },
  {
    url: '/expense-management',
    title: 'Expense Tracker',
    description: 'Track your expenses with a simple, intuitive interface.',
    icons: [
      {
        name: 'i-devicon-nuxtjs',
        title: 'Nuxt 4',
      },
      {
        name: 'i-devicon-tailwindcss',
        title: 'TailwindCSS',
      },
      {
        name: 'i-devicon-typescript',
        title: 'Typescript',
      },
      {
        name: 'i-devicon-postgresql',
        title: 'Postgres',
      },
    ],
    details: [
      'Built with Nuxt 4, TypeScript, Nuxt/UI Pro, TailwindCSS 4, & Postgres',
      'Authentication - Save your expenses to your profile',
      'Expense tracking with categories and budgets',
    ],
  },
  {
    url: 'https://storybook-from-scratch.netlify.app',
    target: '_blank',
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
  'Family, Fishing, and <span class="inline-flex items-center mr-1 font-semibold"><div class="inline-flex items-center"><span class="iconify i-mdi:kettlebell size-6 shrink-0 text-neutral" aria-hidden="true"></span></div>Kettlebells</span>',
  'I specialize in the <span class="text-success font-semibold ml-1">web</span>. More specifically:',
  '<span class="inline-flex items-center gap-x-1 mr-1 font-semibold"><div class="inline-flex items-center"><span class="iconify i-simple-icons:nuxt size-5 shrink-0 text-primary" aria-hidden="true"></span></div>Nuxt/Vue</span> and <span class="inline-flex items-center gap-x-1 font-semibold mx-1"><div class="inline-flex items-center"><span class="iconify i-simple-icons:react size-5 shrink-0 text-sky-500" aria-hidden="true"></span></div>React/Next</span> Ecosystems with <span class="font-semibold ml-1">Typescript</span>',
  'Building <span class="ml-1 font-semibold">fast</span>, <span class="ml-1 font-semibold">performant</span>, and <span class="mx-1 font-semibold">accessible</span> UI',
  'I work <span class="ml-1 font-semibold">hard</span>, always look to <span class="ml-1 font-semibold">improve</span>, and <span class="mx-1 font-semibold">get the job done</span> the way it should be',
  'Any questions? Feel free to reach out!',
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
