export interface Project {
  target?: string
  url: string
  title: string
  description: string
  icons: {
    name: string
    title: string
  }[]
  details: string[]
}
