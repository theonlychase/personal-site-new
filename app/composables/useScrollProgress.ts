/**
 * A Vue composable that tracks scroll progress as a percentage of the total scrollable height.
 * Returns a reactive progress value (0-100) and a function to stop tracking.
 */
export function useScrollProgress(): {
  progress: Ref<number>
  stop: () => void
} {
  // Create an effect scope to manage all reactive effects in this composable
  // This allows us to easily dispose of all watchers and effects when needed
  const scope = effectScope()

  // Reactive reference to store the scroll progress percentage (0-100)
  const progress = ref(0)

  // Run all reactive logic within the effect scope
  scope.run(() => {
    // Get reactive window scroll Y position from VueUse composable
    const { y } = useWindowScroll()

    // Calculate scroll progress as a percentage based on current scroll position
    const getProgress = (scrollY: number) => {
      // Calculate total scrollable height by subtracting viewport height from document height
      // Use nullish coalescing to provide fallback values for SSR compatibility
      const height = (document?.documentElement.scrollHeight ?? 0) - (window?.innerHeight ?? 0)

      // Calculate progress percentage and use bitwise NOT operator (~~) for fast integer conversion
      // Math.floor ensures we get whole numbers, then convert to integer for performance
      progress.value = ~~Math.floor((scrollY / height) * 100)
    }

    // Watch for changes in scroll Y position and update progress accordingly
    watch(y, (v) => {
      getProgress(v)
    })

    // Initialize progress calculation when component is mounted
    // This ensures we have the correct initial progress value
    onMounted(() => {
      // Get initial scroll position, fallback to reactive y value if window.scrollY is unavailable
      const scrollY = window.scrollY || y.value
      getProgress(scrollY)
    })
  })

  // Return the reactive progress value and a cleanup function
  return {
    progress, // Reactive scroll progress percentage (0-100)
    stop: () => scope.stop(), // Function to stop all watchers and clean up effects
  }
}
