import { useIntersectionObserver, useTransition } from '@vueuse/core'

export function useRevealTransition(options: { duration?: number; transition?: [number, number, number, number] } = {}) {
  const isVisible = ref(false)
  const container = ref<HTMLElement | null>(null)
  const target = ref(0)

  useIntersectionObserver(container, (entries) => {
    if (entries[0]) {
      isVisible.value = entries[0].isIntersecting
    }
  })

  watch(isVisible, (val) => {
    target.value = val ? 1 : 0
  })

  const progress = useTransition(target, {
    duration: options.duration || 2500,
    transition: options.transition || ([0.22, 1, 0.36, 1] as [number, number, number, number]),
  })

  return {
    isVisible,
    container,
    progress,
  }
}
