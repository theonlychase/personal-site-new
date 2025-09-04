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
  '<span class="inline-flex items-center gap-x-2 mr-1 font-semibold"><div class="inline-flex items-center"><svg class="text-current fill-current size-5 text-sky-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M453 61.16C382.3 72.25 282.7 104.9 207.3 160c.4.2.8.5 1.2.7c4.8 3.1 8.8 7.3 11.5 12.4c66-47.5 153.2-78.35 219-91.15V401.8h18V73.85c-.3-5.2-3.1-12.04-4-12.69m-344.9 5.69c-18.66 0-35.13 18.4-35.13 42.85c0 24.5 16.47 42.9 35.13 42.9c18.7 0 35.1-18.4 35.1-42.9c0-24.45-16.4-42.85-35.1-42.85M79.73 161.2c-16.65 42.2-23.61 86.3-28.4 126.9c24.46-.9 48.24-2.4 70.97-4.5c-1.8-14.3-2.9-28.5-3.5-42.7c-8-5.9-16.2-12.8-24.39-20.1l11.99-13.4c10.9 9.7 21.5 18.4 30.9 24.5c9.3 6.2 17.6 9.5 21.9 9.8h.1c-.5 0 2.1-.4 5.7-2.8c3.5-2.5 8-6.5 12.6-11.5c9.2-9.9 19.2-23.9 26.7-37.8c1.3-2.4 1.3-4.4.3-6.9c-.9-2.5-3.1-5.2-5.9-6.9c-2.7-1.8-5.8-2.6-8.4-2.3s-5.1 1.3-7.9 5.1l-26.8 35.9l-42-44.3c-1.8.3-3.6.4-5.5.4c-10.56 0-20.24-3.5-28.37-9.4M273.3 278.5c-63.1 14.3-154.2 27.4-254.3 28.1v94.2h138.7c53.8-27.5 96.3-79.7 115.6-122.3M64 416.8c-13.18 0-29.27 4.3-42.85 8.4c-1.08.3-2.11.6-3.15 1V445c2.59-.8 5.39-1.7 8.36-2.6c12.92-3.9 28.83-7.6 37.64-7.6s18.29 3.4 28.79 7.4c10.51 4 22.01 8.6 35.21 8.6s24.7-4.6 35.2-8.6s20-7.4 28.8-7.4s18.3 3.4 28.8 7.4s22 8.6 35.2 8.6s24.7-4.6 35.2-8.6s20-7.4 28.8-7.4s18.3 3.4 28.8 7.4s22 8.6 35.2 8.6s24.7-4.6 35.2-8.6s20-7.4 28.8-7.4s24.7 3.7 37.6 7.6c3 .9 5.8 1.8 8.4 2.6v-18.8c-1-.4-2-.7-3.1-1c-13.6-4.1-29.7-8.4-42.9-8.4s-24.7 4.6-35.2 8.6s-20 7.4-28.8 7.4s-18.3-3.4-28.8-7.4s-22-8.6-35.2-8.6s-24.7 4.6-35.2 8.6s-20 7.4-28.8 7.4s-18.3-3.4-28.8-7.4s-22-8.6-35.2-8.6s-24.7 4.6-35.2 8.6s-20 7.4-28.8 7.4s-18.3-3.4-28.8-7.4s-22.02-8.6-35.2-8.6"/></svg></div>Fishing</span>, <span class="inline-flex items-center mr-1 font-semibold"><div class="inline-flex items-center"><span class="iconify i-mdi:kettlebell size-6 shrink-0 text-primary" aria-hidden="true"></span></div>Kettlebells</span> and <span class="inline-flex items-center gap-x-2 mx-2 font-semibold"><div class="inline-flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 2048 2048" class="fill-current size-4 text-fuchsia-500"><path fill="currentColor" d="M1790 1717q98 48 162 135t81 196h-110q-11-57-41-106t-73-84t-97-56t-112-20q-59 0-112 20t-97 55t-73 85t-41 106h-110q16-108 80-195t163-136q-57-45-88-109t-32-136q0-45 12-87t36-79t57-66t74-49q-27-39-62-69t-76-53t-86-33t-93-12q-80 0-153 31t-127 91q24 65 24 134q0 92-41 173t-115 136q65 33 117 81t90 108t57 128t20 142H896q0-79-30-149t-82-122t-123-83t-149-30q-80 0-149 30t-122 82t-83 123t-30 149H0q0-73 20-141t57-128t89-108t118-82q-74-55-115-136t-41-173q0-79 30-149t82-122t122-83t150-30q85 0 161 36t132 100q26-25 56-45t63-38q-74-55-115-136t-41-173q0-79 30-149t82-122t122-83t150-30q79 0 149 30t122 82t83 123t30 149q0 92-41 173t-115 136q70 37 126 90t95 123q64 0 120 24t99 67t66 98t24 121q0 72-31 136t-89 109M512 1536q53 0 99-20t82-55t55-81t20-100q0-53-20-99t-55-82t-81-55t-100-20q-53 0-99 20t-82 55t-55 81t-20 100q0 53 20 99t55 82t81 55t100 20m384-896q0 53 20 99t55 82t81 55t100 20q53 0 99-20t82-55t55-81t20-100q0-53-20-99t-55-82t-81-55t-100-20q-53 0-99 20t-82 55t-55 81t-20 100m704 630q-42 0-78 16t-64 43t-44 64t-16 79t16 78t43 64t64 44t79 16t78-16t64-43t44-64t16-79t-16-78t-43-64t-64-44t-79-16"/></svg></div>Family</span>',
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
