export function useScrollProgress(): Ref<number> {
  const progress = ref(0)
  const { y } = useWindowScroll()

  const getProgress = (scrollY: number) => {
    const height = (document?.documentElement.scrollHeight - window?.innerHeight) ?? 0
    progress.value = ~~Math.floor((scrollY / height) * 100)
  }

  watch(y, (v) => {
    getProgress(v)
  })

  onMounted(() => {
    const scrollY = y.value || window.scrollY
    getProgress(scrollY)
  })

  return progress
}
