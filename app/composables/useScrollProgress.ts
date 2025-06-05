export function useScrollProgress(): {
  progress: Ref<number>
  stop: () => void
} {
  const scope = effectScope()
  const progress = ref(0)

  scope.run(() => {
    const { y } = useWindowScroll()

    const getProgress = (scrollY: number) => {
      const height = (document?.documentElement.scrollHeight ?? 0) - (window?.innerHeight ?? 0)
      progress.value = ~~((scrollY / height) * 100)
    }

    watch(y, (v) => {
      getProgress(v)
    })

    onMounted(() => {
      const scrollY = window.scrollY || y.value
      getProgress(scrollY)
    })
  })

  return {
    progress,
    stop: () => scope.stop(),
  }
}
